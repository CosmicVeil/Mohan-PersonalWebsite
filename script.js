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

// Email links: a mailto link only works when the visitor has a mail app set
// up, and does nothing otherwise. So the click also copies the address and
// says so, which works either way. The mailto still opens if it can.
// Text links swap their text; icon links show a small note beside the icon.
(function () {
  document.querySelectorAll("[data-copy-email]").forEach(function (link) {
    var email = link.getAttribute("href").replace(/^mailto:/, "");
    var isIcon = link.classList.contains("icon-link");
    var timer;

    function show(message) {
      if (!isIcon) { link.textContent = message; return; }
      link.dataset.note = message;
      link.setAttribute("aria-label", message);
      clearTimeout(timer);
      timer = setTimeout(function () {
        delete link.dataset.note;
        link.setAttribute("aria-label", "Email " + email);
      }, 2500);
    }

    link.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () { show("Copied " + email); },
          function () { show(email); }
        );
      } else {
        show(email);
      }
    });
  });
})();
