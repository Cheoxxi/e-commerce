import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";
import { Package, Clock, CheckCircle, XCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn hàng của bạn",
  description: "Xem và theo dõi tất cả đơn hàng tại SyStore.",
};

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch orders:", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? (data as OrderType[]) : [];
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
});

function StatusBadge({ status }: { status: string }) {
  const isSuccess = status === "success";
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide
        ${
          isSuccess
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }
      `}
    >
      {isSuccess ? (
        <CheckCircle className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      {isSuccess ? "Thành công" : "Thất bại"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <ShoppingBag className="h-9 w-9 text-gray-400" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Chưa có đơn hàng nào
      </h2>
      <p className="mb-8 max-w-sm text-sm text-gray-500">
        Khi bạn mua sắm tại SyStore, đơn hàng sẽ xuất hiện tại đây để bạn dễ
        dàng theo dõi.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
      >
        <ShoppingBag className="h-4 w-4" />
        Bắt đầu mua sắm
      </Link>
    </div>
  );
}

function OrderCard({
  order,
  index,
}: {
  order: OrderType;
  index: number;
}) {
  const orderId = order._id;
  const shortId = orderId.length > 8 ? `#${orderId.slice(-8).toUpperCase()}` : `#${orderId.toUpperCase()}`;
  const amount = currencyFormatter.format(order.amount);
  const date = order.createdAt ? dateFormatter.format(new Date(order.createdAt)) : "—";
  const time = order.createdAt ? timeFormatter.format(new Date(order.createdAt)) : "";
  const products = order.products ?? [];

  return (
    <article
      className="group rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:border-gray-300/80"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-amber-50">
            <Package className="h-4 w-4 text-gray-500 transition-colors group-hover:text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{shortId}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{date}</span>
              {time && (
                <>
                  <span className="text-gray-300">·</span>
                  <span>{time}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* BODY */}
      <div className="px-5 py-4 sm:px-6">
        {/* Products list */}
        {products.length > 0 ? (
          <ul className="space-y-2.5">
            {products.map((product, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray-50 text-xs font-medium text-gray-500">
                    {product.quantity}×
                  </span>
                  <span className="truncate text-gray-700">{product.name}</span>
                </div>
                <span className="flex-shrink-0 text-gray-500">
                  {currencyFormatter.format(product.price)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Không có thông tin sản phẩm
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3.5 sm:px-6 rounded-b-xl">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Tổng cộng
        </span>
        <span className="text-base font-bold text-gray-900">{amount}</span>
      </div>
    </article>
  );
}

const OrdersPage = async () => {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="py-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Đơn hàng của bạn
        </h1>
        <EmptyState />
      </div>
    );
  }

  const successCount = orders.filter((o) => o.status === "success").length;

  return (
    <div className="py-8">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Đơn hàng của bạn
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {orders.length} đơn hàng
          {successCount > 0 && (
            <span>
              {" "}· <span className="text-emerald-600">{successCount} thành công</span>
            </span>
          )}
        </p>
      </div>

      {/* ORDERS LIST */}
      <div className="grid gap-4">
        {orders.map((order, index) => (
          <OrderCard key={order._id} order={order} index={index} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;