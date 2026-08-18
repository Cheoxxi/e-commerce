import { ProductType } from "@repo/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

// TEMPORARY
// const products: ProductsType = [
  // {
  //   id: 1,
  //   name: "Áo thun Adidas CoreFit",
  //   shortDescription:
  //     "Chất vải mềm, co giãn nhẹ và thoáng mát cho ngày năng động.",
  //   description:
  //     "Áo thun Adidas CoreFit có phom dáng gọn gàng, chất vải mềm và thoáng. Thiết kế dễ phối cùng quần jeans hoặc trang phục thể thao hằng ngày.",
  //   price: 399000,
  //   sizes: ["s", "m", "l", "xl", "xxl"],
  //   colors: ["gray", "purple", "green"],
  //   images: {
  //     gray: "/products/1g.png",
  //     purple: "/products/1p.png",
  //     green: "/products/1gr.png",
  //   },
  //   categorySlug:"test",
  //   createdAt:new Date(),
  //   updatedAt:new Date(),
  // },
//   {
//     id: 2,
//     name: "Áo khoác Puma Ultra Warm Zip",
//     shortDescription:
//       "Lớp giữ ấm nhẹ cùng khóa kéo tiện dụng cho thời tiết se lạnh.",
//     description:
//       "Áo khoác Puma Ultra Warm Zip giữ ấm vừa đủ mà không gây nặng nề. Phom áo linh hoạt phù hợp khi đi học, đi làm hoặc vận động ngoài trời.",
//     price: 599000,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
  // {
    // id: 3,
    // name: "Áo nỉ Nike Air Essentials",
    // shortDescription:
    //   "Phom rộng vừa phải, bề mặt êm và thoải mái suốt ngày dài.",
    // description:
    //   "Áo nỉ Nike Air Essentials mang lại cảm giác êm ái với phom dáng hiện đại. Chi tiết bo gọn giúp giữ phom và dễ kết hợp nhiều phong cách.",
    // price: 699000,
    // sizes: ["s", "m", "l"],
    // colors: ["green", "blue", "black"],
    // images: {
    //   green: "/products/3gr.png",
    //   blue: "/products/3b.png",
    //   black: "/products/3bl.png",},
    // categorySlug:"test",
    // createdAt:new Date(),
    // updatedAt:new Date(),
  // },
//   {
//     id: 123,
//     name: "Áo thun Nike Dri-FIT",
//     shortDescription:
//       "Khả năng thấm hút tốt, phù hợp tập luyện và mặc hằng ngày.",
//     description:
//       "Áo thun Nike Dri-FIT hỗ trợ thoát ẩm nhanh và giữ cảm giác khô thoáng. Đường may gọn giúp bạn cử động tự nhiên khi tập luyện.",
//     price: 299000,
//     sizes: ["s", "m", "l"],
//     colors: ["white", "pink"],
//     images: { white: "/products/4w.png", pink: "/products/4p.png" },
//     categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
//   {
//     id: 5,
//     name: "Áo nỉ Under Armour StormFleece",
//     shortDescription:
//       "Bề mặt ấm áp, nhẹ và linh hoạt trong mọi hoạt động thường ngày.",
//     description:
//       "Under Armour StormFleece kết hợp lớp nỉ ấm với thiết kế linh hoạt. Sản phẩm phù hợp mặc riêng hoặc phối lớp khi nhiệt độ xuống thấp.",
//     price: 499000,
//     sizes: ["s", "m", "l"],
//     colors: ["red", "orange", "black"],
//     images: {
//       red: "/products/5r.png",
//       orange: "/products/5o.png",
//       black: "/products/5bl.png",
//     },
//     categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
//   {
//     id: 6,
    // name: "Giày Nike Air Max 270",
    // shortDescription:
    //   "Đệm khí êm ái cùng dáng giày nổi bật cho từng bước chân.",
    // description:
    //   "Nike Air Max 270 có phần đệm khí lớn giúp tăng độ êm khi di chuyển. Thân giày ôm chân và phối màu hiện đại tạo điểm nhấn cho trang phục.",
    // price: 599000,
    // sizes: ["40", "42", "43", "44"],
    // colors: ["gray", "white"],
    // images: { gray: "/products/6g.png", white: "/products/6w.png" },
    // categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
//   {
//     id: 7,
//     name: "Giày Nike Ultraboost Pulse",
//     shortDescription:
//       "Thiết kế thể thao nhẹ, hỗ trợ tốt cho nhịp di chuyển hằng ngày.",
//     description:
//       "Nike Ultraboost Pulse có lớp đệm đàn hồi và thân giày thoáng khí. Kiểu dáng gọn giúp bạn dễ dàng chuyển từ tập luyện sang dạo phố.",
//     price: 699000,
//     sizes: ["40", "42", "43"],
//     colors: ["gray", "pink"],
//     images: { gray: "/products/7g.png", pink: "/products/7p.png" },
//     categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
//   {
//     id: 8,
//     name: "Áo khoác denim Levi’s Classic",
//     shortDescription:
//       "Chất denim bền đẹp với phom cổ điển không lỗi thời.",
//     description:
//       "Áo khoác denim Levi’s Classic có phom vừa vặn và chất liệu bền chắc. Thiết kế cổ điển dễ phối cùng áo thun, sơ mi hoặc trang phục nhiều lớp.",
//     price: 599000,
//     sizes: ["s", "m", "l"],
//     colors: ["blue", "green"],
//     images: { blue: "/products/8b.png", green: "/products/8gr.png" },
//     categorySlug:"test",
//     createdAt:new Date(),
//     updatedAt:new Date(),
//   },
// ];
const fetchData = async ({
  category,sort,search,params,
}: {category?: string;sort?: string;search?: string;params: "homepage" | "products";}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${ params === "homepage"?"&limit=8": ""}`
);
  const data:ProductType[] = await res.json();
  return data
};
const ProductList = async ({
  category,
  sort,
  search,
  params,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const products = await fetchData({category,sort, search, params})
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        Xem tất cả sản phẩm
      </Link>
    </div>
  );
};

export default ProductList;
