function onAlert() {
  var count = 3;
  var counter = setInterval(timer, 1000);
  function timer() {
    count = count - 1;
    if (count === 0) {
      alert("Website is still under development");
    }
  }
}
window.onload = onAlert();
