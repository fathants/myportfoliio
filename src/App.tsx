import { useEffect, useMemo, useState } from "react";

type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  year: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  hero: string;
  gallery: string[];
  challenge: string;
  process: string;
  outcome: string;
};

const projects: Project[] = [
  {
    slug: "simoneva-berani",
    number: "01",
    title: "SIMONEVA BERANI",
    client: "Pemerintah Provinsi Sulawesi Tengah",
    year: "2026",
    subtitle: "Government Work Program Monitoring System",
    description:
      "A provincial government work program monitoring system designed end-to-end using a user-centered approach.",
    tags: ["Information Architecture", "Wireframing", "Design System", "Dashboard UI"],
    color: "#1848a0",
    hero: "/assets/simoneva-hero.jpg",
    gallery: [
      "/assets/simoneva-hero.jpg",
      "/assets/simoneva-01.jpg",
      "/assets/simoneva-02.jpg",
      "/assets/simoneva-03.jpg",
    ],
    challenge:
      "The provincial government lacked a centralized, accessible system to track and evaluate hundreds of work programs across departments.",
    process:
      "I mapped user flows and information architecture, iterated from low-fi to hi-fi wireframes, and built a scalable design system.",
    outcome:
      "A responsive monitoring dashboard with reusable components that enables staff to track programs across desktop and mobile.",
  },
  {
    slug: "e-monitor",
    number: "02",
    title: "E-MONITOR",
    client: "Pemerintah Provinsi Sulawesi Selatan",
    year: "2026",
    subtitle: "Cross-OPD Work Program Monitoring System",
    description:
      "An interface focused on efficient cross-unit workflows and clear data visualization for organizational teams.",
    tags: ["User Flow", "Dashboard UI", "Data Visualization", "Prototyping"],
    color: "#b92d20",
    hero: "/assets/emonitor-hero.jpg",
    gallery: [
      "/assets/emonitor-hero.jpg",
      "/assets/emonitor-01.jpg",
      "/assets/emonitor-02.jpg",
      "/assets/emonitor-03.jpg",
    ],
    challenge:
      "Multiple government units operated in silos without a unified interface to visualize data flows and monitor shared work.",
    process:
      "I mapped cross-unit workflows, designed dashboard layouts that prioritize clarity, and validated the flows through interactive prototypes.",
    outcome:
      "A cohesive monitoring interface with improved navigation and faster access to real-time program data.",
  },
  {
    slug: "monitoring-media",
    number: "03",
    title: "MONITORING MEDIA",
    client: "Diskominfo Provinsi Sulawesi Selatan",
    year: "2026",
    subtitle: "News & Social Media Monitoring Dashboard",
    description:
      "A media monitoring dashboard that turns scattered news and social data into clear, actionable information.",
    tags: ["Dashboard UI", "Data Visualization", "Media Monitoring", "UX Research"],
    color: "#286544",
    hero: "/assets/media-hero.jpg",
    gallery: [
      "/assets/media-hero.jpg",
      "/assets/media-01.jpg",
      "/assets/media-02.jpg",
      "/assets/media-03.jpg",
    ],
    challenge:
      "The communication team tracked news manually from scattered sources, making trends and sentiment difficult to identify quickly.",
    process:
      "I analyzed PR team needs, designed aggregated news feeds, and developed visualization components for trend and sentiment monitoring.",
    outcome:
      "A centralized daily-use dashboard that reduces manual effort and improves the team's response time.",
  },
  {
    slug: "berani-bersinar",
    number: "04",
    title: "BERANI BERSINAR",
    client: "Dinas Sosial Provinsi Sulawesi Tengah",
    year: "2026",
    subtitle: "Social Assistance & Field Survey Platform",
    description:
      "A responsive dashboard and mobile experience for validating social-needs data and targeting aid accurately.",
    tags: ["UI Redesign", "Responsive Design", "Prototyping", "User Research"],
    color: "#17226f",
    hero: "/assets/bersinar-hero.jpg",
    gallery: [
      "/assets/bersinar-hero.jpg",
      "/assets/bersinar-01.jpg",
      "/assets/bersinar-02.jpg",
      "/assets/bersinar-03.jpg",
    ],
    challenge:
      "Field data was consolidated manually, making real-time validation and accurate regional aid targeting difficult.",
    process:
      "I mapped admin and surveyor flows, designed data tables, regional maps, and mobile survey forms, then prepared developer handoff.",
    outcome:
      "One consistent web and mobile system for citizen data, regional distribution maps, and field surveys.",
  },
  {
    slug: "bajika-wedding",
    number: "05",
    title: "BAJIKA WEDDING",
    client: "Bajika Wedding Organizer · Final Research",
    year: "2026",
    subtitle: "Integrated Wedding Organizer Website & Staff Dashboard",
    description:
      "A research-led UI/UX design that connects clear client information with a centralized operational workspace for staff.",
    tags: ["Design Thinking", "UX Research", "Usability Testing", "Design System"],
    color: "#8b6a50",
    hero: "/assets/herosection.png",
    gallery: [
      "/assets/main.jpg",
      "/assets/designsistem.jpg",
      "/assets/staffsection.jpg",
      "/assets/bajika-about.jpg",
      "/assets/bajika-services.jpg",
      "/assets/bajika-portfolio.jpg",
    ],
    challenge:
      "Clients struggled to find package, pricing, workflow, and date availability information, while staff managed scattered chats and booking records with a high risk of double booking.",
    process:
      "Using five Design Thinking stages, I observed workflows, collected open-ended responses from six staff members, mapped user needs, built a design system, and developed public and internal high-fidelity prototypes in Figma.",
    outcome:
      "The design achieved SUS scores of 84 for staff and 80.75 for clients. All six UEQ dimensions were positive, while client task usability reached a high MAUS range of 90–99.",
  },
];

function useRoute() {
  const getPath = () => window.location.pathname || "/";
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    if (nextPath !== path) {
      window.history.pushState({}, "", nextPath);
      setPath(nextPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function useReveal(path: string) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.12 },
      );
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }, 20);
    return () => window.clearTimeout(timer);
  }, [path]);
}

function Header({
  path,
  navigate,
}: {
  path: string;
  navigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Home"],
    ["/work", "Work"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  const go = (nextPath: string) => {
    navigate(nextPath);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <button className="wordmark" onClick={() => go("/")} aria-label="Go to home">
        MFT<span>.</span>
      </button>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
        {links.map(([href, label]) => (
          <button
            key={href}
            className={
              path === href || (href === "/work" && path.startsWith("/project/"))
                ? "nav-link is-active"
                : "nav-link"
            }
            onClick={() => go(href)}
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? "Close" : "Menu"}
      </button>
    </header>
  );
}

function Footer({ navigate }: { navigate: (path: string) => void }) {
  return (
    <footer className="footer">
      <div>
        <p className="eyebrow light">Have a project in mind?</p>
        <button className="footer-cta" onClick={() => navigate("/contact")}>
          LET&apos;S CONNECT <span>↗</span>
        </button>
      </div>
      <div className="footer-meta">
        <p>Makassar, Indonesia</p>
        <a href="mailto:fathant03@gmail.com">fathant03@gmail.com</a>
        <p>© 2026 Muhammad Fathan Tsaqib</p>
      </div>
    </footer>
  );
}

function ProjectCard({
  project,
  navigate,
  featured = false,
}: {
  project: Project;
  navigate: (path: string) => void;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "project-card is-featured" : "project-card"} data-reveal>
      <div
        className="project-frame"
        style={{ "--project-accent": project.color } as React.CSSProperties}
      >
        <div className="frame-shadow" aria-hidden="true" />
        <button
          className="project-visual"
          onClick={() => navigate(`/project/${project.slug}`)}
          aria-label={`Open ${project.title} case study`}
        >
          <span className="frame-chrome" aria-hidden="true">
            <span className="frame-dots"><i /><i /><i /></span>
            <span className="frame-address">fathan.design / {project.slug}</span>
            <span className="frame-menu">•••</span>
          </span>
          <img src={project.hero} alt={`${project.title} interface preview`} />
          <span className="frame-project-index" aria-hidden="true">{project.number}</span>
          <span className="view-pill">View case study ↗</span>
        </button>
        <span className="frame-caption" aria-hidden="true">
          Selected project · {project.year}
        </span>
      </div>
      <div className="project-card-info">
        <span className="project-number">{project.number}</span>
        <div>
          <p className="project-client">{project.client} · {project.year}</p>
          <button
            className="project-title-link"
            onClick={() => navigate(`/project/${project.slug}`)}
          >
            {project.title}
          </button>
          <p>{project.subtitle}</p>
        </div>
      </div>
    </article>
  );
}

function SkillsTicker() {
  const skills = [
    "UI/UX Designer",
    "Product Designer",
    "Figma",
    "FigJam",
    "User Research",
    "Prototyping",
    "Design Systems",
    "Data Visualization",
    "Canva",
    "CapCut",
    "Lightroom",
    "React",
    "JavaScript",
  ];

  const tickerSet = (hidden = false) => (
    <div className="ticker-set" aria-hidden={hidden}>
      {skills.map((skill) => (
        <span className="ticker-item" key={skill}>
          {skill}
          <span className="ticker-diamond" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="skills-ticker" aria-label={`Skills and tools: ${skills.join(", ")}`}>
      <div className="ticker-track">
        {tickerSet()}
        {tickerSet(true)}
      </div>
    </div>
  );
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">Creative portfolio · 2026</p>
          <h1>
            UI/UX
            <br />
            <span>DESIGNER</span>
          </h1>
          <div className="hero-bottom">
            <p>
              I turn complex systems into digital experiences that feel clear,
              useful, and human.
            </p>
            <button className="circle-link" onClick={() => navigate("/work")}>
              <span>Explore</span>
              <span>work ↘</span>
            </button>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-label">Muhammad Fathan Tsaqib</div>
          <img
            className="hero-portrait"
            src="/assets/fathan-portrait.jpg"
            alt="Muhammad Fathan Tsaqib"
          />
          <div className="availability">
            <span className="status-dot" /> Available for full-time opportunities
          </div>
        </div>
        <span className="hero-index">01 / 04</span>
      </section>

      <SkillsTicker />

      <section className="home-intro" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h2>DESIGN FOR SYSTEMS THAT SERVE PEOPLE.</h2>
        <button className="text-link" onClick={() => navigate("/work")}>
          See all projects <span>→</span>
        </button>
      </section>

      <section className="featured-projects">
        {projects.slice(0, 2).map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            navigate={navigate}
            featured
          />
        ))}
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function Work({ navigate }: { navigate: (path: string) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Dashboard", "Research", "Responsive"];
  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())),
    );
  }, [filter]);

  return (
    <main>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Portfolio · 01</p>
          <h1>SELECTED<br />WORK</h1>
        </div>
        <p className="page-intro">
          End-to-end product design for public institutions—from research and
          wireframes to scalable design systems.
        </p>
      </section>
      <div className="filters" aria-label="Project filters">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "filter is-active" : "filter"}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="work-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} navigate={navigate} />
        ))}
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function ProjectDetail({
  project,
  navigate,
}: {
  project: Project;
  navigate: (path: string) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const moveGallery = (direction: number) => {
    setActiveImage((current) =>
      (current + direction + project.gallery.length) % project.gallery.length,
    );
  };

  return (
    <main>
      <section className="case-header" style={{ "--accent": project.color } as React.CSSProperties}>
        <button className="back-link" onClick={() => navigate("/work")}>← All projects</button>
        <div className="case-heading">
          <div>
            <p className="eyebrow">{project.client} · {project.year}</p>
            <h1>{project.title}</h1>
          </div>
          <p>{project.description}</p>
        </div>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      <section className="gallery" style={{ "--accent": project.color } as React.CSSProperties}>
        <div className="gallery-stage">
          <img
            key={project.gallery[activeImage]}
            src={project.gallery[activeImage]}
            alt={`${project.title} screen ${activeImage + 1}`}
          />
          <div className="gallery-count">
            {String(activeImage + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
          </div>
        </div>
        <div className="gallery-controls">
          <button onClick={() => moveGallery(-1)} aria-label="Previous image">← Prev</button>
          <div className="gallery-dots">
            {project.gallery.map((image, index) => (
              <button
                key={image}
                className={activeImage === index ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={() => moveGallery(1)} aria-label="Next image">Next →</button>
        </div>
      </section>

      <section className="case-notes">
        {[
          ["01", "Challenge", project.challenge],
          ["02", "Process", project.process],
          ["03", "Outcome", project.outcome],
        ].map(([number, title, text]) => (
          <article key={title} data-reveal>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <button
        className="next-project"
        onClick={() => navigate(`/project/${nextProject.slug}`)}
      >
        <span>Next case study</span>
        <strong>{nextProject.title}</strong>
        <span>↗</span>
      </button>
    </main>
  );
}

function BajikaCaseStudy({
  project,
  navigate,
}: {
  project: Project;
  navigate: (path: string) => void;
}) {
  const ueq = [
    { label: "Attractiveness", staff: 2.083, client: 2.467 },
    { label: "Perspicuity", staff: 2.0, client: 2.292 },
    { label: "Efficiency", staff: 2.2, client: 2.3 },
    { label: "Dependability", staff: 2.075, client: 2.2 },
    { label: "Stimulation", staff: 2.175, client: 2.417 },
    { label: "Novelty", staff: 1.825, client: 1.975 },
  ];
  const process = [
    ["01", "Empathize", "Field observation and open-ended questionnaires with six Bajika staff members."],
    ["02", "Define", "Translated recurring client and operational pain points into focused problem statements."],
    ["03", "Ideate", "Mapped use cases, activity flows, public information architecture, and staff workflows."],
    ["04", "Prototype", "Built a shared design system and high-fidelity prototypes for two distinct user roles."],
    ["05", "Test", "Validated task completion and experience using Maze, SUS, and UEQ."],
  ];

  return (
    <main className="bajika-case">
      <section className="bajika-case-hero">
        <button className="bajika-back" onClick={() => navigate("/work")}>
          ← Back to all work
        </button>
        <div className="bajika-title-row">
          <div>
            <p className="eyebrow">Final research · 2026</p>
            <h1>BAJIKA<br />WEDDING</h1>
          </div>
          <div className="bajika-summary">
            <span>UI/UX · Website · Dashboard</span>
            <p>
              An integrated wedding organizer experience that makes service
              information clearer for clients and operational work more
              structured for staff.
            </p>
          </div>
        </div>
        <img
          className="bajika-main-image"
          src={project.hero}
          alt="Bajika Wedding Organizer website overview"
        />
        <div className="bajika-facts">
          {[
            ["Role", "UI/UX Designer & Researcher"],
            ["Method", "Design Thinking"],
            ["Tools", "Figma · Maze · UEQ"],
            ["Deliverables", "Public website · Staff dashboard"],
          ].map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </section>

      <section className="bajika-overview" data-reveal>
        <div>
          <p className="eyebrow">01 · Overview</p>
          <h2>FROM SCATTERED CHATS TO ONE CONNECTED EXPERIENCE.</h2>
        </div>
        <div className="bajika-overview-copy">
          <p>
            Bajika relied on Instagram, TikTok, and WhatsApp for promotion and
            client communication. Important information and operational records
            lived across different channels without one reliable source.
          </p>
          <p>
            The research explored how one digital system could support two
            connected experiences: an informative public website for prospective
            clients and a focused internal dashboard for staff.
          </p>
        </div>
      </section>

      <section className="bajika-problems">
        <p className="eyebrow">02 · The problem</p>
        <div className="problem-columns">
          <article data-reveal>
            <span>For clients</span>
            <h3>INFORMATION WAS HARD TO FIND.</h3>
            <ul>
              <li>Unclear package contents and price differences</li>
              <li>No clear booking, timeline, and deposit flow</li>
              <li>Date availability required repeated chat</li>
              <li>Service and vendor information was fragmented</li>
            </ul>
          </article>
          <article data-reveal>
            <span>For staff</span>
            <h3>OPERATIONS WERE HARD TO CONTROL.</h3>
            <ul>
              <li>Repeated questions increased communication workload</li>
              <li>Booking data was spread across platforms</li>
              <li>Manual records increased double-booking risk</li>
              <li>VIP and VVIP guest lists were managed manually</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bajika-process">
        <div className="bajika-section-heading">
          <p className="eyebrow">03 · Process</p>
          <h2>FIVE STAGES, ONE CONTINUOUS LEARNING LOOP.</h2>
        </div>
        <div className="process-line">
          {process.map(([number, title, copy]) => (
            <article key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bajika-system" data-reveal>
        <div className="bajika-section-heading">
          <p className="eyebrow">04 · Design system</p>
          <h2>A CALM VISUAL LANGUAGE FOR A HIGH-EMOTION SERVICE.</h2>
        </div>
        <img src="/assets/bajika-design-system.jpg" alt="Bajika visual design system" />
        <p>
          Warm neutrals, editorial typography, reusable controls, status chips,
          and form patterns create consistency across the public website and
          operational dashboard.
        </p>
      </section>

      <section className="bajika-solutions">
        <p className="eyebrow">05 · The solution</p>
        <div className="solution-grid">
          <article data-reveal>
            <img src="/assets/herosection.png" alt="Bajika client service pages" />
            <span>Role 01 · Prospective client</span>
            <h3>PUBLIC WEBSITE</h3>
            <p>
              Packages, pricing, workflow, portfolio, recommended vendors, FAQ,
              and booking requests are organized into a clear discovery journey.
            </p>
          </article>
          <article data-reveal>
            <img src="/assets/staffsection.jpg" alt="Bajika staff dashboard login" />
            <span>Role 02 · Internal staff</span>
            <h3>STAFF WORKSPACE</h3>
            <p>
              Client records, event schedules, booking statuses, notifications,
              and guest lists are brought into a more controlled workflow.
            </p>
          </article>
        </div>
      </section>

      <section className="bajika-validation">
        <div className="bajika-section-heading">
          <p className="eyebrow">06 · Validation</p>
          <h2>THE DESIGN WAS TESTED, NOT JUST PRESENTED.</h2>
        </div>
        <div className="validation-score-grid">
          <article>
            <span>Staff SUS</span><strong>84</strong><small>/ 100 · Excellent</small>
            <div><i style={{ width: "84%" }} /></div>
          </article>
          <article>
            <span>Client SUS</span><strong>80.75</strong><small>/ 100 · Very good</small>
            <div><i style={{ width: "80.75%" }} /></div>
          </article>
          <article>
            <span>Staff MAUS</span><strong>65–74</strong><small>Medium usability</small>
            <div><i style={{ width: "69.5%" }} /></div>
          </article>
          <article>
            <span>Client MAUS</span><strong>90–99</strong><small>High usability</small>
            <div><i style={{ width: "94.5%" }} /></div>
          </article>
        </div>

        <div className="bajika-ueq">
          <div className="bajika-ueq-intro">
            <div>
              <p className="eyebrow">UEQ comparison · Scale −3 to +3</p>
              <h3>ALL SIX DIMENSIONS SCORED POSITIVELY.</h3>
            </div>
            <div className="bajika-ueq-legend">
              <span><i /> Staff</span>
              <span><i /> Client</span>
            </div>
          </div>
          <div className="bajika-ueq-chart">
            {ueq.map((metric) => (
              <div className="bajika-ueq-row" key={metric.label}>
                <span>{metric.label}</span>
                <div>
                  <i style={{ width: `${(metric.staff / 3) * 100}%` }} />
                  <i style={{ width: `${(metric.client / 3) * 100}%` }} />
                </div>
                <strong>{metric.staff.toFixed(2)} / {metric.client.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="validation-insights">
          <article>
            <span>Highest staff dimension</span>
            <strong>2.20</strong>
            <h3>Efficiency</h3>
            <p>Staff felt the prototype supported faster and more focused task completion.</p>
          </article>
          <article>
            <span>Highest client dimension</span>
            <strong>2.42</strong>
            <h3>Stimulation</h3>
            <p>Clients found the experience engaging, pleasant, and motivating to explore.</p>
          </article>
          <article>
            <span>Benchmark position</span>
            <strong>6/6</strong>
            <h3>Good–Excellent</h3>
            <p>Every UEQ dimension landed in a positive benchmark category for both roles.</p>
          </article>
        </div>
      </section>

      <section className="bajika-gallery">
        <div className="bajika-section-heading">
          <p className="eyebrow">07 · Selected screens</p>
          <h2>ONE SYSTEM, TWO CONNECTED EXPERIENCES.</h2>
        </div>
        <div className="bajika-gallery-grid">
          {[
            ["/assets/frame43.jpg", "Brand story and team"],
            ["/assets/forservices.jpg", "Services and vendor discovery"],
            ["/assets/pastportfolio.jpg", "Wedding portfolio"],
            ["/assets/bajika-login.jpg", "Staff access"],
          ].map(([image, caption]) => (
            <figure key={image} data-reveal>
              <img src={image} alt={caption} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bajika-learnings" data-reveal>
        <p className="eyebrow">08 · Key takeaway</p>
        <blockquote>
          “A clear public experience reduces repeated questions, while a focused
          internal experience gives staff more control over daily operations.”
        </blockquote>
        <p>
          The next iteration should prioritize simplifying complex staff tasks,
          where MAUS scores indicate more room for improvement than the client-facing flow.
        </p>
      </section>

      <button className="bajika-next" onClick={() => navigate("/project/simoneva-berani")}>
        <span>Next project</span>
        <strong>SIMONEVA BERANI</strong>
        <span>↗</span>
      </button>
    </main>
  );
}

function About({ navigate }: { navigate: (path: string) => void }) {
  const capabilities = [
    ["01", "User Research", "Stakeholder interviews, requirement analysis, and usability testing."],
    ["02", "UI Design", "High-fidelity interfaces, design systems, and component libraries."],
    ["03", "Prototyping", "Interactive prototypes for validation and developer handoff."],
    ["04", "Data Visualization", "Dashboard layouts, monitoring displays, and clear visual stories."],
  ];
  const personalSkills = [
    "Problem Solving",
    "Systems Thinking",
    "Creative Direction",
    "Team Collaboration",
    "Attention to Detail",
    "Adaptability",
  ];
  const softwareSkills = [
    ["Figma", "Interface design"],
    ["FigJam", "Workshop & mapping"],
    ["Canva", "Visual design"],
    ["CapCut", "Video editing"],
    ["Lightroom", "Photo editing"],
    ["React", "Front-end"],
    ["JavaScript", "Development"],
    ["Excel", "Data processing"],
    ["PowerPoint", "Presentation"],
  ];
  return (
    <main>
      <section className="about-hero">
        <div>
          <p className="eyebrow">About · MFT</p>
          <h1>DESIGNING WITH<br />PURPOSE &amp; CLARITY.</h1>
        </div>
        <img src="/assets/fathan2.jpg" alt="Fathan standing on campus stairs" />
      </section>
      <section className="bio" data-reveal>
        <h2>MUHAMMAD<br />FATHAN TSAQIB</h2>
        <div>
          <p className="bio-lead">
            A UI/UX Designer and creative practitioner based in Makassar, Indonesia.
          </p>
          <p>
            Fresh graduate of Information Systems from Universitas Hasanuddin
            (GPA 3.82/4.00) with hands-on experience designing digital products
            for government institutions.
          </p>
          <p>
            My work sits at the intersection of design and function. I care
            deeply about making complex systems feel simple, intuitive, and human.
          </p>
        </div>
      </section>
      <section className="skill-profile">
        <article className="personal-skills" data-reveal>
          <div className="section-label">
            <span>01</span>
            <p className="eyebrow">Personal skills</p>
          </div>
          <h2>HOW I<br />SHOW UP.</h2>
          <div className="personal-skill-list">
            {personalSkills.map((skill, index) => (
              <div key={skill}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{skill}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="software-skills" data-reveal>
          <div className="section-label">
            <span>02</span>
            <p className="eyebrow">Software skills</p>
          </div>
          <h2>TOOLS OF<br />THE TRADE.</h2>
          <div className="software-grid">
            {softwareSkills.map(([software, category], index) => (
              <div key={software} className="software-item">
                <span className="software-initial">
                  {software === "JavaScript" ? "JS" : software.slice(0, 2)}
                </span>
                <div>
                  <strong>{software}</strong>
                  <small>{category}</small>
                </div>
                <span className="software-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="education" data-reveal>
        <div className="section-label">
          <span>03</span>
          <p className="eyebrow">Education</p>
        </div>
        <div className="education-content">
          <div>
            <p className="education-year">Graduated · 2026</p>
            <h2>UNIVERSITAS<br />HASANUDDIN</h2>
          </div>
          <div className="education-detail">
            <span>Bachelor&apos;s Degree</span>
            <h3>Information Systems</h3>
            <p>
              Built a foundation in technology, product thinking, information
              architecture, and human-centered digital systems.
            </p>
          </div>
          <div className="gpa-card">
            <span>GPA</span>
            <strong>3.82</strong>
            <small>/ 4.00</small>
          </div>
        </div>
      </section>
      <section className="capabilities">
        <p className="eyebrow">Core capabilities</p>
        {capabilities.map(([number, title, copy]) => (
          <article key={number} data-reveal>
            <span>{number}</span><h3>{title}</h3><p>{copy}</p>
          </article>
        ))}
      </section>
      <Footer navigate={navigate} />
    </main>
  );
}

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-main">
        <p className="eyebrow light">Contact · Makassar</p>
        <h1>LET&apos;S MAKE<br />SOMETHING<br /><span>MEANINGFUL.</span></h1>
        <a className="contact-email" href="mailto:fathant03@gmail.com">
          fathant03@gmail.com <span>↗</span>
        </a>
      </section>
      <section className="contact-details">
        <div><span>Email</span><a href="mailto:fathant03@gmail.com">fathant03@gmail.com</a></div>
        <div><span>Phone / WhatsApp</span><a href="tel:+6285341344307">+62 853 4134 4307</a></div>
        <div><span>Instagram</span><a href="https://instagram.com/fathannnts" target="_blank" rel="noreferrer">@fathannnts ↗</a></div>
        <div><span>Location</span><p>Makassar, South Sulawesi</p></div>
      </section>
    </main>
  );
}

export default function App() {
  const { path, navigate } = useRoute();
  useReveal(path);
  const project = path.startsWith("/project/")
    ? projects.find((item) => item.slug === path.split("/")[2])
    : undefined;

  useEffect(() => {
    document.title = project
      ? `${project.title} — M. Fathan Tsaqib`
      : "Muhammad Fathan Tsaqib — UI/UX Designer";
  }, [project]);

  let page = <Home navigate={navigate} />;
  if (path === "/work") page = <Work navigate={navigate} />;
  if (path === "/about") page = <About navigate={navigate} />;
  if (path === "/contact") page = <Contact />;
  if (project) {
    page = project.slug === "bajika-wedding"
      ? <BajikaCaseStudy project={project} navigate={navigate} />
      : <ProjectDetail project={project} navigate={navigate} />;
  }

  return (
    <>
      <Header path={path} navigate={navigate} />
      <div className="page-enter" key={path}>{page}</div>
    </>
  );
}
