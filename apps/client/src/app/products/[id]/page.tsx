import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import { formatCurrency } from "@/lib/format";

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Áo thun Adidas CoreFit",
  shortDescription:
    "Chất vải mềm, co giãn nhẹ và thoáng mát cho ngày năng động.",
  description:
    "Áo thun Adidas CoreFit có phom dáng gọn gàng, chất vải mềm và thoáng. Thiết kế dễ phối cùng quần jeans hoặc trang phục thể thao hằng ngày.",
  price: 399000,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
};

export const generateMetadata = async () => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images?.[selectedColor] || ""}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">
          {formatCurrency(product.price)}
        </h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="Klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="Các loại thẻ thanh toán"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="Stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-gray-500 text-xs">
          Khi chọn Thanh toán ngay, bạn đồng ý với{" "}
          <span className="underline hover:text-black">Điều khoản dịch vụ</span>{" "}
          và <span className="underline hover:text-black">Chính sách bảo mật</span>.
          Bạn cho phép SyStore thu đúng tổng số tiền hiển thị qua phương thức đã
          chọn. Mọi đơn hàng tuân theo{" "}
          <span className="underline hover:text-black">
            chính sách đổi trả và hoàn tiền
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
