/* Globale Variabeln */
let winHtml = "",
  loseHtml = "",
  chatHtml = "",
  endHTML = "",
  winCounter = 0,
  loseCounter = 0,
  chatMsg = "",
  endMsg = "Sie haben ";

/* init function */
window.onload = () => {
  winHtml = document.getElementById("winCount");
  loseHtml = document.getElementById("loseCount");
  chatHtml = document.getElementById("chat");
  endHTML = document.getElementById("end");
};

/* functionen */

/**
 * Generiert eine zufällige Antwort für den Computer.<br />
 * Vergleicht die Auswahlen und aktualisiert den Counter.<br />
 * Und gibt aus, ob gewonnen oder verloren.<br />
 * @param {number} playerChoice Spieler's auswahl | 0 = Schere; 1 = Stein; 2 = Papier
 */
function play(playerChoice) {
  // computers wahl
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

  // Auswahlen vergleichen
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

  // Anzeigen aktualisieren
  winHtml.innerText = winCounter; // Counter aktualisieren
  loseHtml.innerText = loseCounter; // Counter aktualisieren
  chatHtml.innerText = chatMsg; // Gewonnen, Verloren oder Untenschieden ausgeben

  // überprüfen, ob Spiel vorbei ist
  if (winCounter >= 3) {  // Spiel gewonnen?
    document.getElementById("modal").classList.toggle("hidden");  // modal öffnen
    document.getElementById("winGif").classList.toggle("hidden"); // Gewinner Gif einbleben
    endHTML.innerText = endMsg + "Gewonnen!"; // Gewonnen nachricht ausgeben
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");  // modal schliessen
      document.getElementById("winGif").classList.toggle("hidden"); // Gewinner Gif entfernen
      reset();  // spiel zurücksetzen
    }, 3000);
  } else if (loseCounter >= 3) {  // spiel Verloren?
    document.getElementById("modal").classList.toggle("hidden");  // modal öffnen
    document.getElementById("loseGif").classList.toggle("hidden"); // verlierer Gif einbleben
    endHTML.innerText = endMsg + "Verloren!"; // verloren nachricht ausgeben
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");  // modal schliessen
      document.getElementById("loseGif").classList.toggle("hidden"); // verlierer Gif entfernen
      reset();  // spiel zurücksetzen
    }, 3000);
  }
}

/**
 * Setz alle Variabeln und Anzeigen wieder auf den Standardwert
 */
function reset() {
  winCounter = 0;
  loseCounter = 0;
  msg = "Geben Sie Ihren Zug an";
  endMsg = "Sie haben ";
  winHtml.innerText = winCounter;
  loseHtml.innerText = loseCounter;
  chatHtml.innerText = msg;
  endHTML.innerText = endMsg;
}