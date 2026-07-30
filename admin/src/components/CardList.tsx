import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";

const popularProducts = [
  {
    id: 1,
    name: "Áo thun Adidas CoreFit",
    shortDescription:
      "Chất vải mềm, co giãn nhẹ và thoáng mát.",
    description:
      "Áo thun phom gọn, thoáng mát và dễ phối cho trang phục hằng ngày.",
    price: 399000,
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
      "Lớp giữ ấm nhẹ cùng khóa kéo tiện dụng.",
    description:
      "Áo khoác giữ ấm vừa đủ và phù hợp cho nhiều hoạt động thường ngày.",
    price: 599000,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
  },
  {
    id: 3,
    name: "Áo nỉ Nike Air Essentials",
    shortDescription:
      "Phom rộng vừa phải, êm và thoải mái.",
    description:
      "Áo nỉ có phom hiện đại và bề mặt mềm mại cho ngày se lạnh.",
    price: 699000,
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
      "Khả năng thấm hút tốt, phù hợp tập luyện.",
    description:
      "Áo thun hỗ trợ thoát ẩm nhanh và giúp cử động tự nhiên.",
    price: 299000,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
  },
  {
    id: 5,
    name: "Áo nỉ Under Armour StormFleece",
    shortDescription:
      "Bề mặt ấm áp, nhẹ và linh hoạt.",
    description:
      "Áo nỉ ấm vừa đủ, phù hợp mặc riêng hoặc phối nhiều lớp.",
    price: 499000,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
];

const latestTransactions = [
  {
    id: 1,
    title: "Thanh toán đơn hàng",
    badge: "Nguyễn Minh Anh",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400000,
  },
  {
    id: 2,
    title: "Thanh toán đơn hàng",
    badge: "Trần Khánh Linh",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100000,
  },
  {
    id: 3,
    title: "Thanh toán đơn hàng",
    badge: "Lê Hoàng Nam",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300000,
  },
  {
    id: 4,
    title: "Thanh toán đơn hàng",
    badge: "Phạm Ngọc Mai",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500000,
  },
  {
    id: 5,
    title: "Thanh toán đơn hàng",
    badge: "Vũ Đức Huy",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400000,
  },
];

const CardList = ({ title }: { title: string }) => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Sản phẩm phổ biến"
          ? popularProducts.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={Object.values(item.images)[0] || ""}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0">
                  {formatCurrency(item.price)}
                </CardFooter>
              </Card>
            ))
          : latestTransactions.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <Badge variant="secondary">{item.badge}</Badge>
                </CardContent>
                <CardFooter className="p-0">
                  {formatCurrency(item.count)}
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CardList;
