import { principles } from "@/data/services";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

/**
 * Approach. The title runs full width (line two starts on the logo's cut, col 5),
 * then an editorial split: the belief stays pinned left while the principles scroll right.
 */
export default function About({ index = "03" }: { index?: string }) {
  return (
    <section id="about" aria-labelledby="about-title" className="pb-[var(--section)] pt-[clamp(48px,10vh,120px)]">
      <div className="wrap">
        <SectionLabel index={index} className="mb-8">
          Approach
        </SectionLabel>
        <TextReveal as="h2" id="about-title" by="words" className="t-h1">
          <span className="block">Founders&rsquo;</span>
          <span className="block lg:pl-[calc((100%+var(--gutter))/12*4)]">mindset.</span>
        </TextReveal>
      </div>

      <div className="wrap grid-12 mt-[clamp(64px,14vh,180px)] gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <TextReveal as="p" className="t-statement max-w-[14ch]">
              We approach every brand as if it were our own.
            </TextReveal>
            <div className="t-lead t-muted mt-10 max-w-[36ch] space-y-5">
              <p>We don&rsquo;t start with decoration.</p>
              <p>
                We start by understanding what is true, what matters, what is getting in the way, and what the
                business could become.
              </p>
            </div>
          </div>
        </div>

        <ol className="col-span-4 md:col-span-8 lg:col-start-7 lg:col-span-6" aria-label="Principles">
          {principles.map((p) => (
            <li
              key={p.n}
              className="group grid grid-cols-6 gap-x-[var(--gutter)] gap-y-3 border-t border-[var(--line)] py-8 last:border-b md:py-10"
            >
              <span className="t-label tnum col-span-1 pt-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
                {p.n}
              </span>
              <div className="col-span-5">
                <h3 className="t-h3 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2">
                  {p.title}
                </h3>
                <p className="t-muted mt-3 max-w-[46ch] text-[16px] leading-relaxed">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
