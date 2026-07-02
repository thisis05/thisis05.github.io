const publications = [
  {
    year: 2026,
    type: "conference",
    typeLabel: "Conference",
    badge: "ACL 2026 Industry",
    title: "Pre-Deployment Advertisement Ranking under Data Scarcity via Context-Aware Criteria Generation with VLMs",
    authors: [
      "Kyungho Kim*",
      "Yeonje Choi*",
      "Gyurim Hwang",
      "Sejin Chung",
      "Hongseok Lee",
      "Myeong Ho Song",
      "Yeongho Kim",
      "Sunwoo Kim",
      "Jongha Lee",
      "Juyeon Kim",
      "Kijung Shin"
    ],
    venue: "Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 6: Industry Track)",
    note: "Selected for oral presentation. A preliminary version appeared at DATA-FM 2026.",
    links: [
      { label: "Paper", url: "https://aclanthology.org/2026.acl-industry.28/" },
      { label: "PDF", url: "https://aclanthology.org/2026.acl-industry.28.pdf" },
      { label: "Code", url: "https://github.com/K-Kyungho/ADvisor" }
    ]
  },
  {
    year: 2026,
    type: "workshop",
    typeLabel: "Workshop",
    badge: "ICLR 2026 DATA-FM",
    title: "Context-Aware Criteria Generation with VLMs for Advertisement Ranking under Data Scarcity",
    authors: [
      "Kyungho Kim",
      "Yeonje Choi",
      "Gyurim Hwang",
      "Sejin Chung",
      "Hongseok Lee",
      "Myeong Ho Song",
      "Yeongho Kim",
      "Sunwoo Kim",
      "Jongha Lee",
      "Juyeon Kim",
      "Kijung Shin"
    ],
    venue: "ICLR 2026 Workshop on Navigating and Addressing Data Problems for Foundation Models (DATA-FM)",
    note: "Workshop version of the advertisement ranking work.",
    links: [
      { label: "OpenReview", url: "https://openreview.net/forum?id=QnFwLLRyPV" },
      { label: "PDF", url: "https://openreview.net/pdf?id=QnFwLLRyPV" },
      { label: "Code", url: "https://github.com/K-Kyungho/ADvisor" }
    ]
  },
  {
    year: 2026,
    type: "conference",
    typeLabel: "Conference",
    badge: "ICDE 2026",
    title: "Effective Dataset Distillation for Spatio-Temporal Forecasting with Bi-dimensional Compression",
    authors: ["Taehyung Kwon*", "Yeonje Choi*", "Yeongho Kim", "Kijung Shin"],
    venue: "42nd IEEE International Conference on Data Engineering (ICDE 2026)",
    note: "STemDist: dataset distillation for spatio-temporal time-series forecasting with spatial and temporal compression.",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2603.10410" },
      { label: "PDF", url: "https://arxiv.org/pdf/2603.10410" },
      { label: "Code", url: "https://github.com/kbrother/STemDist" }
    ]
  },
  {
    year: 2025,
    type: "preprint",
    typeLabel: "Preprint",
    badge: "arXiv 2025",
    title: "A Survey on Centrality and Importance Measures in Hypergraphs: Categorization and Empirical Insights",
    authors: ["Jaewan Chun", "Fanchen Bu", "Yeongho Kim", "Atsushi Miyauchi", "Francesco Bonchi", "Kijung Shin"],
    venue: "arXiv:2512.00107",
    note: "Survey of centrality and importance measures for hypergraphs.",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2512.00107" },
      { label: "PDF", url: "https://arxiv.org/pdf/2512.00107" }
    ]
  },
  {
    year: 2025,
    type: "conference",
    typeLabel: "Conference",
    badge: "WWW 2025",
    title: "Beyond Neighbors: Distance-Generalized Graphlets for Enhanced Graph Characterization",
    authors: ["Yeongho Kim", "Yuyeong Kim", "Geon Lee", "Kijung Shin"],
    venue: "The Web Conference 2025 (WWW 2025)",
    note: "Introduces distance-generalized graphlets and the EDGE exact counting algorithm.",
    links: [
      { label: "Paper", url: "https://doi.org/10.1145/3696410.3714558" },
      { label: "Code", url: "https://github.com/thisis05/EDGE" }
    ]
  }
];

const escapeHTML = (value) =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  }[character]));

const escapeAttribute = (value) => escapeHTML(value).replace(/`/g, "&#096;");

const formatAuthors = (authors) => authors
  .map((author) => {
    const safeAuthor = escapeHTML(author);
    return safeAuthor.replace(/Yeongho Kim/g, '<strong class="me">Yeongho Kim</strong>');
  })
  .join(", ");

const renderPublications = (filter = "all") => {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const visiblePublications = publications.filter((publication) =>
    filter === "all" || publication.type === filter
  );

  const groupedByYear = visiblePublications.reduce((groups, publication) => {
    const year = publication.year;
    if (!groups[year]) groups[year] = [];
    groups[year].push(publication);
    return groups;
  }, {});

  const html = Object.keys(groupedByYear)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => `
      <div class="pub-year">${escapeHTML(year)}</div>
      ${groupedByYear[year].map((publication) => `
        <article class="pub-card">
          <div class="pub-topline">
            <span class="pub-badge">${escapeHTML(publication.badge)}</span>
            <span class="pub-type">${escapeHTML(publication.typeLabel)}</span>
          </div>
          <h3 class="pub-title">${escapeHTML(publication.title)}</h3>
          <p class="pub-authors">${formatAuthors(publication.authors)}</p>
          <p class="pub-venue">${escapeHTML(publication.venue)}</p>
          ${publication.note ? `<p class="pub-note">${escapeHTML(publication.note)}</p>` : ""}
          <div class="pub-links">
            ${publication.links.map((link) => `
              <a class="pub-link" href="${escapeAttribute(link.url)}" target="_blank" rel="noopener noreferrer">
                ${escapeHTML(link.label)}
              </a>
            `).join("")}
          </div>
        </article>
      `).join("")}
    `)
    .join("");

  container.innerHTML = html || '<p class="pub-note">No publications found for this filter.</p>';
};

const setupPublicationFilters = () => {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPublications(button.dataset.filter);
    });
  });
};

const setupThemeToggle = () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.dataset.theme = initialTheme;

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  });
};

const setupMobileMenu = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  menuToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });
};

const setupActiveNav = () => {
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 });

  sections.forEach((section) => observer.observe(section));
};

const setupCurrentYear = () => {
  const currentYear = document.getElementById("current-year");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
};

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileMenu();
  setupPublicationFilters();
  setupActiveNav();
  setupCurrentYear();
  renderPublications();
});
