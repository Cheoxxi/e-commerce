"use client"

import {loadStripe} from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { CartItemsType, ShippingFormInputs } from '@repo/types';
import CheckoutForm from './CheckoutForm';
import useCartStore from '@/stores/cartStore';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripe = stripePublishableKey ? loadStripe(stripePublishableKey) : null;


const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await response.json();

  if (!response.ok || !json.checkoutSessionClientSecret) {
    throw new Error(json.message || "Unable to start checkout.");
  }

  return json.checkoutSessionClientSecret;
};


const StripePaymentForm = ({shippingForm}:{shippingForm:ShippingFormInputs}) => {
  const {cart} =  useCartStore()
  const [token,setToken] = useState<string | null>(null)
  const {getToken} = useAuth();
  
  useEffect(() =>{
    getToken().then((token)=>setToken(token));
}, [getToken]);

  if (!stripe) {
    return <div className="text-sm text-red-500">Stripe publishable key is not configured.</div>;
  }

  if (!cart.length) {
    return <div className="text-sm text-gray-500">Giỏ hàng của bạn đang trống.</div>;
  }

  if(!token){
    return <div className="">Loading...</div>;

  } 

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{fetchClientSecret: ()=>fetchClientSecret(cart , token)}}>
      <CheckoutForm shippingForm={shippingForm}/>
    </CheckoutProvider>
  )
}

export default StripePaymentForm;
