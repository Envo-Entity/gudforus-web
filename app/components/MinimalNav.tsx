import Image from "next/image";
import Link from "next/link";

export default function MinimalNav({ title }: { title?: string | null }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf7]/90 backdrop-blur-md border-b border-[#e5e3dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-[48px_minmax(0,1fr)_48px] items-center gap-3">
        <Link href="/" className="flex items-center" aria-label="Gud For Us home">
          <Image
            src="/gud.png"
            alt="Gud For Us"
            width={48}
            height={48}
            className="rounded-md invert"
          />
        </Link>
        {title ? (
          <p className="truncate text-center text-sm font-semibold tracking-[-0.01em] text-[#1a1a17] sm:text-base">
            {title}
          </p>
        ) : (
          <span aria-hidden />
        )}
        <span aria-hidden />
      </div>
    </nav>
  );
}
