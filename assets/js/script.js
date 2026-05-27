document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COOKIE
  ========================= */
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (banner && acceptBtn) {
    if (localStorage.getItem("cookies-accepted") === "true") {
      banner.style.display = "none";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookies-accepted", "true");
      banner.style.display = "none";
    });
  }


  /* =========================
     HEADER LOAD
  ========================= */
  const headerPlaceholder = document.getElementById("header");
  const footerPlaceholder = document.getElementById("footer");

  if (headerPlaceholder) {
    fetch("/assets/header-footer/header.html")
      .then(res => res.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;

        initHeader();
      });
  }

  if (footerPlaceholder) {
    fetch("/assets/header-footer/footer.html")
      .then(res => res.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;
      });
  }


  /* =========================
     HEADER LOGIC (ALT I ÉN)
  ========================= */
  function initHeader() {

    const header = document.querySelector("header");
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    const logo = document.getElementById("header-logo");
    const lang = document.querySelector(".lang");

    if (!header || !burger || !menu || !logo) return;

    /* =========================
       LOGO STATE (ENESTE KILDE)
    ========================= */
    function updateLogo() {
      const scrolled = window.scrollY > 50;
      const menuOpen = header.classList.contains("menu-open");

      if (scrolled || menuOpen) {
        logo.src = "/assets/logo/move/move.svg";
      } else {
        logo.src = "/assets/logo/move/move_w.svg";
      }
    }


    /* =========================
       SCROLL
    ========================= */
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
      updateLogo();
    });

    updateLogo();


    /* =========================
       HAMBURGER
    ========================= */
    lang?.classList.remove("open");

    burger.addEventListener("click", () => {

  const isOpen = menu.classList.toggle("open");

  /* luk lang */
  lang?.classList.remove("open");

  header.classList.toggle("menu-open", isOpen);

  burger.textContent = isOpen ? "✕" : "☰";

  document.body.style.overflow = isOpen ? "hidden" : "";

  updateLogo();
});



    window.addEventListener("resize", () => {

  if (window.innerWidth > 768) {

    menu.classList.remove("open");
    header.classList.remove("menu-open");

    burger.textContent = "☰";

    document.body.style.overflow = "";

    /* logo tilbage til korrekt state */
    const scrolled = window.scrollY > 50;

    logo.src = scrolled
      ? "/assets/logo/move/move.svg"
      : "/assets/logo/move/move_w.svg";
  }
});


    /* =========================
       CLOSE MENU ON LINK CLICK
    ========================= */
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {

        menu.classList.remove("open");
        header.classList.remove("menu-open");

        burger.classList.remove("open");
        burger.textContent = "☰";

        document.body.style.overflow = "";

        updateLogo();
      });
    });


    /* =========================
   LANGUAGE
========================= */
if (lang) {

  lang.addEventListener("click", (e) => {

    e.stopPropagation();

    const langIsOpen = lang.classList.contains("open");

    /* hvis hamburger er åben → luk den */
    menu.classList.remove("open");
    header.classList.remove("menu-open");

    burger.textContent = "☰";
    document.body.style.overflow = "";

    /* toggle lang */
    lang.classList.toggle("open", !langIsOpen);

    /* vigtigt: logo tilbage til korrekt state */
    updateLogo();
  });

  /* klik udenfor lukker */
  document.addEventListener("click", (e) => {
    if (!lang.contains(e.target)) {
      lang.classList.remove("open");
    }
  });
}

}


  /* =========================
     TABS
  ========================= */
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  if (tabs.length && contents.length) {
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {

        const tab = btn.dataset.tab;

        tabs.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");

        const target = document.getElementById(tab);
        if (target) target.classList.add("active");
      });
    });
  }


  /* =========================
     PWA
  ========================= */
  let deferredPrompt;
  const installBtn = document.getElementById("installBtn");

  if (installBtn) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      installBtn.style.display = "block";

      installBtn.addEventListener("click", () => {
        deferredPrompt.prompt();
      });
    });
  }

});