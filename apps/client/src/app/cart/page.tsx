"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { formatColor, formatCurrency } from "@/lib/format";

const steps = [
  {
    id: 1,
    title: "Giỏ hàng",
  },
  {
    id: 2,
    title: "Địa chỉ giao hàng",
  },
  {
    id: 3,
    title: "Thanh toán",
  },
];

const CartPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart } = useCartStore();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1;
  const shippingFee = cart.length > 0 ? 30000 : 0;
  const total = subtotal - discount + shippingFee;

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Giỏ hàng của bạn</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.length > 0 ? cart.map((item) => (
              // SINGLE CART ITEM
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/* IMAGE */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images?.[item.selectedColor] || "" } 
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Kích cỡ: {item.selectedSize.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Màu sắc: {formatColor(item.selectedColor)}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                  aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )) : (
              <p className="text-sm text-gray-500">
                Giỏ hàng của bạn đang trống.
              </p>
            )
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Vui lòng điền thông tin giao hàng để tiếp tục.
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Chi tiết đơn hàng</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Tạm tính</p>
              <p className="font-medium">{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Giảm giá (10%)</p>
              <p className="font-medium">-{formatCurrency(discount)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Phí vận chuyển</p>
              <p className="font-medium">{formatCurrency(shippingFee)}</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Tổng cộng</p>
              <p className="font-medium">{formatCurrency(total)}</p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Tiếp tục
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CartPage = () => (
  <Suspense
    fallback={
      <div className="mt-12 space-y-8" aria-label="Đang tải giỏ hàng">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-md bg-gray-100" />
        <div className="h-72 animate-pulse rounded-lg bg-gray-100" />
      </div>
    }
  >
    <CartPageContent />
  </Suspense>
);

export default CartPage;
