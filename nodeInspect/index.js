const path = require("path");
const fs = require("fs");

console.log(
  fs.existsSync(
    path.resolve(__dirname, "../images/258d06cebea576a5fb5913756ee8e622.jpg")
  )
);
const fileInfo = fs.Stats(
  path.resolve(__dirname, "../images/258d06cebea576a5fb5913756ee8e622.jpg")
);

console.log(fileInfo);
