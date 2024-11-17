registerCommand(
  "search [query*]",
  "searches the web via DuckDuckGo",
  async (args) => {
    setTitle("Searching the web...");
    if (!args[0]) {
      print("Query required.");
      //return;
    }

    const query = args.join(" "); // Setzt die Suchanfrage zusammen
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      query
    )}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.AbstractText || data.AbstractSource) {
      print(`
          ${
            data.AbstractText
              ? data.AbstractText + "<br/>-> Source: "
              : "Result: "
          }
            <a href="${data.AbstractURL}" target="_blank">${
        data.AbstractSource
      }</a>`);
    } else {
      print(
        `No direct answer found. Here's the URL:<br/><a href="https://duckduckgo.com/?q=${encodeURIComponent(
          query
        )}" target="_blank">https://duckduckgo.com/?q=${encodeURIComponent(
          query
        )}</a>`
      );
    }
  }
);
