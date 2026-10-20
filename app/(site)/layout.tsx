import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd, organizationJsonLd } from "@/components/JsonLd";
import { PhotoPeek } from "@/components/PhotoPeek";
import { Motion } from "@/components/Motion";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="scroll-progress" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <JsonLd data={organizationJsonLd()} />
      <PhotoPeek />
      <Motion />
      <Analytics />
    </>
  );
}
