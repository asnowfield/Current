const countDownDate = new Date("Dec 11, 2022 12:00:00").getTime();
const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const money = (Math.floor((distance / (1000 * 60 * 60 * 24))-30)*3700*2);
  document.getElementById("Money").innerHTML =`${money}`;
  if (distance < 0) {clearInterval(x);document.getElementById("Money").innerHTML = "끝";
  }}, 1000);