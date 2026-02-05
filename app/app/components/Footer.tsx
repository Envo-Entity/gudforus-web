import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    company: {
      title: "Company",
      links: [
        { label: "Terms & Conditions", href: "/app/terms" },
        { label: "Privacy Policy", href: "/app/privacy" },
      ],
    },
    download: {
      title: "Download",
      links: [
        {
          label: "iOS App Store",
          href: "https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992",
        },
        {
          label: "Google Play Store",
          href: "https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN",
        },
      ],
    },
    /*
    social: {
      title: "Social",
      links: [
        { label: "Instagram", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
     */
  };

  return (
    <footer className="bg-gray-100 pt-12 sm:pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center">
              <Image
                src="/gud.png"
                alt="Logo"
                width={100}
                height={100}
                className="invert translate-x-[-10px]"
              />
            </div>
            <p className="text-[#6B7280] text-sm max-w-xs mb-6 translate-y-[-10px]">
              Empowering consumers with transparency. We believe you have the
              right to know exactly what goes into your body.
            </p>
          </div>

          {/* Footer Links */}
          <FooterLinkSection {...footerLinks.company} />
          <FooterLinkSection {...footerLinks.download} />
          {/* <FooterLinkSection {...footerLinks.social} /> */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-xs text-[#6B7280]">
            © 2026 GudForUs Inc. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-500 border border-gray-200">
              English (US)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkSectionProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterLinkSection({ title, links }: FooterLinkSectionProps) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
        {title}
      </h4>
      <ul className="space-y-2 text-xs sm:text-sm text-[#6B7280]">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="hover:text-[#2E7D32] transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
