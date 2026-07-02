const publications = [
  {
    year: 2026,
    type: "preprint",
    typeLabel: "Preprint",
    title: "Pre-Deployment Advertisement Ranking under Data Scarcity via Context-Aware Criteria Generation with VLMs",
    authors: [
      "Yeongho Kim",
      "Yeonje Choi",
      "Kijung Shin"
    ],
    venue: "Preprint",
    keywords: ["Dataset Distillation", "Text-attributed Graph"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2606.22975" },
      { label: "Code", url: "https://github.com/thisis05/TaLK" }
    ]
  },
  {
    year: 2026,
    type: "conference",
    typeLabel: "Conference",
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
    venue: "ACL 2026 Industry Track",
    note: [
      { text: "Selected for oral presentation.", highlight: true }
    ],
    note: [
      { text: " A preliminary version appeared at " },
      { ref: "W1" },
      { text: "." }
    ],
    keywords: ["Multimodal Learning", "Marketing AI"],
    links: [
      { label: "Paper", url: "https://aclanthology.org/2026.acl-industry.28/" },
      { label: "Code", url: "https://github.com/K-Kyungho/ADvisor" }
    ]
  },
  {
    year: 2026,
    type: "workshop",
    typeLabel: "Workshop",
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
    venue: "ICLR 2026 DATA-FM Workshop",
    keywords: ["Multimodal Learning", "Marketing AI"],
    links: [
      { label: "Paper", url: "https://openreview.net/pdf?id=QnFwLLRyPV" },
      { label: "Code", url: "https://github.com/K-Kyungho/ADvisor" }
    ]
  },
  {
    year: 2026,
    type: "conference",
    typeLabel: "Conference",
    title: "Effective Dataset Distillation for Spatio-Temporal Forecasting with Bi-dimensional Compression",
    authors: ["Taehyung Kwon*", "Yeonje Choi*", "Yeongho Kim", "Kijung Shin"],
    venue: "ICDE 2026",
    keywords: ["Dataset Distillation", "Spatio-Temporal Forecasting"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2603.10410" },
      { label: "Code", url: "https://github.com/kbrother/STemDist" }
    ]
  },
  {
    year: 2025,
    type: "preprint",
    typeLabel: "Preprint",
    title: "A Survey on Centrality and Importance Measures in Hypergraphs: Categorization and Empirical Insights",
    authors: ["Jaewan Chun", "Fanchen Bu", "Yeongho Kim", "Atsushi Miyauchi", "Francesco Bonchi", "Kijung Shin"],
    venue: "Preprint",
    note: "Survey of centrality and importance measures for hypergraphs.",
    keywords: ["Hypergraph Mining"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2512.00107" },
      { label: "Code", url: "https://github.com/jaewan01/hypergraph-centrality-survey" }
    ]
  },
  {
    year: 2025,
    type: "conference",
    typeLabel: "Conference",
    title: "Beyond Neighbors: Distance-Generalized Graphlets for Enhanced Graph Characterization",
    authors: ["Yeongho Kim", "Yuyeong Kim", "Geon Lee", "Kijung Shin"],
    venue: "WWW 2025",
    keywords: ["Graph Mining"],
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

const formatNote = (note) => {
  if (!note) return "";

  if (typeof note === "string") {
    return escapeHTML(note);
  }

  return note.map((part) => {
    if (part.ref) {
      return `<a class="note-ref" href="#pub-${escapeAttribute(part.ref)}">${escapeHTML(part.ref)}</a>`;
    }

    const text = escapeHTML(part.text || "");
    return part.highlight ? `<strong class="note-highlight">${text}</strong>` : text;
  }).join("");
};

const getPublicationPrefix = (type) => {
  const prefixes = {
    conference: "C",
    workshop: "W",
    journal: "J",
    preprint: "P"
  };

  return prefixes[type] || "O";
};

const getNumberedPublications = () => {
  const counters = {
    conference: 0,
    workshop: 0,
    journal: 0,
    preprint: 0
  };

  const numberedReversed = [...publications].reverse().map((publication) => {
    const type = publication.type;

    if (!Object.prototype.hasOwnProperty.call(counters, type)) {
      counters[type] = 0;
    }

    counters[type] += 1;

    return {
      ...publication,
      pubNumber: `${getPublicationPrefix(type)}${counters[type]}`
    };
  });

  return numberedReversed.reverse();
};

const renderPublications = (filter = "all") => {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const numberedPublications = getNumberedPublications();

  const visiblePublications = numberedPublications.filter((publication) =>
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
        <article class="pub-card" id="pub-${escapeAttribute(publication.pubNumber)}">
          <div class="pub-keywords pub-keywords-top">
            ${(publication.keywords || []).map((keyword) => `
              <span class="pub-keyword">${escapeHTML(keyword)}</span>
            `).join("")}
          </div>

          <h3 class="pub-title">
            <span class="pub-title-number">[${escapeHTML(publication.pubNumber)}]</span>
            ${escapeHTML(publication.title)}
          </h3>

          <p class="pub-authors">${formatAuthors(publication.authors)}</p>
          <p class="pub-venue">${escapeHTML(publication.venue)}</p>

          ${publication.note ? `<p class="pub-note">${formatNote(publication.note)}</p>` : ""}

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

const setupPdfDownload = () => {
  const button = document.getElementById("download-page-pdf");
  if (!button) return;

  button.addEventListener("click", () => {
    const originalTitle = document.title;
    document.title = "Yeongho_Kim_CV";
    window.print();
    document.title = originalTitle;
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
  setupMobileMenu();
  setupPublicationFilters();
  setupPdfDownload();
  setupActiveNav();
  setupCurrentYear();
  renderPublications();
});
