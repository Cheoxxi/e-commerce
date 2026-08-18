import {Hono} from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import type { CartItemsType } from "@repo/types";

const sessionRoute = new Hono()

sessionRoute.post('/create-checkout-session', shouldBeUser,async (c) => {
  try{
  const { cart }: { cart?: CartItemsType } = await c.req.json();
  const userId = String(c.get("userId"));

  if (!cart?.length) {
    return c.json({ message: "Giỏ hàng đang trống." }, 400);
  }

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Giỏ hàng không hợp lệ.");
    }

    return acc + price * quantity;
  }, 0);
  const discount = Math.round(subtotal * 0.1);
  const shippingFee = 30000;

  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "vnd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));
  
  const session = await stripe.checkout.sessions.create({
    line_items:lineItems,
    client_reference_id: userId,
    mode: 'payment',
    ui_mode: 'custom',
    return_url: `${process.env.PAYMENT_RETURN_URL || "http://localhost:3002/return"}?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      userId,
      subtotal: String(subtotal),
      discount: String(discount),
      shippingFee: String(shippingFee),
      cart: JSON.stringify(
        cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          price: item.price,
        }))
      ).slice(0, 500),
    },
  });

  return c.json({checkoutSessionClientSecret: session.client_secret});
  }catch(error){
    console.log(error);
    return c.json({
      message: error instanceof Error ? error.message : "Unable to create checkout session.",
    }, 500);
  }
});

sessionRoute.get("/:session_id", async (c)=>{
  try {
    const { session_id } = c.req.param();
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string , 
      {
       expand : ["line_items"],
      }
    );

    console.log(session);

    return c.json({
      status:session.status,
      paymentStatus:session.payment_status,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      message: error instanceof Error ? error.message : "Unable to retrieve session.",
    }, 500);
  }
});

export default sessionRoute; 
