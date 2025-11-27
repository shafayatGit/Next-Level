const fs = require("fs"); // file system k first e import korte hoy... jehetu commonjs use kortesi tai require use korte hbe

console.log("Just started...\n");

//const data = fs.readFile("../data/dairy.txt"); //readfile always asynchronous process
//always try korbo try catch er moddhe korar

try {
  const data = fs.readFileSync("../data/diary.txt", "utf-8"); //utf-8 mane (encoding) eta 128 bit porjonto read korte parbe.
  console.log(data);
} catch (err) {
  console.log(err.message);
}

console.log("\nFinished the reading...")
