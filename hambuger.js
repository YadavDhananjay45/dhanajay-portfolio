const bars = document.getElementById("menu-btn");
const navMenu = document.getElementById("mobile-menu");
bars.addEventListener("click", () => {
  for (const bar of bars.children) {
    bar.classList.toggle("active");
  }
  navMenu.classList.toggle("active");
});
