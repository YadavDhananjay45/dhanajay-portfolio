const professionText = document.getElementById("prof-text");

const loader = document.getElementById("greets");

const randomText = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

const words = ["DEVELOPER", "PROGRAMMER", "READER", "STUDENT"];

const loaderWords = ["HELLO", "HALO", "नमस्ते", "GUTEN TAG", "BONJOUR"];

function createMatrixTextAnimation(elm, textArray, randomText, animationProp) {
  let maxLength = 0;
  let paddedTextArray = [];
  let interval = 0;
  let wordIndex = 0;
  let animationReplayTime = 0;
  let waitingTime = animationProp.waitingTime;
  let letterChangeDuration = animationProp.letterChangeDuration;

  elm.innerText = textArray[0];

  for (let w of textArray) {
    if (w.length > maxLength) {
      maxLength = w.length;
    }
  }

  for (let w of textArray) {
    let diff = maxLength - w.length;
    paddedTextArray.push(" ".repeat(diff) + w);
  }

  const animate = () => {
    let iteration = 0;

    clearInterval(interval);

    if (wordIndex === paddedTextArray.length - 1) {
      wordIndex = 0;
    } else {
      wordIndex += 1;
    }

    interval = setInterval(() => {
      elm.innerText = paddedTextArray[
        wordIndex === paddedTextArray.length - 1 ? 0 : wordIndex + 1
      ]
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return paddedTextArray[wordIndex][index];
          }
          return randomText[Math.floor(Math.random() * randomText.length)];
        })
        .join("");
      if (iteration > maxLength) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, letterChangeDuration);
  };

  animationReplayTime = 3 * letterChangeDuration * maxLength + waitingTime;

  if (animationProp.animateOn === "normal") {
    setTimeout(() => {
      setInterval(() => {
        animate();
      }, animationReplayTime);
    }, animationProp.animationDelay);
  }

  if (animationProp.animateOn !== "normal") {
    elm.addEventListener(animationProp.animateOn, animate);
  }
}

const props = {
  letterChangeDuration: 50,
  waitingTime: 1000,
  animationDelay: 1000,
  animateOn: "normal",
};

const nprops = {
  letterChangeDuration: 50,
  waitingTime: 1000,
  animationDelay: 1000,
  animateOn: "normal",
};

createMatrixTextAnimation(professionText, words, randomText, props);
createMatrixTextAnimation(loader, loaderWords, randomText, nprops);
