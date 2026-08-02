import { z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: [string , ...string[] ];
  colors: [string , ...string[] ];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
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

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Vui lòng nhập tên chủ thẻ."),
  cardNumber: z
    .string()
    .min(16, "Số thẻ phải có 16 chữ số.")
    .max(16, "Số thẻ phải có 16 chữ số."),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Ngày hết hạn phải có định dạng MM/YY."
    ),
  cvv: z.string().min(3, "CVV phải có 3 chữ số.").max(3, "CVV phải có 3 chữ số."),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
