import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Privacy policy and terms | Great Soatobod Production",
  robots: { index: false },
};

export default function Legal() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <Link href="/" className="btn-ghost button-sm -ml-3">
        <ArrowLeft weight="bold" aria-hidden /> Back to the home page
      </Link>
      <section id="privacy" className="mt-12">
        <h1 className="heading-4">Privacy policy</h1>
        <p className="body-3 mt-4 text-ink-muted">
          <span className="tbd">{"{{privacy_policy}}"}</span>
        </p>
      </section>
      <section id="terms" className="mt-16">
        <h2 className="heading-4">Terms</h2>
        <p className="body-3 mt-4 text-ink-muted">
          <span className="tbd">{"{{terms_of_service}}"}</span>
        </p>
      </section>
    </main>
  );
}
