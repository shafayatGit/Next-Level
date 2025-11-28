const fs = require("fs");

fs.writeFileSync("../data/temp.txt", "New file");
if (fs.existsSync("../data/temp.txt")) {
  //file ache kina check korte parbo existSync diye
  console.log("File exists");

  fs.unlinkSync("../data/temp.txt"); //delete er jonno unlinkSync use korbo
  console.log("File Deleted");
}

try {
  fs.unlinkSync("../data/temp.txt");
} catch (err) {
  console.log(err.message); //error dibe karon file exist e korena
}

//!Doint it in Asynchronous way
fs.writeFile("../data/temp.txt", "New file created", (error) => {
  if (error) {
    console.log(error);
  }
  console.log("File Created");

  fs.unlink("../data/temp.txt", (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("File deleted successfully");
  });
});
