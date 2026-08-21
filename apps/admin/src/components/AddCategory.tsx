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
import { Button } from "./ui/button";
import { CategoryFormSchema } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";



const AddCategory = () => {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues:{
      name:"",
      slug:"",
    }
  });

const { getToken } = useAuth();

const mutation = useMutation({
  mutationFn: async (data:z.infer<typeof CategoryFormSchema>) => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Thất bại khi tạo danh mục mới!");
    }
  },
  onSuccess: () => {
    toast.success("Danh mục đã được tạo thành công!");
  },
  onError: (error)=>{
    toast.error(error.message)
  }
});
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Thêm danh mục</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit((data)=>mutation.mutate(data))}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Nhập tên danh mục mới.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đường dẫn danh mục</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Nhập tên đường dẫn danh mục mới.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">
                {mutation.isPending ?  "Thêm danh mục ...": "Thêm danh mục"}
                </Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddCategory;
