const { boardEval, stringTo2DArray } = require('./evalFuncArray.js');

function isGameOver(board, color) {//TODO: get the last move to avoid extra computation
    const directions = [
        { x: 1, y: 0 },  // horizontal
        { x: 0, y: 1 },  // vertical
        { x: 1, y: 1 },  // diagonal up-right
        { x: 1, y: -1 }, // diagonal up-left
    ];

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[col][row] === color) {
                for (const dir of directions) {
                    let found = 1;
                    let currentRow = row + dir.y;
                    let currentCol = col + dir.x;
                    while (
                        currentRow >= 0 &&
                        currentRow < 6 &&
                        currentCol >= 0 &&
                        currentCol < 7
                        ) {
                        if (board[currentCol][currentRow] === color) {
                            found++;
                            if (found === 4) {
                                console.log("WIN:", board)
                                return true;
                            }
                        } else {
                            break;
                        }
                        currentRow += dir.y;
                        currentCol += dir.x;
                    }
                }
            }
        }
    }

    return false;
}


function minMax(board, depth, maximizingPlayer, color) {
    if (depth === 0 || isGameOver(board, color)) {
        console.count("calling boardEval");
        return boardEval(board, color);
    }

    let bestValue;
    const opponent = color === 'm' ? 'h' : 'm';

    if (maximizingPlayer) {
        bestValue = -Infinity;
        for (let col = 0; col < 7; col++) {
            let newBoard = playMove(board, col, color);
            if (newBoard !== null) {
                console.log("calling minMax with current depth: " + depth);
                let value = minMax(newBoard, depth - 1, false, opponent);
                bestValue = Math.max(bestValue, value);
            }
        }
    } else {
        bestValue = Infinity;
        for (let col = 0; col < 7; col++) {
            let newBoard = playMove(board, col, opponent);
            if (newBoard !== null) {
                console.log("calling minMax with current depth: " + depth);
                let value = minMax(newBoard, depth - 1, true, color);
                bestValue = Math.min(bestValue, value);
            }
        }
    }

    return bestValue;
}

function playMove(board, col, color) {
    let newBoard = JSON.parse(JSON.stringify(board));

    for (let row = 5; row >= 0; row--) {
        if (newBoard[row][col] === '0') {
            newBoard[row][col] = color;
            return newBoard;
        }
    }

    return null;
}

function bestMove(board, color, depth) {
    let bestValue = -Infinity;
    let move = -1;

    for (let col = 0; col < 7; col++) {
        let newBoard = playMove(board, col, color);
        if (newBoard !== null) {
            let value = minMax(newBoard, depth - 1, false, color === 'm' ? 'h' : 'm');
            if (value > bestValue) {
                bestValue = value;
                move = col;
            }
        }
    }

    return move;
}

//const board = stringTo2DArray("m00000h00000mm0000hmh000h00000h00000000000");
const board = stringTo2DArray("000000000000000000000000000000000000000000");
console.log(bestMove(board, 'm', 4))
