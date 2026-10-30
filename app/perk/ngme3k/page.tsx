import type { Metadata } from "next";
import PerkOffer from "./PerkOffer";

// Landing page for the "Pro 50% off" email (emails/pro_50_off). Opens the app's
// existing 50% offer screen. The path is deliberately unguessable and unindexed.
export const metadata: Metadata = {
  title: "Your Gud Pro offer - GudForUs",
  robots: { index: false, follow: false },
};

export default function PerkPage() {
  return <PerkOffer />;
}
