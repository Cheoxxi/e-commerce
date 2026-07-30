import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<Product[]> => {
  const products: Product[] = [
    {
      id: 1,
      name: "Áo thun Adidas CoreFit",
      shortDescription:
        "Chất vải mềm, co giãn nhẹ và thoáng mát cho ngày năng động.",
      description:
        "Áo thun phom gọn, thoáng mát và dễ phối cho trang phục hằng ngày.",
      price: 39.9,
      sizes: ["s", "m", "l", "xl", "xxl"],
      colors: ["gray", "purple", "green"],
      images: {
        gray: "/products/1g.png",
        purple: "/products/1p.png",
        green: "/products/1gr.png",
      },
    },
    {
      id: 2,
      name: "Áo khoác Puma Ultra Warm Zip",
      shortDescription:
        "Lớp giữ ấm nhẹ cùng khóa kéo tiện dụng cho thời tiết se lạnh.",
      description:
        "Áo khoác giữ ấm vừa đủ và phù hợp cho nhiều hoạt động thường ngày.",
      price: 59.9,
      sizes: ["s", "m", "l", "xl"],
      colors: ["gray", "green"],
      images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    },
    {
      id: 3,
      name: "Áo nỉ Nike Air Essentials",
      shortDescription:
        "Phom rộng vừa phải, bề mặt êm và thoải mái suốt ngày dài.",
      description:
        "Áo nỉ có phom hiện đại và bề mặt mềm mại cho ngày se lạnh.",
      price: 69.9,
      sizes: ["s", "m", "l"],
      colors: ["green", "blue", "black"],
      images: {
        green: "/products/3gr.png",
        blue: "/products/3b.png",
        black: "/products/3bl.png",
      },
    },
    {
      id: 4,
      name: "Áo thun Nike Dri-FIT",
      shortDescription:
        "Khả năng thấm hút tốt, phù hợp tập luyện và mặc hằng ngày.",
      description:
        "Áo thun hỗ trợ thoát ẩm nhanh và giúp cử động tự nhiên.",
      price: 29.9,
      sizes: ["s", "m", "l"],
      colors: ["white", "pink"],
      images: { white: "/products/4w.png", pink: "/products/4p.png" },
    },
    {
      id: 5,
      name: "Áo nỉ Under Armour StormFleece",
      shortDescription:
        "Bề mặt ấm áp, nhẹ và linh hoạt trong mọi hoạt động.",
      description:
        "Áo nỉ ấm vừa đủ, phù hợp mặc riêng hoặc phối nhiều lớp.",
      price: 49.9,
      sizes: ["s", "m", "l"],
      colors: ["red", "orange", "black"],
      images: {
        red: "/products/5r.png",
        orange: "/products/5o.png",
        black: "/products/5bl.png",
      },
    },
    {
      id: 6,
      name: "Giày Nike Air Max 270",
      shortDescription:
        "Đệm khí êm ái cùng dáng giày nổi bật cho từng bước chân.",
      description:
        "Giày có phần đệm khí lớn và thân giày ôm chân, dễ phối trang phục.",
      price: 59.9,
      sizes: ["40", "42", "43", "44"],
      colors: ["gray", "white"],
      images: { gray: "/products/6g.png", white: "/products/6w.png" },
    },
    {
      id: 7,
      name: "Giày Nike Ultraboost Pulse",
      shortDescription:
        "Thiết kế thể thao nhẹ, hỗ trợ tốt cho nhịp di chuyển hằng ngày.",
      description:
        "Giày có lớp đệm đàn hồi và thân thoáng khí cho cảm giác dễ chịu.",
      price: 69.9,
      sizes: ["40", "42", "43"],
      colors: ["gray", "pink"],
      images: { gray: "/products/7g.png", pink: "/products/7p.png" },
    },
    {
      id: 8,
      name: "Áo khoác denim Levi’s Classic",
      shortDescription:
        "Chất denim bền đẹp với phom cổ điển không lỗi thời.",
      description:
        "Áo khoác có phom vừa vặn, bền chắc và dễ phối nhiều phong cách.",
      price: 59.9,
      sizes: ["s", "m", "l"],
      colors: ["blue", "green"],
      images: { blue: "/products/8b.png", green: "/products/8gr.png" },
    },
  ];

  return products.map((product) => ({
    ...product,
    price: product.price * 10000,
  }));
};

const PaymentsPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">Tất cả sản phẩm</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PaymentsPage;
