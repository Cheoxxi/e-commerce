import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="SyStore" width={36} height={36} />
          <p className="hidden text-lg font-semibold tracking-tight text-white md:block">
            SyStore
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2026 SyStore.</p>
        <p className="text-sm text-gray-400">Đã đăng ký bản quyền.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Hỗ trợ</p>
        <Link href="/">Trang chủ</Link>
        <Link href="/">Liên hệ</Link>
        <Link href="/">Điều khoản dịch vụ</Link>
        <Link href="/">Chính sách bảo mật</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Mua sắm</p>
        <Link href="/products">Tất cả sản phẩm</Link>
        <Link href="/products">Hàng mới về</Link>
        <Link href="/products">Sản phẩm bán chạy</Link>
        <Link href="/products">Khuyến mãi</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Về SyStore</p>
        <Link href="/">Giới thiệu</Link>
        <Link href="/">Liên hệ</Link>
        <Link href="/">Bài viết</Link>
        <Link href="/">Chương trình cộng tác</Link>
      </div>
    </div>
  );
};

export default Footer;
