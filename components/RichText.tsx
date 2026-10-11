import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { MediaImage } from "@/components/ui/MediaImage";
import { safeImg } from "@/lib/content";

const components: PortableTextComponents = {
  types: {
    // Images in story bodies pass the same consent check as everywhere else.
    safeImage: ({ value }) => {
      const image = safeImg({
        src: value?.asset?.url,
        alt: value?.alt,
        width: value?.asset?.metadata?.dimensions?.width,
        height: value?.asset?.metadata?.dimensions?.height,
        showsIdentifiableChildren: value?.showsIdentifiableChildren,
        consentConfirmed: value?.consentConfirmed,
      });
      if (!image) return null;
      return (
        <figure className="my-8 overflow-hidden rounded-3xl">
          <MediaImage image={image} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full" />
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = String(value?.href ?? "");
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-ctk text-lg">
      <PortableText value={value} components={components} />
    </div>
  );
}
