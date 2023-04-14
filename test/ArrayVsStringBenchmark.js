const { performance } = require('perf_hooks');
const { findBestMoveString } = require('../src/evalFuncString.js');
const { findBestMoveStringToArray } = require('../src/evalFuncArray.js');

const nbOfTests = 10000;

let t1 = performance.now()
console.log(`Calling ${nbOfTests} times the method with computation on the string: `+findBestMoveString("m00000h00000mm0000hmh000h00000h00000000000", "m"))
for (let i = 0; i < nbOfTests; i++) {
    findBestMoveString("m00000h00000mm0000hmh000h00000h00000000000", "m")
}
let t2 = performance.now()
console.log(`Call to ${nbOfTests} findBestMoveString took ${t2 - t1} milliseconds.`)

t1 = performance.now()
console.log(`Calling ${nbOfTests} times th method with translation into an 2D array: `)
for (let i = 0; i < nbOfTests; i++) {
    findBestMoveStringToArray("m00000h00000mm0000hmh000h00000h00000000000", "m")
}
t2 = performance.now()
console.log(`Call to ${nbOfTests} findBestMoveStringToArray took ${t2 - t1} milliseconds.`)