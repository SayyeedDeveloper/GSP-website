import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Page not found | Great Soatobod Production" };

export default function NotFound() {
  return (
    <main className="weave flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-4xl bg-paper p-8 text-center shadow-sm md:p-12">
        <Image src="/assets/mark.png" alt="" width={76} height={64} className="mx-auto h-16 w-auto" />
        <p className="eyebrow mt-6">404</p>
        <h1 className="heading-4 mt-2">This bag came back empty</h1>
        <p className="body-3 mt-4 text-ink-muted">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="btn-primary button-md mt-8 px-6 py-3">Back to the home page</Link>
      </div>
    </main>
  );
}
