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
  createLocalStorage(); // erstellt LS Variabeln (wenn nicht vorhanden)
  changeBackground(); // wählt den Standarthintergrund aus
  backgroundActivaded();  // prüft, ob die versteckten hintergründe aktiviert werden dürfen
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
    if (localStorage.getItem("WonGame", "0") == false) {  // wird max. 1. Mal angezeigt
      localStorage.setItem("WonGame", "1"); // Gewinner Counter im LS ändern
      backgroundActivaded();  // Hintergrund aktivieren
      newBackground();  // neuer Hintergrund Meldung geben
    }
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");  // modal schliessen
      document.getElementById("winGif").classList.toggle("hidden"); // Gewinner Gif entfernen
      reset();  // spiel zurücksetzen
    }, 3000);
  } else if (loseCounter >= 3) {  // spiel Verloren?
    document.getElementById("modal").classList.toggle("hidden");  // modal öffnen
    document.getElementById("loseGif").classList.toggle("hidden"); // verlierer Gif einbleben
    endHTML.innerText = endMsg + "Verloren!"; // verloren nachricht ausgeben
    if (localStorage.getItem("LostGame", "0") == false) { // wird max. 1. Mal angezeigt
      localStorage.setItem("LostGame", "1"); // Gewinner Counter im LS ändern
      backgroundActivaded();  // Hintergrund aktivieren
      newBackground();  // neuer Hintergrund Meldung geben
    }
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");  // modal schliessen
      document.getElementById("loseGif").classList.toggle("hidden"); // verlierer Gif entfernen
      reset();  // spiel zurücksetzen
    }, 3000);
  }
}

/**
 * Setzt alle Variabeln und Anzeigen wieder auf den Standardwert
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

/**
 * Überprüft, ob bereits gewonnen / verloren wurde, wenn ja werden die Hintergründe freigeschaltet
 */
async function backgroundActivaded() {
  if (localStorage.getItem("WonGame", "1") == true)
    document.getElementById("winOpt").classList.remove("hidden");
  else
    document.getElementById("winOpt").classList.add("hidden");

  if (localStorage.getItem("LostGame", "1") == true)
    document.getElementById("loseOpt").classList.remove("hidden");
  else
    document.getElementById("loseOpt").classList.add("hidden");
}

/**
 * Überpruft, ob Einträge bereits im LS sind, wenn nicht, werden sie erstellt
 */
async function createLocalStorage() {
  if (!localStorage.getItem("WonGame", "0"))  // wenn LS item nicht existiert, dann erstell eins
    localStorage.setItem("WonGame", "0");
  if (!localStorage.getItem("LostGame", "0"))  // wenn LS item nicht existiert, dann erstell eins
    localStorage.setItem("LostGame", "0");
}

/**
 * ändert den Hintergrund der Seite
 * @param {number} bgId Id des Bg's auf den gewechselt werden soll (Standard: 1)
 */
async function changeBackground(bgId = 1) {
  for (let i = 1; i <= 7; i++) {  // alle bg-classes entfernen
    document.getElementById("placeBg").classList.remove("b" + i);
  }
  document.getElementById("placeBg").classList.add("b" + bgId); // neuen bg hinzufügen
}

/**
 * Gibt die Meldung einen neuen Hintergrund freigeschaltet zu haben
 */
async function newBackground() {
  alert('Sie haben einen neuen Hintergrund freigeschaltet. (*^_^*)');
}