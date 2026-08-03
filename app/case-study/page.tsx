import Link from "next/link";

/* eslint-disable @next/next/no-img-element -- Local editorial media is intentionally art-directed. */

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const metadata = {
  title: "Case Study",
  description:
    "How NEIVUM WEB shaped a fictional premium property experience around trust, clarity and enquiry conversion.",
};

const pillars = [
  {
    number: "01",
    title: "Positioning",
    text: "A fictional residence brand designed to feel credible enough for a real sales conversation—without invented awards, testimonials or market claims.",
  },
  {
    number: "02",
    title: "Art direction",
    text: "Warm ivory, deep forest and natural limestone create a quieter alternative to the dark technology aesthetic of NEIVUM WEB’s first showcase.",
  },
  {
    number: "03",
    title: "Conversion system",
    text: "Every editorial moment leads naturally toward residence selection, request details or a private presentation rather than decorative browsing alone.",
  },
];

export default function CaseStudyPage() {
  return (
    <main className="case-study-page">
      <header className="case-header">
        <Link className="case-brand" href="/" aria-label="Nivera homepage">
          NIVERA <span>RESIDENCES</span>
        </Link>
        <Link className="case-back" href="/">
          Back to experience ↗
        </Link>
      </header>

      <section className="case-hero">
        <p>NEIVUM WEB / Selected work 02</p>
        <h1>A commercial property experience built around quiet confidence.</h1>
        <div className="case-hero-meta">
          <span>Strategy</span>
          <span>Art direction</span>
          <span>UX/UI</span>
          <span>Frontend</span>
        </div>
      </section>

      <figure className="case-cover">
        <img src={assetPath("/media/hero-exterior.webp")} alt="Nivera exterior art direction" width="1536" height="1536" />
      </figure>

      <section className="case-intro">
        <p className="case-label">The brief</p>
        <h2>Prove that premium presentation can also be commercially useful.</h2>
        <div>
          <p>
            The RTX showcase demonstrates technical spectacle. NIVERA was created to show the other side of the studio: restraint, trust, information design and a clear path from interest to enquiry.
          </p>
          <p>
            The development, residences and plans are entirely fictional. The experience is a portfolio demonstration, not a property listing or client commission.
          </p>
        </div>
      </section>

      <section className="case-pillars">
        {pillars.map((pillar) => (
          <article key={pillar.number}>
            <span>{pillar.number}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </section>

      <section className="case-system">
        <div className="case-system-copy">
          <p className="case-label">The system</p>
          <h2>Editorial hierarchy. Product-level clarity.</h2>
          <p>
            Large serif typography creates recognition; a strict grotesk handles actions, labels and property data. Motion is restrained to image depth, masked reveals and useful state transitions.
          </p>
        </div>
        <div className="case-swatches" aria-label="Nivera color system">
          <span style={{ background: "#f4f0e7", color: "#153b32" }}>Ivory</span>
          <span style={{ background: "#153b32" }}>Forest</span>
          <span style={{ background: "#c9bda9", color: "#153b32" }}>Limestone</span>
          <span style={{ background: "#171b19" }}>Ink</span>
        </div>
      </section>

      <section className="case-technical">
        <p className="case-label">Implementation</p>
        <div className="case-tech-grid">
          <article>
            <h3>Responsive by composition</h3>
            <p>Desktop uses a split editorial canvas; mobile rebuilds the hierarchy around an image-first story and thumb-friendly actions.</p>
          </article>
          <article>
            <h3>Accessible interactions</h3>
            <p>Semantic controls, visible keyboard focus, readable labels, reduced-motion support and a fully usable experience without pointer movement.</p>
          </article>
          <article>
            <h3>Performance-minded media</h3>
            <p>Optimized local imagery, limited client state, no autoplay media, no map SDK and no heavyweight animation framework.</p>
          </article>
        </div>
      </section>

      <section className="case-finale">
        <p>Interactive concept by NEIVUM WEB</p>
        <h2>From visual attention to a credible enquiry.</h2>
        <div>
          <Link className="button button-light" href="/">
            Open the experience
          </Link>
          <a className="case-contact" href="https://t.me/neivumweb" target="_blank" rel="noreferrer">
            Discuss a project ↗
          </a>
        </div>
      </section>
    </main>
  );
}
