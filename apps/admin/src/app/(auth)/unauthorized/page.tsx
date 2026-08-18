"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const { signOut } = useAuth();
  return (
    <div className="">
      <h1>Bạn Không được đăng nhập!!!</h1>
      <button onClick={() => signOut()}>Đăng Xuất !!!</button>
    </div>
  );
};

export default Page;