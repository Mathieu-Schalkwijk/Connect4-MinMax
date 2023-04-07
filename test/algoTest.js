const { findBestMoveStringToArray } = require('../src/evalFuncArray.js');
const evalFunctionString = require('../src/evalFuncString.js');

function testFindBestMoveStringToArray() {
    const testCases = [
        {
            input: {
                board: '' +
                    'm00000' +
                    'h00000' +
                    'mm0000' +
                    'hmh000' +
                    'hhh000' + // 4
                    'h00000' +
                    '000000',
                player: 'h'
            },
            expected: 4
        },
        {
            input: {
                board:  '' +
                    'm00000' +
                    'h00000' +
                    'mmm000' + // 2
                    'hmh000' +
                    'h00000' +
                    'h00000',
                player: 'm'
            },
            expected: 2
        },
        {
            input: {
                board: '' +
                    'm00000' +
                    'hm0000' +
                    'hmh000' +
                    'h00000' +
                    '000000' + // 5
                    'hm0000',
                player: 'h'
            },
            expected: 5
        }
    ]

    testCases.forEach((testCase, index) => {
        console.log('testCase: ' + evalFunctionString.boardEval(testCase.input.board, testCase.input.player))
        const result = findBestMoveStringToArray(testCase.input.board, testCase.input.player);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

        console.log('result: ', result);

        console.log(`Test case ${index + 1}: ${passed ? 'Passed' : 'Failed'}`);
    });
}

testFindBestMoveStringToArray();