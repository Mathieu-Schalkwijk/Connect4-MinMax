const { performance } = require('perf_hooks');
const { findBestMoveString } = require('../src/evalFuncString.js');
const { findBestMoveStringToArray } = require('../src/evalFuncArray.js');


let t1 = performance.now()
console.log("Calling 1000 times the method with computation on the string: "+findBestMoveString("m00000h00000mm0000hmh000h00000h00000000000", "m"))
for (let i = 0; i < 1000; i++) {
    findBestMoveString("m00000h00000mm0000hmh000h00000h00000000000", "m")
}
let t2 = performance.now()
console.log(`Call to 1000 findBestMoveString took ${t2 - t1} milliseconds.`)

t1 = performance.now()
console.log("Calling 1000 times th method with translation into an 2D array: ")
for (let i = 0; i < 1000; i++) {
    findBestMoveStringToArray("m00000h00000mm0000hmh000h00000h00000000000", "m")
}
t2 = performance.now()
console.log(`Call to 1000 findBestMoveStringToArray took ${t2 - t1} milliseconds.`)