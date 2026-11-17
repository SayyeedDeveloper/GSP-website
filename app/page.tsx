import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { BagFinder } from "@/components/BagFinder";
import { Benefits } from "@/components/Benefits";
import { Tagline } from "@/components/Tagline";
import { HowItWorks } from "@/components/HowItWorks";
import { Quality } from "@/components/Quality";
import { Delivery } from "@/components/Delivery";
import { Proof } from "@/components/Proof";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { DICTS, EMAIL, PHONE } from "@/lib/i18n";

const en = DICTS.en;
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Great Soatobod Production",
    logo: "/assets/gsplogo.png",
    telephone: PHONE,
    email: EMAIL,
    areaServed: "UZ",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (["f1", "f3", "f5", "f7", "f8"] as const).map((k) => ({
      "@type": "Question",
      name: en[`${k}.q`],
      acceptedAnswer: { "@type": "Answer", text: en[`${k}.a`] },
    })),
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Products />
        <BagFinder />
        <Benefits />
        <Tagline />
        <HowItWorks />
        <Quality />
        <Delivery />
        <Proof />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
