const input = document.getElementById("input");
const output = document.getElementById("output");
const title = document.getElementById("title");
const suggestionsContainer = document.getElementById("command-suggestions"); // Container für die Vorschläge
let lastError = "there was no error";
let lastCommand = "";
const commands = {};
let commandList = [];
let selectedSuggestionIndex = -1;

// load Apps
async function loadApps() {
  try {
    const response = await fetch("./apps/apps.json"); // Pfad zur JSON-Datei
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const scriptFiles = await response.json(); // JSON-Inhalt parsen

    scriptFiles.forEach((file) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = `apps/${file}`;
      document.body.appendChild(scriptElement);
    });
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
  }
}
loadApps();

function setTitle(titletext) {
  title.innerHTML = titletext;
}

function registerCommand(command, description, callbackFunction) {
  commands[command.split(" ")[0]] = {
    usage: command,
    description: description,
    exec: callbackFunction,
  };
  commandList.push(command.split(" ")[0].toLowerCase()); // Speichert den Befehl in der Liste
  console.log("Command registered:", command);
}

function print(text) {
  output.innerHTML += "<div class='output-element'>" + text + "</div>";
}

// Event-Listener für das Eingabefeld
input.addEventListener("input", (event) => {
  const inputText = input.value;

  // Zeigt Vorschläge an, die mit der Eingabe übereinstimmen
  const suggestions = autocomplete(inputText);
  showSuggestions(suggestions);
  selectedSuggestionIndex = -1;
});

output.addEventListener("click", (event) => {
  showSuggestions([]);
});

output.addEventListener("dblclick", (event) => {
  input.focus();
});

input.addEventListener("focusin", (event) => {
  showSuggestions(
    Object.values(commands)
      .map((command) => command.usage)
      .filter((command) => command.startsWith(input.value.trim().toLowerCase()))
  );
});

input.addEventListener("keydown", async (event) => {
  if (event.key == "Enter") {
    lastCommand = input.value;
    const command = input.value.split(" ")[0].toLowerCase();
    const args = input.value
      .split(" ")
      .splice(1, input.value.split(" ").length);
    input.value = "";
    if (commands[command]) {
      try {
        await commands[command].exec(args);
      } catch (err) {
        lastError = err;
        output.innerHTML +=
          "<div class='output-element output-error'>Error in executing command.<br/>Use \"/err\" to get more information.</div>";
      }
    } else {
      if (command == "/err") {
        output.innerHTML += `<div class='output-element output-gray'>${lastError}</div>`;
        return;
      }
      if (command == "/err.stack") {
        output.innerHTML += `<div class='output-element output-gray'>${lastError.stack}</div>`;
        return;
      }
      output.innerHTML +=
        "<div class='output-element output-error'>Unknown command!</div>";
    }
    return;
  }
  if (event.key == "ArrowUp" && input.value === "") {
    event.preventDefault();
    input.value = lastCommand;
    input.focus();
  }

  const suggestions = Array.from(document.querySelectorAll(".suggestion"));

  if (event.key === "Tab") {
    event.preventDefault();
    if (
      selectedSuggestionIndex >= 0 &&
      selectedSuggestionIndex < suggestions.length
    ) {
      input.value =
        suggestions[selectedSuggestionIndex].textContent.split(" ")[0];
    } else {
      input.value = Object.values(commands)
        .map((command) => command.usage)
        .filter((command) =>
          command.startsWith(input.value.trim().toLowerCase())
        )[0]
        .split(" ")[0];
    }
    suggestionsContainer.innerHTML = ""; // Vorschläge entfernen
  }

  // Pfeiltasten-Logik für Navigation durch Vorschläge
  if (event.key === "ArrowDown") {
    event.preventDefault(); // Verhindert das Scrollen der Seite
    if (selectedSuggestionIndex < suggestions.length - 1) {
      selectedSuggestionIndex++;
      updateSuggestionSelection(suggestions);
    }
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (selectedSuggestionIndex > 0) {
      selectedSuggestionIndex--;
      updateSuggestionSelection(suggestions);
    }
  }
});

// Autocomplete-Funktion: Gibt alle Befehle zurück, die mit dem Input übereinstimmen
function autocomplete(inputText) {
  if (inputText == "") {
    return [];
  }
  const suggestions = Object.values(commands)
    .map((command) => command.usage)
    .filter((command) => command.startsWith(inputText.trim().toLowerCase()));
  return suggestions;
}

// Zeigt die Autocomplete-Vorschläge im Container an
function showSuggestions(suggestions) {
  suggestionsContainer.innerHTML = ""; // Lösche vorherige Vorschläge

  if (suggestions.length > 0) {
    suggestions.forEach((suggestion) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion");
      suggestionElement.textContent = suggestion;
      suggestionsContainer.appendChild(suggestionElement);

      // Wähle den Vorschlag aus, wenn darauf geklickt wird
      suggestionElement.addEventListener("click", () => {
        input.value = suggestion.split(" ")[0];
        input.focus();
        suggestionsContainer.innerHTML = ""; // Vorschläge nach Auswahl entfernen
      });
    });
  }
}

// Funktion zum Update der Auswahl der Vorschläge
function updateSuggestionSelection(suggestions) {
  suggestions.forEach((suggestion, index) => {
    if (index === selectedSuggestionIndex) {
      suggestion.classList.add("selected"); // Markiert den ausgewählten Vorschlag
    } else {
      suggestion.classList.remove("selected"); // Entfernt die Markierung von nicht ausgewählten
    }
  });
}
