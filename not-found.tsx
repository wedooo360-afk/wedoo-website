import CTA from "@/components/CTA";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80vh] flex-col justify-end pb-[var(--section)] pt-[calc(var(--header-h)+80px)]">
      <p className="t-label mb-8">(404)</p>
      <h1 className="t-mega mb-12">Not here.</h1>
      <CTA href="/">Back to the studio</CTA>
    </section>
  );
}
