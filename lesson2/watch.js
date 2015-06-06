var fs = require('fs');
fs.watchFile("./thefile", function() {
  console.log("You changed me!");
  process.exit(0);
});

