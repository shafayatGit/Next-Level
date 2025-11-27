const a = 10;
const b= 20;
const c = 30;
module.exports = a; // Using older commonjs
// console.log(module):
module.exports = {b,c}; // We can send multiple things using object because module is a object in between and only execute last line.