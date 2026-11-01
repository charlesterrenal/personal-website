// Sets the theme before first paint so dark-mode visitors see no light flash.
// Loaded as a blocking script from index.html and 404.html; kept as a file so the CSP needs no inline scripts.
(function () {
  var dark = !matchMedia('(prefers-color-scheme: light)').matches;
  try { var saved = localStorage.getItem('theme'); if (saved) dark = saved === 'dark'; } catch (e) {}
  if (dark) document.documentElement.classList.add('dark');
})();
