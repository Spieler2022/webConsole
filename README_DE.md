
# Web Console Project

Eine interaktive Web-Console, die Befehle unterstützt, Autovervollständigung bietet und Themes wechseln kann.

## Inhaltsverzeichnis

1. [Überblick](#überblick)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Verwendung](#verwendung)  
5. [Verfügbare Befehle](#verfügbare-befehle)  
6. [Themes](#themes)  
7. [Hinzufügen von neuen Apps](#hinzufügen-von-neuen-apps)  
8. [Lizenz](#lizenz)  

---

## Überblick

Dieses Projekt stellt eine webbasierte Konsole bereit, die Befehle interpretieren und ausführen kann. Sie unterstützt Autovervollständigung und Themes und ist durch Plugins erweiterbar.

---

## Features

- Unterstützung für verschiedene Themes.  
- Autovervollständigung und Vorschläge für Befehle.  
- Erweiterbar durch benutzerdefinierte Plugins.  
- Beispiel-Plugins wie **Datum/Zeit**, **Websuche** und **Wetteranzeige**.  

---

## Installation

### Voraussetzungen
Ein moderner Webbrowser und, falls lokal gehostet, ein Webserver (z. B. `http-server`).

### Schritte
1. **Repository klonen:**  
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Benötigte Dateien bereitstellen:**  
   Stelle sicher, dass alle Dateien (`index.html`, `console.js`, `console.css`, `apps/`) vorhanden sind.

3. **Lokalen Server starten:**  
   Nutze einen statischen Server wie `http-server` oder öffne die `index.html` direkt in deinem Browser:  
   ```bash
   http-server .
   ```

4. **Optional:** Passe vorhandene Plugins oder Themes an.

---

## Verwendung

1. **Konsolenbefehle eingeben:**  
   Gib Befehle im Eingabefeld am unteren Rand ein.  

2. **Autocomplete nutzen:**  
   Während der Eingabe werden Vorschläge für verfügbare Befehle angezeigt.

3. **Ausgabe prüfen:**  
   Ergebnisse und Fehlermeldungen werden im Hauptbereich der Konsole angezeigt.

---

## Verfügbare Befehle

### Allgemeine Befehle

- `help`  
  **Beschreibung:** Zeigt eine Liste aller verfügbaren Befehle an.  

- `theme [name]`  
  **Beschreibung:** Ändert das Farbschema der Konsole.  

### Beispiel-Plugins

- `time [format]`  
  **Beschreibung:** Zeigt die aktuelle Uhrzeit im angegebenen Sprachformat (`en`, `de`, usw.).  

- `date [format]`  
  **Beschreibung:** Zeigt das aktuelle Datum im angegebenen Sprachformat (`en`, `de`, usw.).  

- `search [query*]`  
  **Beschreibung:** Führt eine Websuche mit DuckDuckGo durch.  

- `weather [city]`  
  **Beschreibung:** Zeigt das aktuelle Wetter für die angegebene Stadt an.  

---

## Themes

Die Konsole unterstützt die folgenden Themes:

- **dark**  
- **neutral**  
- **twilight**  
- **serene**  
- **earth**  
- **calm**  
- **forest**

### Theme wechseln

Verwende den folgenden Befehl, um das Theme zu ändern:  
```bash
theme [name]
```  
Beispiel:  
```bash
theme dark
```

---

## Hinzufügen von neuen Apps

Die `apps`-Struktur ermöglicht es, neue Befehle einfach hinzuzufügen.

### Schritte

#### 1. **Neue Datei erstellen**
Gehe in den Ordner `apps` und erstelle eine neue `.js`-Datei, z. B. `example.js`.

#### 2. **Befehl registrieren**
Füge in der neuen Datei den Befehl hinzu:
```javascript
registerCommand("example [argument]", "Beschreibung des Befehls", (args) => {
  print(`Argument übergeben: ${args[0]}`);
});
```
- **`"example [argument]"`:** Name und Syntax des Befehls.  
- **`"Beschreibung des Befehls"`:** Beschreibung, die in der `help`-Liste angezeigt wird.  
- **`(args) => {}`:** Die Logik des Befehls; `args` enthält die vom Nutzer eingegebenen Argumente.

#### 3. **Datei in `apps.json` eintragen**
Öffne die Datei `apps/apps.json` und füge die neue Datei hinzu:
```json
["default.js", "time.js", "weather.js", "search.js", "example.js"]
```

#### 4. **Testen**
Lade die Seite neu. Der neue Befehl wird automatisch erkannt.

#### Beispiel-App
Ein Befehl, der die Quadratwurzel berechnet:
```javascript
registerCommand("sqrt [number]", "Berechnet die Quadratwurzel einer Zahl", (args) => {
  const number = parseFloat(args[0]);
  if (isNaN(number)) {
    print("Bitte eine gültige Zahl eingeben!");
    return;
  }
  print(`Die Quadratwurzel von ${number} ist ${Math.sqrt(number)}`);
});
```
Dieser Befehl wird nach Hinzufügen in `apps.json` sofort verfügbar.

---

## Lizenz

MIT License  

```plaintext
MIT License

Copyright (c) [Jahr] [Dein Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---
