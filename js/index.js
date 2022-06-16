/* Globale Variabeln */
let winHtml = "",
  loseHtml = "",
  chatHtml = "",
  endHTML = "",
  winCounter = 0,
  loseCounter = 0,
  chatMsg = "",
  endMsg = "";

/* init function */
window.onload = () => {
  winHtml = document.getElementById("winCount");
  loseHtml = document.getElementById("loseCount");
  chatHtml = document.getElementById("chat");
  endHTML = document.getElementById("end");
};

/* functionen */
function play(playerChoice) {
  let computerChoice = Math.round(Math.random() * 2 + 1);
  chatMsg = " Dein Gegner hatte "
  switch (computerChoice) {
    case 1:
      chatMsg += "Schere.";
      break;
    case 2:
      chatMsg += "Stein.";
      break;
    case 3:
      chatMsg += "Papier.";
      break;
    default:
      reset();  // reset game
      alert('Das Spiel wurde gestoppt. Grund ist ein unbekannter Error'); // user error
      console.error(
        "%cUnbekannte Auswahl des Computers:",
        'padding: 0.3em 0.3em; font-size: 1.2em; color: blue; font-weight: bold;',
        computerChoice
      ); // dev error
      break;
  }

  if (playerChoice === computerChoice) {
    chatMsg = "Unentschieden!";
  } else if (
    (playerChoice === 1 && computerChoice === 3) ||
    (playerChoice === 2 && computerChoice === 1) ||
    (playerChoice === 3 && computerChoice === 2)
  ) {  // gewonnen
    chatMsg = "Gewonnen!" + chatMsg;
    winCounter++;
  } else if (
    (playerChoice === 1 && computerChoice === 2) ||
    (playerChoice === 2 && computerChoice === 3) ||
    (playerChoice === 3 && computerChoice === 1)
  ) {  // verloren
    chatMsg = "Verloren!" + chatMsg;
    loseCounter++;
  }

  winHtml.innerText = winCounter;
  loseHtml.innerText = loseCounter;
  chatHtml.innerText = chatMsg;

  if (winCounter >= 3) {
    document.getElementById("modal").classList.toggle("hidden");
    endMsg = "Sie haben Gewonnen!";
    endHTML.innerText = endMsg;
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");
      reset();
    }, 3000);
  } else if (loseCounter >= 3) {
    document.getElementById("modal").classList.toggle("hidden");
    endMsg = "Sie haben Verloren!";
    endHTML.innerText = endMsg;
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");
      reset();
    }, 3000);
  }
}

function reset() {
  winCounter = 0;
  loseCounter = 0;
  msg = "Geben Sie Ihren Zug an";
  endMsg = "";
  winHtml.innerText = winCounter;
  loseHtml.innerText = loseCounter;
  chatHtml.innerText = msg;
  endHTML.innerText = endMsg;
}