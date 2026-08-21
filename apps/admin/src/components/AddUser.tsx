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
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { UserFormSchema } from "@repo/types";
import { toast } from "react-toastify";



const AddUser = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues:{
      firstName:"",
      lastName:"",
      emailAddress:[],
      username:"",
      password:""
    }
  });

const { getToken } = useAuth();

const mutation = useMutation({
  mutationFn: async (data:z.infer<typeof UserFormSchema>) => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
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
      throw new Error("Thất bại khi tạo người dùng mới!");
    }
  },
  onSuccess: () => {
    toast.success("Người dùng đã được tạo thành công!");
  },
  onError: (error)=>{
    toast.error(error.message)
  }
});
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Thêm người dùng</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(data=>mutation.mutate(data))}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ của người dùng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập họ của người dùng.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên của người dùng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập tên của người dùng.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Tên tài khoản</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập tên tài khoản.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      placeholder="email1@gmail.com, email2@gmail.com"
                      onChange={(e) => {
                        const emails = e.target.value
                          .split(",")
                          .map((email) => email.trim())
                          .filter((email) => email);
                        field.onChange(emails);
                      }}
                      />
                    </FormControl>
                    <FormDescription>
                      Nhập email của người dùng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Nhập mật khẩu của người dùng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">
                {mutation.isPending ?  "Thêm người dùng ...": "Thêm người dùng"}
                </Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddUser;
