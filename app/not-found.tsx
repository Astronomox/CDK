import { ButtonLink } from "@/components/ui/ButtonLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="relative overflow-hidden bg-canvas-tint py-24">
          <div className="container-page text-center">
            <div aria-hidden className="mx-auto flex justify-center gap-3">
              <span className="size-6 rounded-full bg-purple" />
              <span className="size-6 rounded-full bg-gold" />
              <span className="size-6 rounded-full bg-blue" />
            </div>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">We could not find that page</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">It may have moved. Let&apos;s get you back on track.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/" variant="primary">
                Go to the homepage
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
