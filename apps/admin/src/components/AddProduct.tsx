"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { CategoryType, colors, ProductFormSchema, sizes } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

// const categories = [
//   "T-shirts",
//   "Shoes",
//   "Accessories",
//   "Bags",
//   "Dresses",
//   "Jackets",
//   "Gloves",
// ] as const;

const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }

  return await res.json();
};


const AddProduct = () => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
   defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      categorySlug: "",
      sizes: [],
      colors: [],
      images: {},
}
  });

  const { isPending, error, data } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
});
  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Thêm sản phẩm</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập tên hiển thị của sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Tóm tắt đặc điểm nổi bật của sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả chi tiết</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập thông tin chi tiết về sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập giá bán bằng VNĐ.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {data &&(<FormField
                  control={form.control}
                  name="categorySlug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.map((cat : CategoryType) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Chọn danh mục phù hợp cho sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />)}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {sizes.map((size) => (
                            <div className="flex items-center gap-2" key={size}>
                              <Checkbox
                                id={`size-${size}`}
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, size]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter((v) => v !== size)
                                    );
                                  }
                                }}
                              />
                              <label htmlFor={`size-${size}`} className="text-xs">
                                {size.toUpperCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn các kích cỡ đang có sẵn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sắc</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 my-2">
                            {colors.map((color) => (
                              <div
                                className="flex items-center gap-2"
                                key={color}
                              >
                                <Checkbox
                                  id={`color-${color}`}
                                  checked={field.value?.includes(color)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, color]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter((v) => v !== color)
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`color-${color}`}
                                  className="text-xs flex items-center gap-2"
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  {color}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn các màu đang có sẵn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <div className="">
                        {form.watch("colors")?.map((color) => (
                          <div className="mb-4 flex items-center gap-4" key={color}>
                            <div className="flex items-center gap-2">
                              <div className=" w-4 h-2 rounded-full" style={{backgroundColor:color}}
                              />
                              <span className="text-sm font-medium min-w-[80px]">{color}</span>
                            </div>
                            <Input
                            type="file"
                            accept="image/*" onChange={async(e)=>{
                              const file = e.target.files?.[0];
                              if (file) {
                                  try {
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append(
                                      "upload_preset",
                                      "ecommerce"
                                    );

                                    const res = await fetch(
                                      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                      {
                                        method: "POST",
                                        body: formData,
                                      }
                                    );
                                    const data = await res.json();
                                    if(data.secure_url){
                                        const currentImages = form.getValues("images") || {}
                                        form.setValue("images",{
                                          ...currentImages,
                                          [color]:data.secure_url,
                                        })
                                    }
                                  } catch (error) {
                                    console.log(error);
                                    toast.error("Đăng lên không thành công!");
                                  }
                                  }
                              }}
                            />
                            {field.value?.[color] ? ( <span className="text-green-600 text-sm">Thành Công</span>
                            ):(
                            <span className="text-red-600 text-sm">Yêu cầu hình ảnh</span>
                              )}
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
                <Button type="submit">Thêm sản phẩm</Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
