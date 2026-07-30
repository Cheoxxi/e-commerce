const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const colorLabels: Record<string, string> = {
  black: "Đen",
  blue: "Xanh dương",
  gray: "Xám",
  green: "Xanh lá",
  orange: "Cam",
  pink: "Hồng",
  purple: "Tím",
  red: "Đỏ",
  white: "Trắng",
};

export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);

export const formatColor = (color: string) => colorLabels[color] ?? color;
