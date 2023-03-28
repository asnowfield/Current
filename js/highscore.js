const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

function clear_btn() {
  localStorage.clear();
  window.location.assign('../html/highscore.html');
  alert("CLLLEARR!!!!")
}