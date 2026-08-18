import Link from "next/link";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kết quả thanh toán",
  description: "Xem trạng thái thanh toán đơn hàng tại SyStore.",
};

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <AlertTriangle className="h-7 w-7 text-amber-500" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">
          Không tìm thấy phiên thanh toán
        </h1>
        <p className="mb-6 max-w-sm text-sm text-gray-500">
          Vui lòng kiểm tra lại hoặc quay về trang chủ.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
        >
          Về trang chủ
        </Link>
      </div>
    );
  }

  let data: { status?: string; paymentStatus?: string; message?: string } | null = null;
  let fetchError = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`
    );
    if (!res.ok) {
      fetchError = true;
    } else {
      data = await res.json();
    }
  } catch {
    fetchError = true;
  }

  if (fetchError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <AlertTriangle className="h-7 w-7 text-amber-500" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">
          Không thể xác minh thanh toán
        </h1>
        <p className="mb-6 max-w-sm text-sm text-gray-500">
          Hệ thống thanh toán hiện không phản hồi. Đơn hàng của bạn vẫn có thể
          đã được xử lý — vui lòng kiểm tra lại trong mục đơn hàng.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
          >
            Xem đơn hàng
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = data.paymentStatus === "paid";
  const isComplete = data.status === "complete";
  const isSuccess = isPaid && isComplete;

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
          isSuccess ? "bg-emerald-50" : "bg-red-50"
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="h-7 w-7 text-emerald-500" />
        ) : (
          <XCircle className="h-7 w-7 text-red-500" />
        )}
      </div>
      <h1 className="mb-2 text-xl font-bold text-gray-900">
        {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
      </h1>
      <p className="mb-1 text-sm text-gray-500">
        Trạng thái:{" "}
        <span
          className={`font-medium ${isSuccess ? "text-emerald-600" : "text-red-600"}`}
        >
          {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </span>
      </p>
      {isSuccess && (
        <p className="mb-6 max-w-sm text-sm text-gray-500">
          Cảm ơn bạn đã mua hàng! Đơn hàng đang được xử lý.
        </p>
      )}
      {!isSuccess && (
        <p className="mb-6 max-w-sm text-sm text-gray-500">
          Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.
        </p>
      )}
      <div className="flex items-center gap-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
        >
          Xem đơn hàng
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default ReturnPage;