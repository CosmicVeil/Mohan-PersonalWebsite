// Theme toggle. The initial theme is set by a small inline script in each
// page's <head> so the page never paints in the wrong colours first.
(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  function render() {
    var dark = root.dataset.theme !== "light";
    // The label names the theme you'd switch to.
    button.textContent = dark ? "Light" : "Dark";
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  button.addEventListener("click", function () {
    var next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    render();
  });

  render();
})();

// "Get in touch": a mailto link only works when the visitor has a mail app
// set up, and does nothing otherwise. So the click also copies the address
// and shows it, which works either way. The mailto still opens if it can.
(function () {
  document.querySelectorAll("[data-copy-email]").forEach(function (link) {
    var email = link.getAttribute("href").replace(/^mailto:/, "");
    link.addEventListener("click", function () {
      var shown = function (text) { link.textContent = text; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () { shown("Copied " + email); },
          function () { shown(email); }
        );
      } else {
        shown(email);
      }
    });
  });
})();
