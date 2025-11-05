export default function Checkout() {
  return (
    <section id="checkout" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <CheckoutInfo />
          <CheckoutActions />
        </div>
      </div>
    </section>
  );
}

function CheckoutInfo() {
  return (
    <div>
      <h3
        className="text-xl text-white font-semibold tracking-tight"
        style={{
          fontFamily: "'Space Grotesk', ui-sans-serif, Inter, system-ui",
        }}
      >
        Ready to read?
      </h3>
      <p
        className="mt-1 text-sm text-neutral-300"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        Secure checkout with instant access. VAT calculated at checkout.
      </p>
    </div>
  );
}

function CheckoutActions() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-neutral-900 text-sm font-semibold transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
      >
        <CreditCardIcon />
        <span>Proceed to checkout</span>
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-3 text-white text-sm ring-1 ring-white/10 transition hover:bg-neutral-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <ShieldCheckIcon />
        <span>30-day guarantee</span>
      </a>
    </div>
  );
}

function CreditCardIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-emerald-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
