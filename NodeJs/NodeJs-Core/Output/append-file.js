const fs = require("fs");

//First e ekta notun file niye nibo jaate amdr file er likha haray na jay
fs.writeFileSync("../data/newLog.txt", "Something just\n");

const log1 = `${new Date()} new user loggedIn.\n`;
fs.appendFileSync("../data/newLog.txt", log1);

const log2 = `${new Date()} user synced.`;
fs.appendFileSync("../data/newLog.txt", log2);
