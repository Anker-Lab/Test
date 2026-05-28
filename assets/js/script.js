document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COOKIE BANNER
  ========================= */

  function initCookies() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (!banner || !acceptBtn) return;

    if (localStorage.getItem("cookies-accepted") === "true") {
      banner.style.display = "none";
      return;
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookies-accepted", "true");
      banner.style.display = "none";
    });
  }


  /* =========================
     LINKS DATABASE
  ========================= */

  const LINKS = {
    signup: "https://nemtilmeld.dk",
    testimony: "https://kirkeibyen.churchcenter.com/people/forms/1039578",
    newsletter: "https://mailchi.mp/kirkeibyen/signup-nyhedsmail",
    facebook: "https://www.facebook.com/kibkolding",
    instagram: "https://www.instagram.com/kirkeibyen_kolding"
  };

  function applyDataLinks(root = document) {
    root.querySelectorAll("[data-link]").forEach(el => {
      const key = el.dataset.link;
      if (LINKS[key]) el.href = LINKS[key];
    });
  }


  /* =========================
     HEADER LOGIC
  ========================= */

  function initHeader() {

    const header = document.querySelector("header");
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    const logo = document.getElementById("header-logo");
    const lang = document.querySelector(".lang");

    if (!header || !burger || !menu || !logo) return;

    function updateLogo() {
      const scrolled = window.scrollY > 50;
      const open = header.classList.contains("menu-open");

      logo.src = (scrolled || open)
        ? "/assets/logo/move/move.svg"
        : "/assets/logo/move/move_w.svg";
    }

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
      updateLogo();
    });

    updateLogo();

    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      header.classList.toggle("menu-open", isOpen);
      burger.textContent = isOpen ? "✕" : "☰";
      document.body.style.overflow = isOpen ? "hidden" : "";

      lang?.classList.remove("open");
      updateLogo();
    });

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        header.classList.remove("menu-open");
        burger.textContent = "☰";
        document.body.style.overflow = "";
        updateLogo();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        menu.classList.remove("open");
        header.classList.remove("menu-open");
        burger.textContent = "☰";
        document.body.style.overflow = "";
        updateLogo();
      }
    });

    if (lang) {
      lang.addEventListener("click", (e) => {
        e.stopPropagation();

        const isOpen = lang.classList.contains("open");

        menu.classList.remove("open");
        header.classList.remove("menu-open");
        burger.textContent = "☰";
        document.body.style.overflow = "";

        lang.classList.toggle("open", !isOpen);
        updateLogo();
      });
    }
  }


  /* =========================
     HEADER + FOOTER LOADER
  ========================= */

  const headerPlaceholder = document.getElementById("header");
  const footerPlaceholder = document.getElementById("footer");


  if (headerPlaceholder) {
    fetch("/assets/header-footer/header.html")
      .then(res => res.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;

        initHeader();
        applyDataLinks(headerPlaceholder);
      });
  }

  if (footerPlaceholder) {
    fetch("/assets/header-footer/footer.html")
      .then(res => res.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;

        applyDataLinks(footerPlaceholder);
      });
  }


  /* =========================
     PAGE CONTENT LINKS
  ========================= */

  applyDataLinks();

  /* =========================
     INIT COOKIE
  ========================= */

  initCookies();

});


/* =========================
     loading screen
  ========================= */
document.querySelectorAll(".js-tilmeld").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const url = btn.href;

    // vis "loading state"
    btn.classList.add("loading");
    btn.textContent = "Åbner tilmelding...";

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  });
});