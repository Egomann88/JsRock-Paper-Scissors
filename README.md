# M293_JsWebsite


## Schere, Stein, Papier
»Schere, Stein, Papier« ist ein altes Spiel, bei dem sich zwei Personen jeweils ein Symbol aussuchen und es dann gleichzeitig anzeigen (oder nennen). Haben beide Spieler das gleiche Symbol, ist die Runde unentschieden. Ansonsten gelten folgende Regeln:
- Schere schneidet Papier – und gewinnt damit die Runde.
- Papier wickelt Stein ein – und gewinnt damit die Runde.
- Stein wiederum schleift die Schere und gewinnt.
Damit haben wir die Spielregeln für »Schere, Stein, Papier« niedergeschrieben. Jetzt müssen wir uns überlegen, wie unser Programm um dieses Spiel herum aussehen soll. Dabei müssen wir festlegen, wie viele Runden wir spielen wollen und welche Kriterien für einen Sieg (über mehrere gespielte Runden) gelten sollen.

Wir bestimmen einfach, dass die Anzahl der Runden unbegrenzt sein soll. Gewinnt ein Spieler aber dreimal (insgesamt, also nicht unbedingt in Folge), dann ist das Spiel zu Ende und der Sieger steht fest.

## Und wie programmiert man das jetzt?
Überleg dir mit deinen eigenen Worten, was das Programm machen soll.

## Beispiel:
Der Computer denkt sich zu Beginn jeder Runde aus, was er macht. Dann gibst du ein, was du wählst. Es wird dann verglichen, wer die Runde gewonnen hat. Haben beide das gleiche Symbol, ist die Runde unentschieden. Schere gewinnt gegen Papier, Papier gewinnt gegen Stein, und Stein gewinnt gegen die Schere. Hat einer dreimal gewonnen, wird das Spiel beendet. Dann wird ausgegeben, wer wie oft gewonnen hat.

# Auftrag:
Programmiere das Spiel. **Das Spiel darf auf der Konsole laufen.**
Für Ausgaben können Sie `alert()` für Eingaben `prompt()` verwenden.
Beachten Sie: Nach jeder Runde wird entschieden, ob ein Sieger feststeht. (fussgesteuerte Schleife).
Sie können Ihr Programm in der nächsten Lektion vorstellen.
