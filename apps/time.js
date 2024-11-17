registerCommand("time [format]", "shows local time", (args) => {
  if (!args[0]) args[0] = "en";
  print(`Time: ${new Date().toLocaleTimeString(args[0])}`);
});

registerCommand("date [format]", "shows current date", (args) => {
  if (!args[0]) args[0] = "en";
  print(`Current date: ${new Date().toLocaleDateString(args[0])}`);
});
