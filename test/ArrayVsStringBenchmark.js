const { performance } = require('perf_hooks');
const { findBestMoveString } = require('../src/evalFuncString.js');
const { findBestMoveStringToArray } = require('../src/evalFunc.js');


let t1 = performance.now()
console.log("Calling method with computation on the string: "+findBestMoveString("m00000h00000mm0000hmh000h00000h00000000000", "m"))
let t2 = performance.now()
console.log(`Call to string findBestMove took ${t2 - t1} milliseconds.`)

t1 = performance.now()
console.log("Calling method with translation into an 2D array: "+findBestMoveStringToArray("m00000h00000mm0000hmh000h00000h00000000000", "m"))
t2 = performance.now()
console.log(`Call to stringToArray findBestMove took ${t2 - t1} milliseconds.`)