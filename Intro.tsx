import CTA from "./CTA";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

/** Positioning. The one quiet section with no imagery. */
export default function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section">
      <div className="wrap grid-12 gap-y-10">
        <SectionLabel className="col-span-4 md:col-span-2 lg:col-span-3">WEDOO / Branding agency</SectionLabel>

        <TextReveal
          as="h2"
          id="intro-title"
          className="t-statement col-span-4 md:col-span-6 lg:col-start-5 lg:col-span-8 max-w-[16ch]"
        >
          We build brands with a founder&rsquo;s mindset.
        </TextReveal>

        <div className="col-span-4 md:col-start-3 md:col-span-5 lg:col-start-9 lg:col-span-4 mt-6 lg:mt-12">
          <TextReveal as="p" className="t-lead t-muted mb-10">
            We look beyond logos and aesthetics to understand the people, stories, business challenges and ambitions
            behind a brand, then turn those insights into identities and experiences designed to move businesses
            forward.
          </TextReveal>
          <CTA href="/#contact">Start a project</CTA>
        </div>
      </div>
    </section>
  );
}
