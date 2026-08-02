import ProductList from "@/components/ProductList";
import Image from "next/image";
import Link from "next/link";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div>
      <section
        aria-labelledby="hero-title"
        className="relative isolate mb-12 mt-5 min-h-[470px] overflow-hidden rounded-2xl border border-black/5 bg-[#f7f6f2] sm:min-h-[330px] lg:min-h-[390px]"
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
        >
          <path
            d="M-40 171C66 105 137 122 228 180C316 236 374 229 467 186C566 140 622 142 716 198C812 256 875 247 954 179C1032 112 1122 96 1240 132V359C1131 396 1037 381 947 320C858 259 799 256 713 318C626 381 554 375 459 319C364 262 302 266 210 337C118 407 42 397-40 346V171Z"
            fill="#ffc43d"
          />
        </svg>

        <h1 id="hero-title" className="text-[#343434]">
          <span className="absolute left-5 top-5 z-10 text-[clamp(4rem,11vw,8.25rem)] font-semibold leading-[0.8] tracking-[-0.075em] sm:left-7 sm:top-7">
            MẶC
          </span>
          <span className="absolute bottom-16 right-5 z-10 flex flex-col text-right text-[clamp(3rem,7vw,5.75rem)] font-semibold leading-[0.8] tracking-[-0.065em] sm:bottom-8 sm:right-7">
            <span>CHẤT</span>
            <span>RIÊNG.</span>
          </span>
        </h1>

        <div className="absolute inset-0 z-20 hidden transition-transform duration-500 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:block">
          <Image
            src="/featured.png"
            alt="Mẫu giày vàng nổi bật trong bộ sưu tập mới của SyStore"
            fill
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-contain"
            style={{
              clipPath:
                "polygon(37% 0%, 55% 0%, 72% 79%, 70% 100%, 49% 94%, 29% 60%, 36% 44%)",
            }}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 h-[253px] w-[760px] -translate-x-1/2 -translate-y-1/2 sm:hidden">
          <Image
            src="/featured.png"
            alt="Mẫu giày vàng nổi bật trong bộ sưu tập mới của SyStore"
            fill
            priority
            sizes="760px"
            className="object-contain"
            style={{
              clipPath:
                "polygon(37% 0%, 55% 0%, 72% 79%, 70% 100%, 49% 94%, 29% 60%, 36% 44%)",
            }}
          />
        </div>

        <div className="absolute bottom-5 left-5 z-30 sm:bottom-7 sm:left-7">
          <p className="mb-2 hidden text-xs font-semibold uppercase tracking-[0.18em] text-[#343434]/65 sm:block">
            Bộ sưu tập mới
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-b border-[#343434] pb-1 text-sm font-medium text-[#343434] sm:text-base"
          >
            Khám phá
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </section>

      <ProductList category={category} params="homepage" />
    </div>
  );
};

export default Homepage;
