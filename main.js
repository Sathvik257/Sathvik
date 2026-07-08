const EMAIL = "polisettysathvik@gmail.com";

const projects = [
  {
    name: "Mini-CRM",
    label: "AI commerce ops",
    categories: ["ai", "product"],
    language: "TypeScript",
    status: "Live app",
    focus: "Customer intelligence",
    url: "https://github.com/Sathvik257/Mini-CRM",
    live: "https://mini-crm-weld-seven.vercel.app/",
    description: "AI-native CRM for DTC brands with shopper segmentation, personalized campaigns, simulated delivery callbacks, and campaign performance tracking.",
    icon: "fa-bullhorn",
    visualClass: "visual-crm",
    tech: ["TypeScript", "AI workflows", "Campaigns", "Analytics"]
  },
  {
    name: "AI Anti-Cheating System",
    label: "Exam intelligence",
    categories: ["ai", "product"],
    language: "TypeScript",
    status: "Live app",
    focus: "Trust and monitoring",
    url: "https://github.com/Sathvik257/AI-Anti-Cheating-System",
    live: "https://ai-anti-cheating-system.vercel.app",
    description: "Full-stack exam platform that monitors online tests with TensorFlow.js face and object detection, audio checks, browser restrictions, MongoDB records, and admin review.",
    icon: "fa-shield-halved",
    visualClass: "visual-proctor",
    tech: ["TypeScript", "TensorFlow.js", "MongoDB", "AI risk"]
  },
  {
    name: "Smart Resume Builder",
    label: "AI resume tooling",
    categories: ["ai", "product"],
    language: "JavaScript",
    status: "Live app",
    focus: "Career tooling",
    url: "https://github.com/Sathvik257/Smart-Resume-Builder-with-AI-Suggestions",
    live: "https://smart-resume-builder-with-ai-sugges-nu.vercel.app",
    description: "Client-side AI resume generator with content suggestions, multiple templates, live preview, and professional PDF downloads.",
    icon: "fa-file-pen",
    visualClass: "visual-resume",
    tech: ["JavaScript", "AI suggestions", "PDF export", "Responsive UI"]
  },
  {
    name: "Drug-Induced Autoimmune Detection",
    label: "Health ML",
    categories: ["ai", "product"],
    language: "TypeScript",
    status: "Live app",
    focus: "Health prediction",
    url: "https://github.com/Sathvik257/DRUG-INDUCED-AUTOIMMUNE-DETECTION",
    live: "https://drug-induced-autoimmune-detection.vercel.app",
    description: "Machine learning system that detects possible autoimmune reactions caused by drug exposure to support earlier diagnosis and safer treatment decisions.",
    icon: "fa-prescription-bottle-medical",
    visualClass: "visual-drug",
    tech: ["TypeScript", "Machine Learning", "Healthcare", "Prediction"]
  },
  {
    name: "Smart Grievance Management",
    label: "Serverless platform",
    categories: ["ai", "cloud", "product"],
    language: "JavaScript",
    status: "AWS build",
    focus: "Civic workflow",
    url: "https://github.com/Sathvik257/Smart-Grievance-System-Main",
    description: "AI-powered platform for complaint registration, tracking, and management with serverless AWS infrastructure.",
    icon: "fa-diagram-project",
    visualClass: "visual-grievance",
    tech: ["React.js", "Node.js", "AWS Lambda", "DynamoDB", "Cognito", "S3"]
  },
  {
    name: "Justice GPT",
    label: "Legal AI",
    categories: ["ai"],
    language: "TypeScript",
    status: "Research build",
    focus: "Legal reasoning",
    url: "https://github.com/Sathvik257/Justice-GPT",
    description: "AI-powered legal advisor that analyzes crime descriptions and suggests relevant IPC sections with natural language reasoning.",
    icon: "fa-scale-balanced",
    visualClass: "visual-justice",
    tech: ["TypeScript", "React.js", "Gemini API", "Prompt engineering"]
  },
  {
    name: "Crop Disease Detection",
    label: "Agri vision",
    categories: ["ai", "product"],
    language: "TypeScript",
    status: "Live app",
    focus: "Agri-tech",
    url: "https://github.com/Sathvik257/Crop-disease-detection",
    live: "https://website-update-n8tv.bolt.host/",
    description: "AI web app for detecting crop diseases from leaf images with disease details, treatment guidance, and prevention tips.",
    icon: "fa-seedling",
    visualClass: "visual-crop",
    tech: ["TypeScript", "Computer Vision", "Image analysis", "Agri-tech"]
  },
  {
    name: "Smart Home Automation",
    label: "Voice automation",
    categories: ["automation"],
    language: "Python",
    status: "Prototype",
    focus: "Home control",
    url: "https://github.com/Sathvik257/Smart-Home",
    description: "Voice-controlled smart home system with real-time device monitoring and room-aware automation concepts.",
    icon: "fa-house",
    visualClass: "visual-home",
    tech: ["Python", "Voice control", "Automation", "Realtime monitoring"]
  }
];

let activeProjectIndex = 0;
let activeFilter = "all";

function setLoadingState() {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;
  window.setTimeout(() => overlay.classList.add("hide"), 320);
}

function setupNavigation() {
  const toggle = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!toggle || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionMap = new Map(sections.map((section) => [section.id, section]));
  const navAnchors = [...navLinks.querySelectorAll('a[href^="#"]')];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => anchor.classList.remove("active"));
      const active = navAnchors.find((anchor) => sectionMap.get(anchor.getAttribute("href").slice(1)) === entry.target);
      if (active) active.classList.add("active");
    });
  }, { rootMargin: "-30% 0px -58% 0px", threshold: 0.1 });

  sections.forEach((section) => observer.observe(section));
}

function projectMatchesFilter(project) {
  return activeFilter === "all" || project.categories.includes(activeFilter);
}

function projectActions(project) {
  return `
    <div class="project-actions">
      ${project.live ? `<a class="text-link" href="${project.live}" target="_blank" rel="noopener">Live demo <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ""}
      <a class="text-link" href="${project.url}" target="_blank" rel="noopener">Code <i class="fa-brands fa-github" aria-hidden="true"></i></a>
    </div>
  `;
}

function renderSpotlight() {
  const spotlight = document.getElementById("project-spotlight");
  if (!spotlight) return;

  const project = projects[activeProjectIndex];
  spotlight.innerHTML = `
    <div class="spotlight-visual ${project.visualClass}">
      <div class="spotlight-screen">
        <div class="screen-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="screen-line wide"></div>
        <div class="screen-line"></div>
        <div class="screen-line short"></div>
        <div class="screen-pulse">
          <i class="fa-solid ${project.icon}" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="spotlight-copy">
      <span class="lab-kicker">Spotlight build</span>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="spotlight-stats" aria-label="${project.name} metadata">
        <span>${project.status}</span>
        <span>${project.language}</span>
        <span>${project.focus}</span>
      </div>
      <div class="project-meta">
        ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
      </div>
      ${projectActions(project)}
    </div>
  `;
}

function renderProjects() {
  const showcase = document.querySelector(".project-showcase");
  if (!showcase) return;

  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => projectMatchesFilter(project));

  if (!visibleProjects.some(({ index }) => index === activeProjectIndex)) {
    activeProjectIndex = visibleProjects[0]?.index ?? 0;
  }

  renderSpotlight();

  showcase.innerHTML = visibleProjects.map(({ project, index }) => `
    <article class="project-card reveal ${index === activeProjectIndex ? "is-active" : ""}" data-category="${project.categories.join(" ")}">
      <button class="project-select" type="button" data-project-index="${index}" aria-pressed="${index === activeProjectIndex}" aria-label="Spotlight ${project.name}">
        <div class="project-visual ${project.visualClass}" data-label="${project.label}">
          <div class="project-icon">
            <i class="fa-solid ${project.icon}" aria-hidden="true"></i>
          </div>
        </div>
        <div class="project-body">
          <span class="project-status">${project.status}</span>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            ${project.tech.slice(0, 3).map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>
        </div>
      </button>
      ${projectActions(project)}
    </article>
  `).join("");
}

function setupProjectMotion() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  });
}

function setupProjectLab() {
  const filters = document.querySelectorAll(".filter-btn");
  const showcase = document.querySelector(".project-showcase");
  if (!showcase) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filters.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      renderProjects();
      setupProjectMotion();
      setupRevealAnimations();
    });
  });

  showcase.addEventListener("click", (event) => {
    const selector = event.target.closest("[data-project-index]");
    if (!selector) return;
    activeProjectIndex = Number(selector.dataset.projectIndex);
    renderProjects();
    setupProjectMotion();
    setupRevealAnimations();
  });

  renderProjects();
}

function setupRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach((element) => observer.observe(element));
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 780;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
}

function hydrateMetrics() {
  const projectCounter = document.querySelector("[data-project-count]");
  if (projectCounter) {
    projectCounter.dataset.count = String(projects.length);
    projectCounter.textContent = "0";
  }
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  if (window.emailjs?.init) {
    window.emailjs.init("CrMDL6KSAiH4rynzm");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";
    status.style.color = "#0f766e";

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const endpoint = window.location.protocol === "file:" ? "http://localhost:3001/api/contact" : "/api/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Contact API failed");
      status.textContent = "Message sent successfully.";
      status.style.color = "#0f766e";
      form.reset();
    } catch (error) {
      if (window.emailjs?.sendForm) {
        try {
          await window.emailjs.sendForm("service_m02m5u2", "template_k35mz24", form);
          status.textContent = "Message sent successfully.";
          status.style.color = "#0f766e";
          form.reset();
          return;
        } catch (emailError) {
          console.error(emailError);
        }
      }

      console.error(error);
      status.textContent = `Could not send from the page. Please email ${EMAIL}.`;
      status.style.color = "#b42318";
    }
  });
}

function setupCopyEmail() {
  const button = document.getElementById("copy-email");
  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copied';
      window.setTimeout(() => {
        button.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy email';
      }, 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = String(new Date().getFullYear());
  hydrateMetrics();
  setupProjectLab();
  setupProjectMotion();
  setupNavigation();
  setupRevealAnimations();
  setupCounters();
  setupContactForm();
  setupCopyEmail();
  setLoadingState();
});
