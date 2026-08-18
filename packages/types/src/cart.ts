import type {Product } from "@repo/product-db";
import z from "zod";

export type CartItemType = Product &{
    quantity: number ;
    selectedSize: string;
    selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ và tên."),
  email: z.email("Email không hợp lệ.").min(1, "Vui lòng nhập email."),
  phone: z
    .string()
    .min(9, "Số điện thoại phải có từ 9 đến 10 chữ số.")
    .max(10, "Số điện thoại phải có từ 9 đến 10 chữ số.")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số."),
  address: z.string().min(1, "Vui lòng nhập địa chỉ."),
  city: z.string().min(1, "Vui lòng nhập tỉnh hoặc thành phố."),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
