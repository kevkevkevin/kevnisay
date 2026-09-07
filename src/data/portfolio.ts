export type ProjectCategory = "latest" | "archive" | "games";

export type Project = {
  id: string;
  name: string;
  tags: string[];
  url: string;
  image: string | null;
  blurb: string;
  category: ProjectCategory;
  year?: string;
};

export const PROFILE = {
  name: "Kevin Nisay",
  shortName: "Kevin",
  title: "Senior Web Designer & Developer",
  location: "Jeddah, Saudi Arabia",
  origin: "Philippines",
  email: "kevnisay@gmail.com",
  emailAlt: "info@kevinnisay.com",
  phone: "+966 533970528",
  whatsapp: "https://wa.link/e16zbo",
  github: "https://github.com/kevkevkevin/",
  linkedin: "https://www.linkedin.com/in/kevnisay/",
  behance: "https://www.behance.net/kevdevdesign",
  site: "https://kevnisay.vercel.app/",
  headshot: "/portfolio/kev-head.png",
  portrait: "/portfolio/about.jpg",
  video: "/portfolio/intro.mp4",
  signature: "/portfolio/signature.jpg",
  tagline:
    "I'm a senior web designer and developer helping brands glow up online with clean design, smooth interactions, and websites that actually feel good to use.",
  aboutLead:
    "I am a creative web designer & developer turning ideas into high-performing digital experiences.",
  aboutBody:
    "Kevin Nisay creates digital solutions that help brands and companies grow, driven by purposeful storytelling and meaningful brand strategy. Creative UI/UX designer and front-end developer based in Jeddah — currently exploring blockchain, React, GSAP, and Three.js.",
  funFacts: [
    "Started as a Starbucks barista in Jeddah before landing a full-time front-end role.",
    "Taught himself HTML, CSS, and JavaScript in a one-week crash course, then freelanced nights.",
    "Loves to workout, dogs, and pineapple on pizza.",
    "Ask him about CSS, GSAP, and Three.js.",
  ],
} as const;

export const SOCIALS = [
  { id: "github", label: "GitHub", url: PROFILE.github, user: "kevkevkevin" },
  { id: "linkedin", label: "LinkedIn", url: PROFILE.linkedin, user: "kevnisay" },
  { id: "behance", label: "Behance", url: PROFILE.behance, user: "kevdevdesign" },
  { id: "mail", label: "E-mail", url: `mailto:${PROFILE.email}`, user: PROFILE.email },
  { id: "whatsapp", label: "WhatsApp", url: PROFILE.whatsapp, user: PROFILE.phone },
] as const;

export const SKILLS = [
  { name: "HTML5", file: "HTML.SYS", group: "Core" },
  { name: "CSS3", file: "CSS.SYS", group: "Core" },
  { name: "JavaScript", file: "JS.EXE", group: "Core" },
  { name: "React", file: "REACT.DLL", group: "Frameworks" },
  { name: "Next.js", file: "NEXT.EXE", group: "Frameworks" },
  { name: "WordPress", file: "WP.COM", group: "CMS" },
  { name: "GSAP", file: "GSAP.DLL", group: "Motion" },
  { name: "Three.js", file: "THREE.DLL", group: "Motion" },
  { name: "Tailwind", file: "TW.CSS", group: "Core" },
  { name: "Web3 / Blockchain", file: "WEB3.SYS", group: "Web3" },
  { name: "UI / UX", file: "UX.DIR", group: "Design" },
  { name: "Adobe Photoshop", file: "PS.EXE", group: "Design" },
  { name: "Adobe XD", file: "XD.EXE", group: "Design" },
] as const;

export const EXPERIENCE = [
  {
    role: "Creative UI/UX Designer & Front-end Developer",
    org: "Digital agency, Jeddah",
    dates: "Full-time",
    detail:
      "Designs and builds brand sites, rebrands, and CMS builds for hospitality, health, and consumer brands across the GCC.",
  },
  {
    role: "Remote Front-end Web Developer",
    org: "Income Store Inc.",
    dates: "Remote",
    detail: "Front-end production work alongside agency and freelance projects.",
  },
  {
    role: "Freelance Web Designer / Developer",
    org: "Independent",
    dates: "2019 — present",
    detail:
      "Strategy, rebrand, and website design & development for startups and established brands. Web3 experiments including Ecodroids.",
  },
  {
    role: "Barista",
    org: "Starbucks, Jeddah",
    dates: "The origin story",
    detail:
      "Moved to Jeddah at 21. Overheard a startup needed a developer, volunteered with only C# basics, and never looked back. Documented in “From Coffee to Techie”.",
  },
] as const;

export const ARTICLES = [
  {
    id: "coffee",
    title: "From Coffee to Techie",
    category: "Inspiration",
    date: "27 July 2019",
    url: "https://www.linkedin.com/pulse/from-coffee-techie-kevin-nisay/",
    image: "/portfolio/og-src.jpg",
    summary:
      "Kevin’s journey from barista to full-time front-end developer — crash courses, freelance nights, and the first agency offer in Jeddah.",
  },
  {
    id: "dev2020",
    title: "Why you should become a web developer in 2020",
    category: "Web development",
    date: "13 Dec 2019",
    url: "https://www.linkedin.com/pulse/why-you-should-become-web-developer-2020-kevin-nisay/",
    image: "/portfolio/shot-2.jpg",
    summary:
      "A field note on why web development was (and still is) one of the highest-leverage creative careers to pick up.",
  },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "ecodroids",
    name: "Ecodroids",
    tags: ["Website", "Web3", "NFT"],
    url: "https://ecodroidsnft.vercel.app/",
    image: "/portfolio/ecodroids.jpg",
    blurb:
      "NFT project site for Ecodroids — a Web3 brand experience with custom front-end, lore, and collection storytelling.",
    category: "latest",
  },
  {
    id: "pedept",
    name: "PE Dept",
    tags: ["Website", "WordPress"],
    url: "https://pedept.com.au/",
    image: "/portfolio/pedept.jpg",
    blurb:
      "WordPress site for PE Dept — physical education programs in Australia. Clean, athletic, campaign-ready.",
    category: "latest",
  },
  {
    id: "hefzalnema",
    name: "Hefzalnema",
    tags: ["Website", "WordPress"],
    url: "https://hefzalnema.org/",
    image: null,
    blurb:
      "WordPress build for Hefzalnema — an organization site with a calm, editorial presence and CMS-managed content.",
    category: "latest",
  },
  {
    id: "patience-game",
    name: "F**k This Game",
    tags: ["Experiment", "Game"],
    url: "https://fuckinggame.vercel.app/",
    image: "/portfolio/patience.jpg",
    blurb: "A patience test. Click around. Don’t say you weren’t warned.",
    category: "games",
  },
  {
    id: "ewaste",
    name: "E-waste Escape",
    tags: ["Experiment", "Game"],
    url: "https://ewasteescape.vercel.app/",
    image: "/portfolio/ewaste.jpg",
    blurb: "Interactive experiment about e-waste — a small world with a big recycling chip on its shoulder.",
    category: "games",
  },
  {
    id: "glorygate",
    name: "Glory Gate",
    tags: ["Experiment", "Game"],
    url: "https://glorygate.vercel.app/",
    image: "/portfolio/glory.jpg",
    blurb: "Playable web experiment. Gate open, curiosity required.",
    category: "games",
  },
  {
    id: "arabian",
    name: "Arabian Adventure",
    tags: ["Website", "CMS"],
    url: "https://www.arabian-adventures.com/ae/english",
    image: "/portfolio/arabian.jpg",
    blurb: "Website design & development on a CMS for a desert-adventure tourism brand.",
    category: "archive",
  },
  {
    id: "kabayan",
    name: "Kabayan Hub",
    tags: ["Website", "Next.js"],
    url: "https://kabayanhub.org/",
    image: "/portfolio/kabayan.jpg",
    blurb: "Community hub for Kabayan — designed and developed in Next.js.",
    category: "archive",
  },
  {
    id: "seventeen",
    name: "17 Sixty",
    tags: ["Strategy", "Rebrand", "Website"],
    url: "https://17sixty.com/",
    image: "/portfolio/seventeen.jpg",
    blurb: "Strategy, consult, rebrand, and website design & development.",
    category: "archive",
  },
  {
    id: "shawarmer",
    name: "Shawarmer",
    tags: ["Rebrand", "Website"],
    url: "https://shawarmer.com/en",
    image: "/portfolio/shawarmer.jpg",
    blurb: "Rebrand and website design & development for the GCC fast-casual brand.",
    category: "archive",
  },
  {
    id: "imc",
    name: "International Medical Center",
    tags: ["Website"],
    url: "https://www.imc.med.sa/en",
    image: null,
    blurb: "Website design & development for IMC Jeddah.",
    category: "archive",
  },
  {
    id: "alkhajeh",
    name: "Ali Al Khajeh",
    tags: ["Website"],
    url: "https://www.alialkhajeh.ae/en",
    image: "/portfolio/alkhajeh.jpg",
    blurb: "Personal / professional site — website design & development.",
    category: "archive",
  },
  {
    id: "nahdi",
    name: "Al Nahdi Parenting",
    tags: ["Website", "CMS"],
    url: "https://parenting.nahdionline.com/",
    image: "/portfolio/nahdi.jpg",
    blurb: "CMS website for Al Nahdi’s parenting platform.",
    category: "archive",
  },
  {
    id: "joejuice",
    name: "Joe & The Juice",
    tags: ["Website", "CMS"],
    url: "https://www.joejuice.com/",
    image: "/portfolio/joe.jpg",
    blurb: "Website design & development on a CMS for the juice-bar brand.",
    category: "archive",
  },
  {
    id: "sixth",
    name: "6th Dimensions",
    tags: ["Website"],
    url: "https://6dimension.vercel.app/",
    image: "/portfolio/sixth.jpg",
    blurb: "Website design & development for 6th Dimensions.",
    category: "archive",
  },
  {
    id: "goodboy",
    name: "Goodboy On SOL",
    tags: ["Website", "Blockchain"],
    url: "https://goodboy-onsol.com/",
    image: "/portfolio/goodboy.jpg",
    blurb: "Blockchain project site on Solana — website design & development.",
    category: "archive",
  },
];

export function projectById(id: string) {
  return PROJECTS.find((p) => p.id === id);
}
