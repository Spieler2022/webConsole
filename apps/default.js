registerCommand("help", "Lists all commands", () => {
  print(
    "All commands:<div style='line-height: 1.15em; padding-left: 10px;'>" +
      Object.values(commands)
        .map((cmd) => `${cmd.usage} - ${cmd.description}`)
        .join("<br/>") +
      "</div>"
  );
});

registerCommand("theme [name]", "Changes the color theme", (args) => {
  const theme = args[0]?.toLowerCase();

  // List of available themes
  const availableThemes = [
    "dark",
    "neutral",
    "twilight",
    "serene",
    "earth",
    "calm",
    "forest",
  ];

  if (!availableThemes.includes(theme)) {
    print(
      "Invalid theme! Available themes are:<br/>dark, neutral, twilight, serene, earth, calm, forest."
    );
    return;
  }

  // Change the theme by updating the data-theme attribute on the html element
  document.documentElement.setAttribute("data-theme", theme);
  print(`Theme changed to ${theme}.`);
});
