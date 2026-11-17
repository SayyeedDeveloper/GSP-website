import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { EMAIL, PHONE, PHONE_LABEL } from "@/lib/i18n";

export const metadata = {
  title: "Privacy policy and terms | Great Soatobod Production",
  robots: { index: false },
};

export default function Legal() {
  const p = "body-3 mt-4 text-ink-muted";
  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <Link href="/" className="btn-ghost button-sm -ml-3">
        <ArrowLeft weight="bold" aria-hidden /> Back to the home page
      </Link>

      <section id="privacy" className="mt-12">
        <h1 className="heading-4">Privacy policy</h1>
        <p className={p}>
          This website does not collect or store your personal data on a server. When you send a quote request, the form
          opens your own email app with the details you entered, addressed to {EMAIL}. Nothing is sent until you press send
          in your email app.
        </p>
        <p className={p}>
          We use the details you send us only to reply to your request and prepare an offer. We do not sell or share them
          with third parties.
        </p>
        <p className={p}>
          The site remembers your language choice in your browser so the page opens in the same language next time. We do not
          use advertising or analytics cookies.
        </p>
        <p className={p}>
          To ask about your data or have it deleted, write to{" "}
          <a className="text-brand-deep underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
          <a className="text-brand-deep underline underline-offset-4" href={`tel:${PHONE}`}>{PHONE_LABEL}</a>.
        </p>
      </section>

      <section id="terms" className="mt-16">
        <h2 className="heading-4">Terms</h2>
        <p className={p}>
          Information on this website, including product descriptions and photos, is for reference. Bag specifications,
          prices, volumes and delivery terms are confirmed for each order in a written offer from Great Soatobod Production.
        </p>
        <p className={p}>
          Sending a quote request does not create an obligation to buy. An order is placed only after both sides agree on
          the offer.
        </p>
        <p className={p}>
          The Great Soatobod Production name, logo and photos on this site may not be copied without permission.
        </p>
      </section>
    </main>
  );
}
