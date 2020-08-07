# Hooker
Repository for the final assignment in "Prototyping interactive media-applications and games" at Furtwangen University

- [|| Play Hooker ||](https://danielwagnerhfu.github.io/PRIMA_final_assignment/V1/Main.html)
- [|| QuellCode ||](https://github.com/DanielWagnerHFU/PRIMA_final_assignment/tree/master/V1/Typescript)
- [|| Design Document ||](https://github.com/DanielWagnerHFU/PRIMA_final_assignment/tree/master/Docs/Concept_Documentation)
- [|| Archiv ||](https://github.com/DanielWagnerHFU/PRIMA_final_assignment/raw/master/Hooker.zip)


## Checkliste für Leistungsnachweis

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Hooker
|    | Name                  | Daniel Wagner
|    | Matrikelnummer        | 259256
|  1 | Nutzerinteraktion     | Es steht nur die die Interaktion durch Rechts bzw. Linksclick zur verfügung. Damit wird ein Haken ausgeworfen |
|  2 | Objektinteraktion     | Jeder Ball kann mit den starren Körpern kollidieren und stößt daran ab. Sowohl im Fall Ball stößt auf Gerade, sowie auch im Fall Ball stößt auf Ecke. Außerdem wird die Kollision zwischen dem Ziel und dem Player ermittelt und führt zum Ende des Spiels. Eine unterschreitung des Limits führt zum Ende durch Tod                                                                                                                                                                                 |
|  3 | Objektanzahl variabel | Die Zahl der Objekte ist abhängig von der gamematrix.json in welcher das Level konfiguriert werden kann                                                                                                                                                     |
|  4 | Szenenhierarchie      | Hier ist es recht simpel. Abgesehen vom Haken befinden sich alle Elemente auf der selben Ebene. Der Haken ist Kind des HookerBall                                                                                                                                                      |
|  5 | Sound                 | Hintergrundmusik ist vorhanden, genauso wie ein Sound bei Kollision                                                       |
|  6 | GUI                   | -                                                                           |
|  7 | Externe Daten         | Das Spiel kann in der Datei gamematrix.json frei konfiguriert werden. Dabei ist das Level als zweidimensionales Zahlenarray zu verstehen. Eine 0 steht für Luft, eine 1 für ein festes Objekt, eine 2 für den Spieler (darf nur einmal vorkommen) und eine 3 für das Ziel.                                                                                |
|  8 | Verhaltensklassen     | -                                                                                        |
|  9 | Subklassen            | Siehe Classdiagramm 
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Jeder Cube hat die größe 1 und jeder Ball die größe 0.8; Somit passt ein Ball immer durch eine Lücke                                                          |
| 11 | Event-System          | -                                                                                                                                                                                |