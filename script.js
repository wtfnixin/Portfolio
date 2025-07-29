function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.className = "fa-solid fa-sun";
  } else {
    themeIcon.className = "fa-solid fa-moon";
  }
}
