/* =========================
   COOKIE BANNER
========================= */
const acceptBtn = document.getElementById("accept-cookies");
const banner = document.getElementById("cookie-banner");

if (localStorage.getItem("cookies-accepted")) {
  banner.style.display = "none";
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookies-accepted", "true");
  banner.style.display = "none";
});


/* =========================
   HEADER LOAD
========================= */
fetch("/andet/header-footer/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;

    initHeader();
    initLanguage();
    initMobileDropdown();
  });


/* =========================
   HAMBURGER MENU
========================= */
function initHeader() {
  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}


/* =========================
   LANGUAGE SWITCH
========================= */
function initLanguage() {
  const path = window.location.pathname;
  const isEnglish = path.startsWith("/en");

  const danish = document.querySelector(".lang");
  const english = document.querySelector(".lang-en");

  if (!danish || !english) return;

  english.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = isEnglish ? path : "/en" + path;
  });

  danish.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = isEnglish
      ? path.replace("/en", "") || "/"
      : path;
  });
}


/* =========================
   MOBILE DROPDOWN
========================= */
function initMobileDropdown() {
  const toggles = document.querySelectorAll(".mobile-toggle");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("open");
    });
  });
}


/* =========================
   DESKTOP DROPDOWN (hvis du bruger klik senere)
========================= */
document.querySelectorAll(".dropdown").forEach(dropdown => {
  const btn = dropdown.querySelector(".dropdown-toggle");

  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("open");
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown.open").forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});


/* =========================
   Footer
========================= */
fetch("/andet/header-footer/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  });