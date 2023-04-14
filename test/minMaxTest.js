const {stringTo2DArray} = require("../src/evalFuncArray");
const {bestMove} = require("../src/minMax");

const board = stringTo2DArray("m00000h00000mm0000hmh000h00000h00000000000");
//const board = stringTo2DArray("000000000000000000000000000000000000000000");

const depth = 5;

let d1 = Date.now();
console.log("best move column: "+bestMove(board, 'm', depth))
let d2 = Date.now();

console.log(`Call to bestMove with depth ${depth} took ${d2 - d1} milliseconds.`)