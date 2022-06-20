/********************************************************/
// @autor Justin Urbanek
/********************************************************/

/* Globale Variabeln */
let winHtml = "",
  loseHtml = "",
  chatHtml = "",
  endHTML = "",
  winCounter = 0,
  loseCounter = 0,
  chatMsg = "",
  endMsg = "Sie haben ",
  toggleAchivements = false;

/* init function */
window.onload = () => {
  winHtml = document.getElementById("winCount");
  loseHtml = document.getElementById("loseCount");
  chatHtml = document.getElementById("chat");
  endHTML = document.getElementById("end");
  createLocalStorage(); // erstellt LS Variabeln (wenn nicht vorhanden)
  changeBackground(); // wählt den Standarthintergrund aus
  backgroundActivaded();  // prüft, ob die versteckten hintergründe aktiviert werden dürfen
  achivementActivaded();  // prüft, welche Sterne aktiviert wurden
};

/* Achivement-Variabeln */
let winCounterTotal = localStorage.getItem("WinCounterTotal"),
  loseCountTotal = localStorage.getItem("LoseCounterTotal"),
  WinsInRow = localStorage.getItem("WinsInRow"),
  LosesInRow = localStorage.getItem("LosesInRow");

/* functionen */

/**
 * Generiert eine zufällige Antwort für den Computer.<br />
 * Vergleicht die Auswahlen und aktualisiert den Counter.<br />
 * Und gibt aus, ob gewonnen oder verloren.<br />
 * @param {number} playerChoice Spieler's auswahl | 0 = Schere; 1 = Stein; 2 = Papier
 * @func backgroundActivaded potentielle hintergründe für Nutzer freischalten
 * @func newBackground Meldung für neuen Hintergrund
 * @func changeStats Achivement-Variablen verändern
 * @func achivementChecker prüft, ob neuer Erfolg freigestaltet wurde
 * @func reset spiel wieder zurücksetzen
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
    changeStats(true);  // permanente Counter umstellen
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
    changeStats(false);  // permanente Counter umstellen
    setTimeout(() => {
      document.getElementById("modal").classList.toggle("hidden");  // modal schliessen
      document.getElementById("loseGif").classList.toggle("hidden"); // verlierer Gif entfernen
      reset();  // spiel zurücksetzen
    }, 3000);
  }

  achivementChecker();  // prüft, ob neuer Erfolg freigestaltet wurde
}

/**
 * passt die Achivement variablen an
 * @param {boolean} mode gewonnen oder verloren (gewonnen = true | verloren = false) 
 */
function changeStats(mode) {
  if (mode) { // true
    localStorage.setItem("winCounterTotal", ++winCounterTotal);
    localStorage.setItem("WinsInRow", ++WinsInRow);
    localStorage.setItem("LosesInRow", LosesInRow = 0);
  } else {  // false
    localStorage.setItem("loseCountTotal", ++loseCountTotal);
    localStorage.setItem("LosesInRow", ++LosesInRow);
    localStorage.setItem("WinsInRow", WinsInRow = 0);
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
 * Geht jedes einzelde Achivent durch und prüft, ob die voraussetzungen erfüllt worden<br></br>
 * @func newAchivement Wenn ja, wird die meldung gegben
 * @func achivementActivaded am Ende wird immer geprüft, ob sterne vergoldet werden müssen
 */
function achivementChecker() {
  if (winCounterTotal >= 5 && localStorage.getItem("Achivement1" == "0")) {
    localStorage.setItem("Achivement1", "1");
    newAchivement();
  } else if (loseCountTotal >= 5 && localStorage.getItem("Achivement2") == "0") {
    localStorage.setItem("Achivement2", "1");
    newAchivement();
  } else if (WinsInRow >= 3 && localStorage.getItem("Achivement3") == "0") {
    localStorage.setItem("Achivement3", "1");
    newAchivement();
  } else if (LosesInRow >= 3 && localStorage.getItem("Achivement4") == "0") {
    localStorage.setItem("Achivement4", "1");
    newAchivement();
  } else if (WinsInRow >= 10 && localStorage.getItem("Achivement5") == "0") {
    localStorage.setItem("Achivement5", "1");
    newAchivement();
  } else if (LosesInRow >= 10 && localStorage.getItem("Achivement6") == "0") {
    localStorage.setItem("Achivement6", "1");
    newAchivement();
  } else if (winCounterTotal >= 100 && localStorage.getItem("Achivement7" == "0")) {
    localStorage.setItem("Achivement7", "1");
    newAchivement();
  } else if (loseCountTotal >= 100 && localStorage.getItem("Achivement8" == "0")) {
    localStorage.setItem("Achivement8", "1");
    newAchivement();
  }

  if (  // Psychopath-Achivment
    localStorage.getItem("Achivement1") == "1" &&
    localStorage.getItem("Achivement2") == "1" &&
    localStorage.getItem("Achivement3") == "1" &&
    localStorage.getItem("Achivement4") == "1" &&
    localStorage.getItem("Achivement5") == "1" &&
    localStorage.getItem("Achivement6") == "1" &&
    localStorage.getItem("Achivement7") == "1" &&
    localStorage.getItem("Achivement8") == "1" &&
    localStorage.getItem("Achivement9") == "1" &&
    localStorage.getItem("Achivement10") == "1"
  ) {
    localStorage.setItem("Achivement11", "1");
    newAchivement();
  }

  achivementActivaded();  // sterne aktivieren
}

/**
 * Überprüft, ob bereits gewonnen / verloren wurde, wenn ja werden die Hintergründe freigeschaltet
 */
async function backgroundActivaded() {
  if (localStorage.getItem("WonGame") == "1")
    document.getElementById("winOpt").classList.remove("hidden");
  else
    document.getElementById("winOpt").classList.add("hidden");

  if (localStorage.getItem("LostGame") == "1")
    document.getElementById("loseOpt").classList.remove("hidden");
  else
    document.getElementById("loseOpt").classList.add("hidden");

  for (let i = 1; i <= 11; i++) { // Hintergrünge jedes Achivements
    if (localStorage.getItem("Achivement" + i) == "1")
      document.getElementById("Bg_Achivement" + i).classList.remove("hidden");
    else
      document.getElementById("Bg_Achivement" + i).classList.add("hidden");
  }
}

/**
 * Prüft beim Laden der Seite, welche Achivments freigestaltet wurden und ändert den Stern entsprechet 
 */
async function achivementActivaded() {
  for (let i = 1; i <= 11; i++) { // Hintergrünge jedes Achivements
    if (localStorage.getItem("Achivement" + i) == "1")
      document.getElementById("Achivement" + i).classList.add("starAchived"); // aktivierte classe hinzufügen
    // sonst nichts tun
  }
}

/**
 * Golden Wish Achivement
 */
async function goldenWish() {
  if (localStorage.getItem("Achivement10") == "0") {
    localStorage.setItem("Achivement10", "1");
    location.reload(true);
    newAchivement();
    newBackground();
  }
}

/**
 * Überpruft, ob Einträge bereits im LS sind, wenn nicht, werden sie erstellt
 */
async function createLocalStorage() {
  if (!localStorage.getItem("WonGame", "0"))  // wenn LS item nicht existiert, dann erstell eins
    localStorage.setItem("WonGame", "0");
  if (!localStorage.getItem("LostGame", "0"))  // wenn LS item nicht existiert, dann erstell eins
    localStorage.setItem("LostGame", "0");

  for (let i = 1; i <= 11; i++) { // achivement
    if (!localStorage.getItem("Achivement" + i, "0"))  // wenn LS item nicht existiert, dann erstell eins
      localStorage.setItem("Achivement" + i, "0");
  }

  if (!localStorage.getItem("WinCounterTotal"))
    localStorage.setItem("WinCounterTotal", "0");
  if (!localStorage.getItem("LoseCounterTotal"))
    localStorage.setItem("LoseCounterTotal", "0");
  if (!localStorage.getItem("WinsInRow"))
    localStorage.setItem("WinsInRow", "0");
  if (!localStorage.getItem("LosesInRow"))
    localStorage.setItem("LosesInRow", "0");
}

/**
 * ändert den Hintergrund der Seite
 * @param {number} bgId Id des Bg's auf den gewechselt werden soll (Standard: 1)
 */
async function changeBackground(bgId = 1) {
  for (let i = 1; i <= 18; i++) {  // alle bg-classes entfernen
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

/**
 * Gibt die Meldung ein Achivement bekommen zu haben
 * @func newBackground jeder Erfolg gibt einen Hintergrund
 */
async function newAchivement() {
  alert('Sie haben eine Erungenschaft erlangen. ( $ _ $ )');
  newBackground();
}

/**
 * öffnet den Achivement Contianer
 */
async function openAchivements() {
  toggleAchivements = !toggleAchivements;
  let time = 0;
  if (toggleAchivements)
    time = 0;
  else
    time = 900;

  document.getElementById("achivementContainer").classList.toggle("animation-out");
  document.getElementById("achivementContainer").classList.toggle("animation-in");
  setTimeout(() => {
    document.getElementById("achivementContainer").classList.toggle("hidden");
  }, time);
}