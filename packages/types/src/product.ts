import z from 'zod';
import type {Product, Category } from "@repo/product-db";

export type ProductType = Product;

export type ProductsType = ProductType[];

export type StripeProductType = {
    id: string;
    name: string;
    price: number;
};

export const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

export const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

export const ProductFormSchema = z
  .object({
    name: z
      .string({ message: "Nhập tên sản phẩm!" })
      .min(1, { message: "Nhập tên sản phẩm!" }),
    shortDescription: z
      .string({ message: "Nhập mô tả ngắn!" })
      .min(1, { message: "Nhập mô tả ngắn!" })
      .max(60),
    description: z
      .string({ message: "Nhập mô tả đầy đủ!" })
      .min(1, { message: "Nhập mô tả đầy đủ!" }),
    price: z
      .number({ message: "Nhập giá của sản phẩm!" })
      .min(1, { message: "Nhập giá của sản phẩm!" }),
    categorySlug: z
      .string({ message: "Nhập danh mục của sản phẩm!" })
      .min(1, { message: "Nhập danh mục của sản phẩm!" }),
    sizes: z
      .array(z.enum(sizes))
      .min(1, { message: "Chọn ít nhất 1 size của sản phẩm!" }),
    colors: z
      .array(z.enum(colors))
      .min(1, { message: "Chọn ít nhất 1 màu của sản phẩm!" }),
    images: z.record(z.string(), z.string(), {
      message: "Image for each color is required!",
    }),
        })
        .refine(
          (data) => {
            const missingImages = data.colors.filter(
              (color: string) => !data.images?.[color]
            );
            return missingImages.length === 0;
          },
          {
            message: "Image is required for each selected color!",
            path: ["images"],
          }
        );
export type CategoryType = Category;

export const CategoryFormSchema = z.object({
  name: z
  .string( { message: "Vui lòng nhập tên danh mục!." })
  .min(1, { message: "Vui lòng nhập tên danh mục!." }),
  slug: z
  .string( { message: "Vui lòng nhập tên đường dẫn danh mục!." })
  .min(1, { message: "Vui lòng nhập tên đường dẫn danh mục!." }),
});