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
