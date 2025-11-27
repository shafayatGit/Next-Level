const fs = require("fs");

console.log("Started to reading:\n");

fs.readFile("../data/diary.txt", "utf-8", (error, data) => {
  if (error) {
    console.error("Error: ", error.message);
  }
  console.log(data);
});

console.log(
  "Eta dekhlei bujhbo asynchronous way te age eta print hoise. File ashar jonno wait kore block kore deynai."
);
