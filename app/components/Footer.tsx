import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/site";

export default function Footer() {
  const footerLinks = {
    company: {
      title: "Company",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    download: {
      title: "Download",
      links: [
        {
          label: "iOS App Store",
          href: APP_STORE_URL,
        },
        {
          label: "Google Play Store",
          href: PLAY_STORE_URL,
        },
      ],
    },
    popular: {
      title: "Popular Searches",
      links: [
        { label: "Ingredient Scanner App", href: "/ingredient-scanner-app" },
        { label: "Allergy Ingredient Scanner", href: "/allergy-ingredient-scanner" },
        { label: "Cosmetic Ingredient Scanner", href: "/cosmetic-ingredient-scanner" },
        { label: "Yuka Alternative", href: "/yuka-alternative" },
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
                alt="Gud For Us logo"
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
          <FooterLinkSection {...footerLinks.popular} />
          <FooterLinkSection {...footerLinks.download} />
          {/* <FooterLinkSection {...footerLinks.social} /> */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-xs text-[#6B7280]">
            © 2026 GudForUs Inc. All rights reserved.
          </p>
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
            <Link
              className="hover:text-[#2E7D32] transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
