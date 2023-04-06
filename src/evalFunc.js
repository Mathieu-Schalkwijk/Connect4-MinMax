const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function findBestMoveStringToArray(boardStr, colorChar) {
    const boardArray = stringTo2DArray(boardStr);
    return findBestMoveArray(boardArray, colorChar);
}

module.exports = {findBestMoveStringToArray}

/**
 *
 * @param board array [7][6]
 * @param color 1 or 2
 * @return {number} best move column for the player of given color
 */
function findBestMoveArray(board, color) {
    let bestMoveColumn = -1;
    let bestMoveValue = -Infinity;

    for (let column = 0; column < 7; column++) {
        if (board[column][5] === 0) {
            // Trouver la première cellule vide dans la colonne
            let row = 0;
            while (row < 6 && board[column][row] !== 0) {
                row++;
            }

            // Faire un mouvement temporaire
            board[column][row] = color;

            // Évaluer le tableau
            let currentValue = boardEval(board, color);

            // Annuler le mouvement temporaire
            board[column][row] = 0;

            // Mettre à jour le meilleur coup si nécessaire
            if (currentValue > bestMoveValue) {
                bestMoveValue = currentValue;
                bestMoveColumn = column;
            }
        }
    }

    return bestMoveColumn;
}

/**
 * Convert a string to a 2D array
 *
 * @param str {string} like m00000h00000mm0000hmh000h00000h00000000000
 * @returns {*[]}
 * @example
 * stringTo2DArray('m00000h00000mm0000hmh000h00000h00000000000')
 * // => [
 * //     ['m', '0', '0', '0', '0', '0'],
 * //     ['h', '0', '0', '0', '0', '0'],
 * //     ['m', 'm', '0', '0', '0', '0'],
 * //     ['h', 'm', 'h', '0', '0', '0'],
 * //     ['h', '0', '0', '0', '0', '0'],
 * //     ['h', '0', '0', '0', '0', '0'],
 * //     ['0', '0', '0', '0', '0', '0'],
 * // ]
 */
function stringTo2DArray(str) {
    const cols = 6;
    const rows = 7;
    const arr = [];

    for (let i = 0; i < rows; i++) {
        arr.push([]);
        for (let j = 0; j < cols; j++) {
            arr[i].push(str[j + i * cols]);
        }
    }
    return arr;
}

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

/**
 *
 * @param board array [7][6]
 * @param color 1 or 2
 * @return {number} score for the player of given color
 */
function boardEval(board, color) {
    let value = 0;
    for(let column = 0; column<7; column++){
        for(let row = 0; row<6; row++){
            if (board[column][row] === 0){
                let cellValue = 0;
                let horizontalVal = 0;

                let valLeft = 0;
                for (let i = 1; i < 4; i++) {
                    let index = column - i;
                    if (index > -1 && board[index][row] === color) {
                        valLeft += 1;
                    } else {
                        break;
                    }
                }

                let valRight = 0;
                for (let i = 1; i < 4; i++) {
                    let index = column + i;
                    if (index <7 && board[index][row] === color) {
                        valRight += 1;
                    } else {
                        break;
                    }
                }
                horizontalVal = ( (valRight+valLeft) >= 3) ? 4 : Math.max(valLeft, valRight);

                let bottomVal = 0;
                for (let i = 1; i < 4; i++) {
                    let index = row - i;
                    if (index > -1 && color === board[column][index]) {
                        bottomVal += 1;
                    } else {
                        break;
                    }
                }

                bottomVal = bottomVal === 3 ? 4 : bottomVal;

                // diagonal
                let sumUpRight = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row + i;
                    let indexColumn = column + i;
                    if (indexLine < 6 && indexColumn < 7 && color === board[indexColumn][indexLine]) {
                        sumUpRight += 1;
                    } else {
                        break;
                    }
                }

                let sumDownLeft = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row - i;
                    let indexColumn = column - i;
                    if (indexLine > -1 && indexColumn > -1 && color === board[indexColumn][indexLine]) {
                        sumDownLeft += 1;
                    } else {
                        break;
                    }
                }

                let diagR = ((sumUpRight + sumDownLeft) >= 3) ? 4 : Math.max(sumUpRight, sumDownLeft);

                let sumUpLeft = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row + i;
                    let indexColumn = column - i;
                    if (indexLine < 6 && indexColumn > -1 && color === board[indexColumn][indexLine]) {
                        sumUpLeft += 1;
                    } else {
                        break;
                    }
                }

                let sumDownRight = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row - i;
                    let indexColumn = column + i;
                    if (indexLine > -1 && indexColumn < 7 && color === board[indexColumn][indexLine]) {
                        sumDownRight += 1;
                    } else {
                        break;
                    }
                }

                let diagL = ((sumDownRight + sumUpLeft) >= 3) ? 4 : Math.max(sumDownRight, sumUpLeft);

                cellValue = Math.max(horizontalVal, diagL, diagR, bottomVal);
                value += cellValue;
                break;
            }
        }
    }
    return value;
}


// if main index is executed, run the tests
if (require.main === module) {
    testStringTo2DArray();
}

// Route for receiving GET requests
app.get('/move', (req, res) => {
    const board = req.query.b; // b is the 42 chars board string

    if (!board) return res.status(400).json({ error: 'No board or b' });
    if (board.length < 42) return res.status(400).json({ error: 'Board is too short' });
    if (board.length > 42) return res.status(400).json({ error: 'Board is too long' });
    if (board.match(/[^0hm]/)) return res.status(400).json({ error: 'Board contains invalid characters' });


    const columnToPlay = findBestMove(board);
    if (columnToPlay === undefined) return res.status(400).json({ error: 'No valid move' });
    if (columnToPlay === "lose") return res.status(420).json({ column: "gameover" });

    res.status(200).json({ column: columnToPlay });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});