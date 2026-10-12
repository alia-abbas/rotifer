// Light/dark mode. Loaded in <head> so the theme is set before the page draws (no white flash).
// Uses the visitor's choice if they've clicked the toggle, otherwise their system setting.

(function () {
  const KEY = "rotifer-theme";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  apply(saved() || (systemDark.matches ? "dark" : "light"));

  // Follow system changes until the visitor picks a theme themselves
  systemDark.addEventListener("change", function (e) {
    if (!saved()) apply(e.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    });
  });
})();
