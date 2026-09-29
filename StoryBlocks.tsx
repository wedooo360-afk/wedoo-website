import type { StoryBlock } from "@/data/projects";
import ImageReveal from "../ImageReveal";
import TextReveal from "../TextReveal";

function Caption({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="t-label t-muted wrap mt-4">{children}</p>;
}

/** Renders a project's visual story from data. Add new block types here. */
export default function StoryBlocks({ blocks, tone }: { blocks: StoryBlock[]; tone: string }) {
  return (
    <div className="flex flex-col gap-[clamp(72px,14vh,180px)] pb-[var(--section)]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "full":
            return (
              <figure key={i}>
                <ImageReveal src={b.image.src} alt={b.image.alt} aspect="16 / 9" sizes="100vw" cut />
                <Caption>{b.caption}</Caption>
              </figure>
            );
          case "strip":
            return (
              <figure key={i}>
                <ImageReveal src={b.image.src} alt={b.image.alt} aspect="21 / 8" sizes="100vw" className="max-md:!aspect-[4/3]" />
                <Caption>{b.caption}</Caption>
              </figure>
            );
          case "pair":
            return (
              <figure key={i} className="wrap grid-12 gap-y-6">
                <ImageReveal src={b.images[0].src} alt={b.images[0].alt} aspect="4 / 5" sizes="(min-width: 768px) 45vw, 100vw" className="col-span-4 md:col-span-4 lg:col-span-5" />
                <ImageReveal src={b.images[1].src} alt={b.images[1].alt} aspect="4 / 5" sizes="(min-width: 768px) 45vw, 100vw" className="col-span-4 md:col-span-4 md:mt-[30%] lg:col-start-7 lg:col-span-6" />
                {b.caption && <figcaption className="t-label t-muted col-span-full">{b.caption}</figcaption>}
              </figure>
            );
          case "grid":
            return (
              <figure key={i} className="wrap grid-12 gap-y-6">
                {b.images.map((im, j) => (
                  <ImageReveal
                    key={im.src}
                    src={im.src}
                    alt={im.alt}
                    aspect="3 / 4"
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className={`col-span-4 md:col-span-4 ${j === 1 ? "lg:mt-[22%]" : ""} ${j === 2 ? "md:col-start-3 lg:col-start-auto" : ""}`}
                  />
                ))}
              </figure>
            );
          case "text-image": {
            const right = b.align !== "left";
            return (
              <div key={i} className="wrap grid-12 items-end gap-y-8">
                <div className={`col-span-4 md:col-span-3 lg:col-span-4 ${right ? "" : "md:order-2 lg:col-start-9"}`}>
                  <h3 className="t-h3 mb-5">{b.title}</h3>
                  <p className="t-muted max-w-[38ch]">{b.body}</p>
                </div>
                <ImageReveal
                  src={b.image.src}
                  alt={b.image.alt}
                  aspect="16 / 11"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  cut
                  className={`col-span-4 md:col-span-5 lg:col-span-7 ${right ? "lg:col-start-6" : "md:order-1 lg:col-start-1"}`}
                />
              </div>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="wrap grid-12 gap-y-6">
                <span aria-hidden className="col-span-4 h-2 w-16 md:col-span-1 lg:col-span-2" style={{ background: tone }} />
                <TextReveal as="p" className="col-span-4 text-[clamp(40px,6vw,112px)] font-bold leading-[0.95] tracking-[-0.04em] md:col-span-7 lg:col-span-9" >
                  {b.text}
                </TextReveal>
                {b.cite && <footer className="t-label t-muted col-span-4 md:col-start-2 lg:col-start-3">{b.cite}</footer>}
              </blockquote>
            );
          case "video":
            return (
              <figure key={i} className="wrap">
                {b.src ? (
                  <video className="aspect-video w-full object-cover" src={b.src} poster={b.poster.src} controls playsInline preload="none" />
                ) : (
                  <div className="relative">
                    <ImageReveal src={b.poster.src} alt={b.poster.alt} aspect="16 / 9" sizes="(min-width: 1600px) 1600px, 100vw" />
                    <span className="t-label absolute left-4 top-4 bg-paper px-2.5 py-1.5 text-ink">Video placeholder: add `src`</span>
                  </div>
                )}
                {b.caption && <figcaption className="t-label t-muted mt-4">{b.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
