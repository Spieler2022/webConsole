registerCommand(
  "weather [city]",
  "shows current weather for a city",
  async (args) => {
    const city = args[0] ? args[0] : "";
    const url = `https://wttr.in/${city}`; // format=%C+%t gibt den Wetterstatus und die Temperatur zurück

    const response = await fetch(url);
    const data = await response.text();

    print(data);
  }
);
