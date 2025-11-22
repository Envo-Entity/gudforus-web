"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "GoodForUs helped me reconnect with what truly matters in life.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=120&auto=format&fit=crop",
    name: "Sarah M.",
    role: "Wellness Coach",
  },
  {
    text: "A beautiful guide to living intentionally in our modern world.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
    name: "James K.",
    role: "Sustainable Living Advocate",
  },
  {
    text: "The non-negotiables became my daily compass.",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=120&auto=format&fit=crop",
    name: "Elena R.",
    role: "Mindfulness Teacher",
  },
  {
    text: "This book transformed how I approach my daily routine and priorities.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop",
    name: "Michael T.",
    role: "Entrepreneur",
  },
  {
    text: "A must-read for anyone seeking balance in today's fast-paced world.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
    name: "David L.",
    role: "Life Coach",
  },
  {
    text: "The principles in this book have changed my perspective on what matters most.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    name: "Jennifer P.",
    role: "Yoga Instructor",
  },
  {
    text: "Simple yet profound wisdom that's easy to apply in everyday life.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    name: "Robert K.",
    role: "Meditation Teacher",
  },
  {
    text: "Finally, a practical approach to living with intention and purpose.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    name: "Amanda S.",
    role: "Therapist",
  },
  {
    text: "This book is a gentle reminder to focus on what we can control.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
    name: "Chris M.",
    role: "Author",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Review() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-foreground/20"
    >
      <div className="mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <h2
              className="text-2xl sm:text-3xl text-foreground tracking-tight font-semibold"
              style={{
                fontFamily: "'League Spartan', ui-sans-serif, Inter, system-ui",
              }}
            >
              What readers say
            </h2>
            <p className="text-center mt-5 opacity-75">
              See what our readers have to say about us.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
