const fs = require("fs");

const content1 =
  "This is new file writing from new file.\nUsing synchronous.\nTrying to learn.\nUpdating again.";

try {
  fs.writeFileSync("../data/write-sync.txt", content1);
  console.log("New file written successfully"); //jototbar run korbo totobar just update hobe ager file ta...
} catch (err) {
  console.error("Error", err.message);
}

//!Using Asynchronous

const content2 =
  "This is new file writing from new file.\nUsing asynchronous!!!!\nTrying to learn.\nUpdating again.";

fs.writeFile("../data/write-async.txt", content2, (error) => {
  //ekhane to ami write kortesi tai data ashbena extra kore
  if (error) {
    console.error("Error:", error.message);
  }
  console.log("data has been written.");
});
