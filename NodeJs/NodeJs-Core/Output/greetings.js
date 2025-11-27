const args = process.argv;

//process.argv[0] -> node path
//process.argv[1] -> file path
//process.argv[2] -> first argument
//process.argv[3] -> second argument

const name = args[2] || "Guest";
const time = new Date().getHours();
let greeting;

if (time < 12) {
  greeting = "Good Morning";
} else if (time < 18) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}

console.log(`${greeting}, ${name}!`);

