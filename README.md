
# Web Console Project

An interactive web console supporting commands, autocomplete, and theme switching.

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Available Commands](#available-commands)  
6. [Themes](#themes)  
7. [Adding New Apps](#adding-new-apps)  
8. [License](#license)  

---

## Overview

This project provides a web-based console that can interpret and execute commands. It supports autocomplete, theming, and is extendable via plugins.

---

## Features

- Support for multiple themes.  
- Autocomplete and command suggestions.  
- Extendable with custom plugins.  
- Example plugins include **date/time**, **web search**, and **weather display**.  

---

## Installation

### Prerequisites
A modern web browser and, if hosted locally, a web server (e.g., `http-server`).

### Steps
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Ensure required files are present:**  
   Make sure all files (`index.html`, `console.js`, `console.css`, `apps/`) are included.

3. **Start a local server:**  
   Use a static server like `http-server` or open `index.html` directly in your browser:  
   ```bash
   http-server .
   ```

4. **Optional:** Customize existing plugins or themes.

---

## Usage

1. **Enter console commands:**  
   Type commands in the input field at the bottom of the page.  

2. **Use autocomplete:**  
   Suggestions for available commands appear as you type.

3. **Check output:**  
   Results and error messages are displayed in the main console area.

---

## Available Commands

### General Commands

- `help`  
  **Description:** Displays a list of all available commands.  

- `theme [name]`  
  **Description:** Changes the console's color scheme.  

### Example Plugins

- `time [format]`  
  **Description:** Displays the current time in the specified locale (e.g., `en`, `de`, etc.).  

- `date [format]`  
  **Description:** Displays the current date in the specified locale (e.g., `en`, `de`, etc.).  

- `search [query*]`  
  **Description:** Performs a web search using DuckDuckGo.  

- `weather [city]`  
  **Description:** Displays the current weather for the specified city.  

---

## Themes

The console supports the following themes:

- **dark**  
- **neutral**  
- **twilight**  
- **serene**  
- **earth**  
- **calm**  
- **forest**

### Switching Themes

Use the following command to change the theme:  
```bash
theme [name]
```  
Example:  
```bash
theme dark
```

---

## Adding New Apps

The `apps` structure allows for easily adding new commands.

### Steps

#### 1. **Create a new file**
Navigate to the `apps` folder and create a new `.js` file, e.g., `example.js`.

#### 2. **Register the command**
Add the command to the new file:
```javascript
registerCommand("example [argument]", "Description of the command", (args) => {
  print(`Argument passed: ${args[0]}`);
});
```
- **`"example [argument]"`:** Name and syntax of the command.  
- **`"Description of the command"`:** Description displayed in the `help` list.  
- **`(args) => {}`:** Logic for the command; `args` contains user-provided arguments.

#### 3. **Include the file in `apps.json`**
Open `apps/apps.json` and add the new file:
```json
["default.js", "time.js", "weather.js", "search.js", "example.js"]
```

#### 4. **Test**
Reload the page. The new command will be automatically recognized.

#### Example App
A command to calculate the square root:
```javascript
registerCommand("sqrt [number]", "Calculates the square root of a number", (args) => {
  const number = parseFloat(args[0]);
  if (isNaN(number)) {
    print("Please enter a valid number!");
    return;
  }
  print(`The square root of ${number} is ${Math.sqrt(number)}`);
});
```
This command will be available immediately after adding it to `apps.json`.

---

## License

MIT License  

```plaintext
MIT License

Copyright (c) [Year] [Your Name]

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
