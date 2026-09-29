/**
 * PROJECT DATA
 * ------------------------------------------------------------------
 * Content lives here, presentation lives in /components.
 * To add a project: copy an entry, change the slug, drop images into
 * /public/work/<slug>/ and it appears on the homepage, /work, the
 * archive and gets its own /work/<slug> page. No UI changes needed.
 *
 * IMPORTANT: narrative copy below is DRAFT copy written from the
 * category and services only. It makes no factual claims about the
 * clients. Replace it with the real case-study story, and replace every
 * "[Add ...]" marker with verified results.
 */

export type ShowcaseLayout = "full" | "offset" | "split" | "type";

export type Img = { src: string; alt: string };

export type StoryBlock =
  | { type: "full"; image: Img; caption?: string }
  | { type: "pair"; images: [Img, Img]; caption?: string }
  | { type: "text-image"; title: string; body: string; image: Img; align?: "left" | "right" }
  | { type: "quote"; text: string; cite?: string }
  | { type: "video"; poster: Img; src?: string; caption?: string }
  | { type: "strip"; image: Img; caption?: string }
  | { type: "grid"; images: Img[]; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Short name used in tight spaces (hero captions, cursor labels). */
  short: string;
  client: string;
  category: string;
  discipline: string;
  services: string[];
  year: string;
  /** Project colour: used for hover washes and case-study accents only. */
  tone: string;
  /** Text colour that sits on `tone`. */
  onTone: string;
  heroImage: string;
  thumbnail: string;
  layout: ShowcaseLayout;
  /** Optional pair of images for the split layout's small collage. */
  collage?: [string, string];
  featured: boolean;
  summary: string;
  description: string;
  challenge: string;
  insight: string;
  idea: string;
  solution: string;
  outcome: string;
  story: StoryBlock[];
};

const img = (slug: string, file: string, alt: string): Img => ({
  src: `/work/${slug}/${file}.jpg`,
  alt,
});

export const projects: Project[] = [
  {
    slug: "soutsakan",
    title: "Soutsakan Institute of Technology",
    short: "Soutsakan",
    client: "Soutsakan Institute of Technology",
    category: "Education",
    discipline: "Brand Transformation",
    services: ["Brand Strategy", "Brand Positioning", "Brand Identity", "Brand Guidelines"],
    year: "2026",
    tone: "#1E2A4A",
    onTone: "#ECE8DE",
    heroImage: "/work/soutsakan/hero.jpg",
    thumbnail: "/work/soutsakan/hero.jpg",
    layout: "full",
    featured: true,
    summary: "An institute that had outgrown its old image, rebuilt around where its students are going.",
    description:
      "A brand transformation for a technical institute: new positioning, a new identity system and the guidelines to carry it across every campus touchpoint.",
    challenge:
      "The institute had changed faster than the way it presented itself. Its identity described where it started, not what it had become.",
    insight:
      "Students don't choose an institute for its history. They choose it for the person they could be when they leave.",
    idea: "Make the brand about direction: every expression points forward, from the mark to the prospectus.",
    solution:
      "A positioning platform, a disciplined identity system built on a confident typographic core, and guidelines written for the people who actually use them.",
    outcome: "[Add verified results: enrolment, recognition, rollout scope.]",
    story: [
      { type: "full", image: img("soutsakan", "image-01", "Soutsakan identity: typographic system in use"), caption: "Identity system" },
      {
        type: "pair",
        images: [
          img("soutsakan", "image-02", "Soutsakan type specimen"),
          img("soutsakan", "image-03", "Soutsakan poster application"),
        ],
      },
      { type: "quote", text: "Designed for who students will become, not only who they are today.", cite: "Project principle" },
      {
        type: "text-image",
        title: "A system, not a logo",
        body: "Colour, type and layout rules that let any faculty produce material that still looks like one institute.",
        image: img("soutsakan", "image-04", "Soutsakan colour palette study"),
        align: "right",
      },
      { type: "video", poster: img("soutsakan", "image-06", "Soutsakan motion study placeholder"), caption: "Motion identity (video placeholder)" },
      { type: "strip", image: img("soutsakan", "image-05", "Soutsakan digital applications") },
    ],
  },
  {
    slug: "futura-school",
    title: "Futura School",
    short: "Futura",
    client: "Futura School",
    category: "Education",
    discipline: "Brand Identity + Digital",
    services: ["Brand Identity", "Digital Design", "Website Design", "Content Systems"],
    year: "2026",
    tone: "#D24A2C",
    onTone: "#F3ECE0",
    heroImage: "/work/futura-school/hero.jpg",
    thumbnail: "/work/futura-school/hero.jpg",
    layout: "offset",
    featured: true,
    summary: "An online school for design, UX/UI and digital marketing, given a brand as sharp as what it teaches.",
    description:
      "Identity, website and a content system for an online school teaching design, UX/UI and digital marketing.",
    challenge:
      "A school that teaches design is judged on its own design first. Every post, lesson and page had to prove the teaching works.",
    insight: "Learners don't buy courses. They buy the moment the skill finally clicks.",
    idea: "Build the brand around that click: clear, confident, a little playful, never academic.",
    solution:
      "An identity built for social-first publishing, a modular content system for courses and campaigns, and a website that turns curiosity into enrolment.",
    outcome: "[Add verified results: enrolments, engagement, course launches.]",
    story: [
      { type: "full", image: img("futura-school", "image-01", "Futura School identity in use"), caption: "Identity" },
      {
        type: "text-image",
        title: "Built for the feed",
        body: "Templates and rules that let a small team publish every day without the brand drifting.",
        image: img("futura-school", "image-05", "Futura School social and web screens"),
        align: "left",
      },
      {
        type: "pair",
        images: [
          img("futura-school", "image-02", "Futura School type specimen"),
          img("futura-school", "image-03", "Futura School poster"),
        ],
      },
      { type: "quote", text: "A design school has to pass its own class first.", cite: "Project principle" },
      { type: "strip", image: img("futura-school", "image-04", "Futura School colour study") },
      { type: "video", poster: img("futura-school", "image-06", "Futura School motion placeholder"), caption: "Course launch film (video placeholder)" },
    ],
  },
  {
    slug: "kyae-oh-king",
    title: "Kyae Oh King",
    short: "Kyae Oh King",
    client: "Kyae Oh King",
    category: "F&B",
    discipline: "Brand Identity",
    services: ["Brand Identity", "Logo Design", "Brand Experiences", "Campaign Design"],
    year: "2026",
    tone: "#6B1A14",
    onTone: "#F1E6D3",
    heroImage: "/work/kyae-oh-king/hero.jpg",
    thumbnail: "/work/kyae-oh-king/hero.jpg",
    layout: "split",
    collage: ["/work/kyae-oh-king/image-05.jpg", "/work/kyae-oh-king/image-04.jpg"],
    featured: true,
    summary: "A bowl people already love, given an identity with the same heat and confidence.",
    description: "Brand identity and brand experience for a food and beverage brand.",
    challenge:
      "In food, the product is the brand's loudest voice. The identity had to be as memorable as the first taste, and hold up everywhere from signage to delivery bag.",
    insight: "People don't remember restaurants. They remember cravings, and where they satisfied them.",
    idea: "Treat the brand like the dish: bold, warm, generous, and instantly recognisable across the room.",
    solution:
      "A confident wordmark, a warm and appetising palette, and an application system for the counter, packaging and campaigns.",
    outcome: "[Add verified results: openings, reach, customer response.]",
    story: [
      { type: "full", image: img("kyae-oh-king", "image-01", "Kyae Oh King identity in use"), caption: "Wordmark and pattern" },
      { type: "grid", images: [
        img("kyae-oh-king", "image-02", "Kyae Oh King type specimen"),
        img("kyae-oh-king", "image-03", "Kyae Oh King poster"),
        img("kyae-oh-king", "image-06", "Kyae Oh King detail"),
      ] },
      { type: "quote", text: "The identity should make you hungry from across the street.", cite: "Project principle" },
      {
        type: "text-image",
        title: "From counter to bag",
        body: "One system across signage, menus, packaging and delivery, so the brand travels with the food.",
        image: img("kyae-oh-king", "image-05", "Kyae Oh King applications"),
        align: "right",
      },
      { type: "strip", image: img("kyae-oh-king", "image-04", "Kyae Oh King colour palette") },
    ],
  },
  {
    slug: "star-exam",
    title: "Star Exam",
    short: "Star Exam",
    client: "Star Exam",
    category: "Education Technology",
    discipline: "Product Design",
    services: ["UI / UX", "Digital Design", "Brand Identity"],
    year: "2026",
    tone: "#0F4C45",
    onTone: "#E9EDE6",
    heroImage: "/work/star-exam/hero.jpg",
    thumbnail: "/work/star-exam/hero.jpg",
    layout: "type",
    featured: true,
    summary: "Exam preparation designed around calm, focus and visible progress.",
    description: "Product design and interface system for an education technology platform.",
    challenge:
      "Exams are stressful by design. A product that adds friction, noise or doubt works against the student using it.",
    insight: "Confidence comes from seeing progress, not from being told you're doing well.",
    idea: "Design for focus: fewer decisions per screen, and progress that is always visible.",
    solution:
      "A product experience and UI system built around clear practice flows, honest feedback and a brand layer that feels encouraging without being loud.",
    outcome: "[Add verified results: active learners, completion, ratings.]",
    story: [
      { type: "full", image: img("star-exam", "image-05", "Star Exam product screens"), caption: "Product UI" },
      {
        type: "text-image",
        title: "One task per screen",
        body: "Practice flows are stripped back to a single decision at a time, with progress kept in view.",
        image: img("star-exam", "image-02", "Star Exam type specimen"),
        align: "left",
      },
      { type: "quote", text: "Calm is a feature.", cite: "Project principle" },
      { type: "pair", images: [
        img("star-exam", "image-03", "Star Exam poster"),
        img("star-exam", "image-06", "Star Exam detail"),
      ] },
      { type: "strip", image: img("star-exam", "image-01", "Star Exam wordmark study") },
      { type: "video", poster: img("star-exam", "image-04", "Star Exam product walkthrough placeholder"), caption: "Product walkthrough (video placeholder)" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
