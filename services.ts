/**
 * SERVICE INDEX
 * `image` is the preview that follows the cursor on desktop.
 * Swap for real project imagery that shows each service best.
 */
export type Service = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: "strategy",
    title: "Brand Strategy",
    summary: "We find what is true about the business, then decide what the brand should stand for and against.",
    includes: ["Research + founder interviews", "Brand positioning", "Audience + opportunity", "Brand architecture"],
    image: "/work/soutsakan/image-04.jpg",
  },
  {
    id: "identity",
    title: "Brand Identity",
    summary: "Marks, type, colour and rules that make a brand recognisable in a second and usable for years.",
    includes: ["Logo design", "Visual identity", "Typography + colour", "Brand guidelines"],
    image: "/work/kyae-oh-king/image-01.jpg",
  },
  {
    id: "direction",
    title: "Creative Direction",
    summary: "One point of view across every shoot, launch and campaign, so the brand never speaks in two voices.",
    includes: ["Art direction", "Photography direction", "Launch concepts", "Tone of voice"],
    image: "/work/futura-school/image-03.jpg",
  },
  {
    id: "digital",
    title: "Digital Experiences",
    summary: "Websites and digital products where the brand does real work: explaining, persuading, converting.",
    includes: ["Website design", "Art-directed build", "Content design", "Launch support"],
    image: "/work/futura-school/image-05.jpg",
  },
  {
    id: "campaigns",
    title: "Campaigns",
    summary: "Ideas with a strategic reason to exist, built to travel across formats and channels.",
    includes: ["Campaign concepts", "Key visuals", "Social + OOH", "Launch toolkits"],
    image: "/work/kyae-oh-king/image-03.jpg",
  },
  {
    id: "uiux",
    title: "UI / UX",
    summary: "Interfaces that feel obvious to use, because the hard thinking happened before the pixels.",
    includes: ["Product design", "UX flows", "UI systems", "Prototyping"],
    image: "/work/star-exam/image-05.jpg",
  },
  {
    id: "content",
    title: "Content Systems",
    summary: "Templates, rules and toolkits that let your team publish every day without the brand drifting.",
    includes: ["Social systems", "Template libraries", "Editorial guidelines", "Team training"],
    image: "/work/star-exam/image-01.jpg",
  },
];

export const principles = [
  { n: "01", title: "Understand before designing", body: "The founder, the people, the numbers, the obstacles. Design starts after we know what is true." },
  { n: "02", title: "Make strategy visible", body: "A strategy nobody can see is a document. We turn it into things people notice, feel and remember." },
  { n: "03", title: "Build systems, not decorations", body: "Anything we design has to work on day 400, in hands other than ours." },
  { n: "04", title: "Design for real-world use", body: "Small screens, tight budgets, busy teams, real customers. That is the brief." },
  { n: "05", title: "Build for growth", body: "Brands that can stretch into the next product, market and ambition without starting over." },
];
