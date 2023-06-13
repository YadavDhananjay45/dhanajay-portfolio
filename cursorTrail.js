const canvas = document.getElementById("trail");
const ctx = canvas.getContext("2d");

let AnimationFeature = {
  friction: 0.5,
  trails: 20,
  size: 40,
  dampening: 0.2,
  tension: 0.98,
};

let cursorPosition = {
  x: 0,
  y: 0,
};

let running = true;

class NewNode {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }
}
class Line {
  constructor(e) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = AnimationFeature.friction + 0.01 * Math.random() - 0.005;
    const cursorPosition = e.cursorPosition ?? { x: 0, y: 0 };
    this.nodes = [];
    for (let i = 0; i < AnimationFeature.size; i++) {
      const t = new NewNode();
      t.x = cursorPosition.x;
      t.y = cursorPosition.y;
      this.nodes.push(t);
    }
  }

  update() {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (cursorPosition.x - t.x) * e;
    t.vy += (cursorPosition.y - t.y) * e;
    for (let i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * AnimationFeature.dampening;
        t.vy += n.vy * AnimationFeature.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= AnimationFeature.tension;
    }
  }

  draw() {
    let e, t;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[this.nodes.length - 2];
    t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function getColor() {
  const cssRoot = document.querySelector(":root");
  const c = getComputedStyle(cssRoot).getPropertyValue("--cursor-trail-color");
  return c;
}

function renderAnimation() {
  if (running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = getColor();
    ctx.lineWidth = 1;
    for (let x, t = 0; t < AnimationFeature.trails; t++) {
      (x = newLines[t]).update();
      x.draw();
    }
    window.requestAnimationFrame(renderAnimation);
  }
}

let newLines = [];

function onMouseMove(e) {
  function populateLines() {
    newLines = [];
    for (let i = 0; i < AnimationFeature.trails; i++) {
      newLines.push(
        new Line({ spring: 0.45 + (i / AnimationFeature.trails) * 0.025 })
      );
    }
  }

  function move(event) {
    !(event instanceof MouseEvent)
      ? ((cursorPosition.x = event.touches[0].pageX),
        (cursorPosition.y = event.touches[0].pageY))
      : ((cursorPosition.x = event.clientX),
        (cursorPosition.y = event.clientY));
    event.preventDefault();
  }

  function createLine(event) {
    event.touches.length === 1 &&
      ((cursorPosition.x = event.touches[0].pageX),
      (cursorPosition.y = event.touches[0].pageY));
  }

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("touchstart", onMouseMove);
  document.addEventListener("mousemove", move);
  document.addEventListener("touchmove", createLine);
  document.addEventListener("touchstart", createLine);
  move(e);
  populateLines();
  renderAnimation();
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function renderTrailCursor() {
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchstart", onMouseMove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    if (!running) {
      running = true;
      renderAnimation();
    }
  });
  window.addEventListener("blur", () => {
    running = false;
  });
  resizeCanvas();
}

renderTrailCursor();
