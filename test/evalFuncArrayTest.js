const { stringTo2DArray } = require('../src/evalFuncArray.js');

function testStringTo2DArray() {
    const testCases = [
        {
            input:
                'm00000' +
                'h00000' +
                'mm0000' +
                'hmh000' +
                'h00000' +
                'h00000' +
                '000000',
            expected: [
                ['m', '0', '0', '0', '0', '0'],
                ['h', '0', '0', '0', '0', '0'],
                ['m', 'm', '0', '0', '0', '0'],
                ['h', 'm', 'h', '0', '0', '0'],
                ['h', '0', '0', '0', '0', '0'],
                ['h', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0']
            ]
        },
        {
            input: '0000000000000000000000000000000000000000000',
            expected: [
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0'],
                ['0', '0', '0', '0', '0', '0']
            ]
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = stringTo2DArray(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

        console.log(`Test case ${index + 1}: ${passed ? 'Passed' : 'Failed'}`);
    });
}

testStringTo2DArray();