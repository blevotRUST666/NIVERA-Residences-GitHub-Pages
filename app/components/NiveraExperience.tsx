"use client";

/* eslint-disable @next/next/no-img-element -- Local editorial media needs art-directed intrinsic sizing. */

import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ResidenceId = "garden" | "terrace" | "sky";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const residences: Record<
  ResidenceId,
  {
    eyebrow: string;
    name: string;
    description: string;
    bedrooms: string;
    area: string;
    outdoor: string;
    floorClass: string;
  }
> = {
  garden: {
    eyebrow: "Residence 01",
    name: "Garden Residence",
    description:
      "A grounded home arranged around a private planted court, with morning light moving through every living space.",
    bedrooms: "2 bedrooms",
    area: "142 m²",
    outdoor: "Private courtyard",
    floorClass: "floor-garden",
  },
  terrace: {
    eyebrow: "Residence 02",
    name: "Terrace Residence",
    description:
      "An expansive corner plan where the main living room opens directly onto a deep, landscape-framed terrace.",
    bedrooms: "3 bedrooms",
    area: "186 m²",
    outdoor: "38 m² terrace",
    floorClass: "floor-terrace",
  },
  sky: {
    eyebrow: "Residence 03",
    name: "Sky House",
    description:
      "The collection’s most private home: generous entertaining rooms, quiet bedroom wings, and a secluded roof garden.",
    bedrooms: "4 bedrooms",
    area: "268 m²",
    outdoor: "Private roof garden",
    floorClass: "floor-sky",
  },
};

const atmosphereSlides = [
  {
    index: "01",
    label: "Architecture",
    title: "Material honesty",
    copy: "Limestone, oak and dark bronze are selected to age with character rather than follow a passing aesthetic.",
  },
  {
    index: "02",
    label: "Light",
    title: "Calm by design",
    copy: "Deep reveals, filtered daylight and measured proportions create rooms that feel composed throughout the day.",
  },
  {
    index: "03",
    label: "Landscape",
    title: "Nature at the threshold",
    copy: "Courtyards and native planting soften each transition between private interiors and the surrounding landscape.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function FloorPlan({ residence }: { residence: ResidenceId }) {
  const rooms =
    residence === "garden"
      ? ["Living", "Kitchen", "Suite", "Bedroom", "Court"]
      : residence === "terrace"
        ? ["Living", "Kitchen", "Suite", "Bedroom 02", "Bedroom 03", "Terrace"]
        : ["Great room", "Kitchen", "Primary", "Suite 02", "Suite 03", "Suite 04", "Roof garden"];

  return (
    <div className={`floor-plan ${residences[residence].floorClass}`} aria-label={`${residences[residence].name} illustrative floor plan`}>
      {rooms.map((room, index) => (
        <div className={`floor-room room-${index + 1}`} key={room}>
          <span>{room}</span>
        </div>
      ))}
      <div className="floor-north" aria-hidden="true">
        N <i />
      </div>
    </div>
  );
}

export default function NiveraExperience() {
  const [selectedResidence, setSelectedResidence] = useState<ResidenceId>("garden");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAtmosphere, setActiveAtmosphere] = useState(0);
  const heroVisual = useRef<HTMLDivElement>(null);
  const modalPanel = useRef<HTMLDivElement>(null);
  const modalName = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const activeResidence = useMemo(
    () => residences[selectedResidence],
    [selectedResidence],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visual = heroVisual.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      visual.style.setProperty("--parallax-x", `${x * 7}px`);
      visual.style.setProperty("--parallax-y", `${y * 7}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-lock", modalOpen || menuOpen);
    return () => document.body.classList.remove("modal-lock");
  }, [modalOpen, menuOpen]);

  useEffect(() => {
    if (modalOpen) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      const frame = window.requestAnimationFrame(() => modalName.current?.focus());
      return () => window.cancelAnimationFrame(frame);
    }

    previousFocus.current?.focus();
    previousFocus.current = null;
  }, [modalOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openViewing() {
    setModalSubmitted(false);
    setModalOpen(true);
    setMenuOpen(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSubmitted(true);
  }

  function submitModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModalSubmitted(true);
  }

  function keepFocusInModal(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const controls = modalPanel.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!controls?.length) return;

    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="Nivera Residences home">
          <span>NIVERA</span>
          <small>RESIDENCES</small>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#residences">Residences</a>
          <a href="#architecture">Architecture</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="header-cta" type="button" onClick={openViewing}>
          Private viewing
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {[
            ["Residences", "#residences"],
            ["Architecture", "#architecture"],
            ["Location", "#location"],
            ["Contact", "#contact"],
          ].map(([label, href], index) => (
            <a href={href} key={label} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
          <button type="button" onClick={openViewing}>
            Request a private viewing <ArrowIcon />
          </button>
        </nav>
      </div>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-index" aria-hidden="true">
              <span>01</span>
              <i />
            </div>
            <p className="hero-kicker">Private residential concept</p>
            <h1 id="hero-title">
              <span>A quieter</span>
              <span>kind of</span>
              <span>extraordinary.</span>
            </h1>
            <p className="hero-description">
              Private residences shaped by light, landscape, and lasting design.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#residences">
                Explore residences <ArrowIcon />
              </a>
              <button className="text-action" type="button" onClick={openViewing}>
                Book a private viewing
              </button>
            </div>
            <p className="hero-meta">
              <span aria-hidden="true">✦</span> Limited residential collection
            </p>
          </div>

          <div className="hero-visual" ref={heroVisual}>
            <img
              src={assetPath("/media/hero-exterior.webp")}
              alt="Contemporary limestone residence surrounded by mature landscaping"
              width="1536"
              height="1536"
              fetchPriority="high"
            />
            <div className="hero-visual-caption">
              <span>Light / Landscape / Living</span>
              <span>Concept 2026</span>
            </div>
          </div>
        </section>

        <section className="manifesto section-pad" id="architecture" aria-labelledby="manifesto-title">
          <div className="section-marker" data-reveal>
            <span>02</span>
            <p>Architecture</p>
          </div>
          <div className="manifesto-grid">
            <div className="manifesto-copy" data-reveal>
              <p className="eyebrow">Designed to outlast trends</p>
              <h2 id="manifesto-title">The luxury of feeling completely at ease.</h2>
              <p>
                NIVERA is imagined as a collection of homes where architecture recedes and daily life takes the foreground. Every threshold, view and material is considered for calm.
              </p>
              <a className="inline-link" href="#principles">
                Explore the design principles <ArrowIcon />
              </a>
            </div>
            <figure className="editorial-image" data-reveal>
              <img
                src={assetPath("/media/interior-living.webp")}
                alt="Natural limestone and oak living room opening toward the landscape"
                width="2048"
                height="1152"
                loading="lazy"
              />
              <figcaption>
                <span>Living space study</span>
                <span>Morning light</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="residences section-pad" id="residences" aria-labelledby="residences-title">
          <div className="residence-heading" data-reveal>
            <div>
              <p className="eyebrow">A limited collection</p>
              <h2 id="residences-title">Three ways of living well.</h2>
            </div>
            <p>
              Each residence is a fictional design study created to demonstrate a clear, premium property selection experience.
            </p>
          </div>

          <div className="residence-selector" data-reveal>
            <div className="residence-tabs" role="tablist" aria-label="Residence types">
              {(Object.keys(residences) as ResidenceId[]).map((id, index) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selectedResidence === id}
                  aria-controls="residence-panel"
                  className={selectedResidence === id ? "is-active" : ""}
                  onClick={() => setSelectedResidence(id)}
                >
                  <span>0{index + 1}</span>
                  {residences[id].name}
                </button>
              ))}
            </div>

            <div className="residence-panel" id="residence-panel" role="tabpanel">
              <div className="residence-details" key={selectedResidence}>
                <p className="eyebrow">{activeResidence.eyebrow}</p>
                <h3>{activeResidence.name}</h3>
                <p className="residence-description">{activeResidence.description}</p>
                <dl>
                  <div>
                    <dt>Bedrooms</dt>
                    <dd>{activeResidence.bedrooms}</dd>
                  </div>
                  <div>
                    <dt>Internal area</dt>
                    <dd>{activeResidence.area}</dd>
                  </div>
                  <div>
                    <dt>Outdoor space</dt>
                    <dd>{activeResidence.outdoor}</dd>
                  </div>
                </dl>
                <button className="button button-dark" type="button" onClick={openViewing}>
                  Request details <ArrowIcon />
                </button>
              </div>
              <FloorPlan residence={selectedResidence} />
            </div>
          </div>
          <p className="illustrative-note">Illustrative concept plans and dimensions. Not a real property offering.</p>
        </section>

        <section className="atmosphere" id="principles" aria-labelledby="atmosphere-title">
          <div className="atmosphere-image" data-reveal>
            <img
              src={assetPath("/media/courtyard-pool.webp")}
              alt="Limestone courtyard with native planting and a reflective water feature"
              width="2048"
              height="1152"
              loading="lazy"
            />
            <p>Late afternoon / Courtyard study</p>
          </div>
          <div className="atmosphere-content">
            <p className="eyebrow">The feeling of Nivera</p>
            <h2 id="atmosphere-title">Spaces with a slower rhythm.</h2>
            <div className="atmosphere-controls" aria-label="Design principles">
              {atmosphereSlides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.index}
                  className={activeAtmosphere === index ? "is-active" : ""}
                  onClick={() => setActiveAtmosphere(index)}
                  aria-pressed={activeAtmosphere === index}
                >
                  <span>{slide.index}</span>
                  {slide.label}
                </button>
              ))}
            </div>
            <div className="atmosphere-copy" key={activeAtmosphere}>
              <h3>{atmosphereSlides[activeAtmosphere].title}</h3>
              <p>{atmosphereSlides[activeAtmosphere].copy}</p>
            </div>
          </div>
        </section>

        <section className="location section-pad" id="location" aria-labelledby="location-title">
          <div className="location-copy" data-reveal>
            <p className="eyebrow">A fictional setting</p>
            <h2 id="location-title">Close to the city. Shaped by nature.</h2>
            <p>
              The location experience is intentionally illustrative: a quiet riverside quarter with culture, landscape and everyday essentials within an easy radius.
            </p>
            <ul>
              <li><span>01</span> Riverside landscape</li>
              <li><span>02</span> Cultural quarter</li>
              <li><span>03</span> Private garden approach</li>
            </ul>
          </div>
          <div className="concept-map" data-reveal aria-label="Illustrative district map">
            <div className="map-river" />
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-pin pin-home"><i /> NIVERA</div>
            <div className="map-pin pin-culture"><i /> CULTURE</div>
            <div className="map-pin pin-garden"><i /> GARDENS</div>
            <span className="map-label">Illustrative district map</span>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro" data-reveal>
            <p className="eyebrow">Private appointments</p>
            <h2 id="contact-title">Begin the conversation.</h2>
            <p>
              Experience the commercial flow as a prospective buyer: choose your interest and request a private presentation.
            </p>
          </div>
          <form className="contact-form" onSubmit={submitContact} data-reveal>
            {contactSubmitted ? (
              <div className="form-success" role="status">
                <span>Request received</span>
                <h3>Thank you for your interest.</h3>
                <p>This portfolio demo stores no personal data. In a production project, the request would be sent securely to the sales team.</p>
                <button type="button" className="text-action" onClick={() => setContactSubmitted(false)}>
                  Send another request
                </button>
              </div>
            ) : (
              <>
                <label>
                  <span>Name</span>
                  <input name="name" autoComplete="name" required placeholder="Your full name" />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                </label>
                <label>
                  <span>Residence of interest</span>
                  <select name="interest" defaultValue="">
                    <option value="" disabled>Select a residence</option>
                    <option>Garden Residence</option>
                    <option>Terrace Residence</option>
                    <option>Sky House</option>
                    <option>General enquiry</option>
                  </select>
                </label>
                <label className="form-wide">
                  <span>Message <em>Optional</em></span>
                  <textarea name="message" rows={3} placeholder="Tell us what you would like to know" />
                </label>
                <label className="privacy-check form-wide">
                  <input type="checkbox" required />
                  <span>I understand this is a fictional portfolio concept and no data is stored.</span>
                </label>
                <button className="button button-light form-wide" type="submit">
                  Request a private presentation <ArrowIcon />
                </button>
              </>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span>NIVERA</span>
          <small>RESIDENCES</small>
        </div>
        <p>
          Fictional real-estate concept created for portfolio demonstration. No properties are offered for sale.
        </p>
        <div className="footer-links">
          <Link href="/case-study">View case study</Link>
          <a href="https://t.me/neivumweb" target="_blank" rel="noreferrer">NEIVUM WEB</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <div className={`viewing-modal ${modalOpen ? "is-open" : ""}`} aria-hidden={!modalOpen}>
        <button className="modal-backdrop" type="button" aria-label="Close viewing form" onClick={() => setModalOpen(false)} />
        <div
          className="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          ref={modalPanel}
          onKeyDown={keepFocusInModal}
        >
          <button className="modal-close" type="button" aria-label="Close" onClick={() => setModalOpen(false)}>
            <CloseIcon />
          </button>
          {modalSubmitted ? (
            <div className="modal-success" role="status">
              <p className="eyebrow">Private presentation</p>
              <h2 id="modal-title">Your request is ready.</h2>
              <p>This is a demonstration flow, so no personal information has been transmitted or stored.</p>
              <button className="button button-dark" type="button" onClick={() => setModalOpen(false)}>
                Return to the experience
              </button>
            </div>
          ) : (
            <>
              <p className="eyebrow">Private presentation</p>
              <h2 id="modal-title">Discover Nivera in detail.</h2>
              <p className="modal-intro" id="modal-description">Choose a preferred time and the residence you would like to explore.</p>
              <form className="modal-form" onSubmit={submitModal}>
                <label>
                  <span>Name</span>
                  <input name="modal-name" autoComplete="name" required ref={modalName} />
                </label>
                <label>
                  <span>Email</span>
                  <input name="modal-email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Interest</span>
                  <select name="modal-interest" defaultValue={activeResidence.name}>
                    <option>Garden Residence</option>
                    <option>Terrace Residence</option>
                    <option>Sky House</option>
                    <option>General enquiry</option>
                  </select>
                </label>
                <label>
                  <span>Preferred contact</span>
                  <select name="modal-contact" defaultValue="Email">
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Video call</option>
                  </select>
                </label>
                <label className="privacy-check">
                  <input type="checkbox" required />
                  <span>I understand this is a fictional portfolio concept and no data is stored.</span>
                </label>
                <button className="button button-dark" type="submit">
                  Submit request <ArrowIcon />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
