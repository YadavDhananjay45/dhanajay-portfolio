const bars = document.getElementById("menu-btn");
const navMenu = document.getElementById("mobile-menu");
bars.addEventListener("click", () => {
  for (const bar of bars.children) {
    bar.classList.toggle("active");
  }
  navMenu.classList.toggle("active");
});
const skillBox = document.querySelectorAll(".img-box");
const textVis = document.querySelectorAll(".text-box");
for (skill of skillBox) {
  skill.addEventListener("mouseover", () => {
    for (text of textVis) {
      text.classList.toggle("active");
    }
  });
}
for (skill of skillBox) {
  skill.addEventListener("mouseout", () => {
    for (text of textVis) {
      text.classList.toggle("active");
    }
  });
}
// const htmlBox = document.querySelector(".html-img");
// const textVis = document.querySelector(".img-text1");
// htmlBox.addEventListener("mouseover", () => {
//   textVis.classList.toggle("active");
// });
// htmlBox.addEventListener("mouseout", () => {
//   textVis.classList.toggle("active");
// });
