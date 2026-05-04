import Image from "next/image";
import Link from "next/link";

export default function MinimalNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf7]/90 backdrop-blur-md border-b border-[#e5e3dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/gud.png"
            alt="Gud For Us"
            width={48}
            height={48}
            className="rounded-md invert"
          />
        </Link>
      </div>
    </nav>
  );
}
