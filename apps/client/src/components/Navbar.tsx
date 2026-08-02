import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-2" aria-label="Trang chủ SyStore">
        <Image
          src="/logo.svg"
          alt="SyStore"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden text-lg font-semibold tracking-tight md:block">
          SyStore
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/" aria-label="Trang chủ">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <button type="button" aria-label="Thông báo">
          <Bell className="w-4 h-4 text-gray-600"/>
        </button>
        <ShoppingCartIcon/>
        <Link href="/login" className="text-sm">Đăng nhập</Link>
      </div>
    </nav>
  );
};

export default Navbar;
