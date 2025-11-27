const variable = require("./file1"); // Using older commonjs
const { b, c } = require("./file1");
const { b: second, c: third } = require("./file1"); // name aliasing
console.log(variable);
console.log(second, third);
