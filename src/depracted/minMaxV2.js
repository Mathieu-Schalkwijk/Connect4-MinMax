const { boardEval, stringTo2DArray } = require('../evalFuncArray.js');

function minimax(board, depth, isMaximizingPlayer, color) {
    if (depth == 0 || isGameOver(board)) {
        console.log("depth: " + depth + " isGameOver: " + isGameOver(board));
        return boardEval(board, color);
    }

    let otherColor = color === "m" ? "h" : "m";
    let bestValue;
    let validMove = false;

    if (isMaximizingPlayer) {
        bestValue = -Infinity;
        for (let col = 0; col < 7; col++) {
            let row = findEmptyRow(board, col);
            if (row !== -1) {
                validMove = true;
                board[row][col] = color;
                let value = minimax(board, depth - 1, false, otherColor);
                board[row][col] = "0";
                bestValue = Math.max(bestValue, value);
            }
        }
    } else {
        bestValue = Infinity;
        for (let col = 0; col < 7; col++) {
            let row = findEmptyRow(board, col);
            if (row !== -1) {
                validMove = true;
                board[row][col] = otherColor;
                let value = minimax(board, depth - 1, true, color);
                board[row][col] = "0";
                bestValue = Math.min(bestValue, value);
            }
        }
    }

    if (!validMove) {
        return boardEval(board, color);
    }

    return bestValue;
}


function findEmptyRow(board, col) {
    for (let row = 5; row >= 0; row--) {
        if (board[row][col] === "0") {
            return row;
        }
    }
    return -1;
}

function isGameOver(board) {
    const directions = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1]
    ];

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col] !== "0") {
                for (let d = 0; d < directions.length; d++) {
                    let dr = directions[d][0];
                    let dc = directions[d][1];

                    if (
                        row + 3 * dr < 6 &&
                        col + 3 * dc < 7 &&
                        col + 3 * dc >= 0 &&
                        board[row][col] === board[row + dr][col + dc] &&
                        board[row][col] === board[row + 2 * dr][col + 2 * dc] &&
                        board[row][col] === board[row + 3 * dr][col + 3 * dc]
                    ) {
                        return true;
                    }
                }
            }
        }
    }

    // Vérifie si le tableau est plein (match nul)
    let isBoardFull = true;
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col] === "0") {
                isBoardFull = false;
                break;
            }
        }
        if (!isBoardFull) break;
    }

    return isBoardFull;
}

function getBestMove(board, depth, color) {
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let col = 0; col < 7; col++) {
        let row = findEmptyRow(board, col);
        if (row !== -1) {
            board[row][col] = color;
            let value = minimax(board, depth - 1, false, color === "m" ? "h" : "m");
            board[row][col] = "0";
            if (value > bestValue) {
                bestValue = value;
                bestMove = col;
            }
        }
    }
    return bestMove;
}

const board = stringTo2DArray("m00000h00000mm0000hmh000h00000h00000000000");
console.log("board: ", board);
console.log(getBestMove(stringTo2DArray("m00000h00000mm0000hmh000h00000h00000000000"), 3, ));