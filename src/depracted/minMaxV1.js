const { boardEval, stringTo2DArray } = require('../evalFuncArray.js');

function minimax(board, depth, isMaximizing, alpha, beta, lastMove) {
    const gameOver = checkGameOver(board, lastMove);
    if (depth === 0 || gameOver) {
        if (gameOver) {
            return gameOver * 1000;
        }
        return boardEval(board, 1) - boardEval(board, 2);
    }

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let column = 0; column < 7; column++) {
            if (board[column].length < 6) {
                const newRow = board[column].push(1);
                const evaluate = minimax(board, depth - 1, false, alpha, beta, { column, row: newRow - 1 });
                board[column].pop();
                maxEval = Math.max(maxEval, evaluate);
                alpha = Math.max(alpha, evaluate);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let column = 0; column < 7; column++) {
            if (board[column].length < 6) {
                const newRow = board[column].push(2);
                const evaluate = minimax(board, depth - 1, true, alpha, beta, { column, row: newRow - 1 });
                board[column].pop();
                minEval = Math.min(minEval, evaluate);
                beta = Math.min(beta, evaluate);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minEval;
    }
}

function bestMove(board) {
    let bestEval = -Infinity;
    let move = -1;

    for (let column = 0; column < 7; column++) {
        if (board[column].length < 6) {
            const newRow = board[column].push(1);
            const evaluate = minimax(board, 3, false, -Infinity, Infinity, { column, row: newRow - 1 });
            board[column].pop();
            if (evaluate > bestEval) {
                bestEval = evaluate;
                move = column;
            }
        }
    }

    return move;
}

function makeMove(board, column, color) {
    if (board[column].length < 6) {
        board[column].push(color);
        return { column, row: board[column].length - 1 };
    } else {
        throw new Error('Column is full');
    }
}

/**
 * Check if the game is over after the last move
 * @param board
 * @param lastMove
 * @returns {number} 1 if player 1 wins, 0 if draw, and null if the game is still ongoing
 */
function checkGameOver(board, lastMove) {
    if (!lastMove) {
        return null;
    }
    const colorChar = board[lastMove.column][lastMove.row];
    const directions = [
        { x: 0, y: 1 }, // vertical
        { x: 1, y: 0 }, // horizontal
        { x: 1, y: 1 }, // diagonal up right
        { x: 1, y: -1 }, // diagonal down right
    ];

    for (const direction of directions) {
        let count = 1;

        for (let step = 1; step < 4; step++) {
            const x = lastMove.column + step * direction.x;
            const y = lastMove.row + step * direction.y;
            if (x >= 0 && x < 7 && y >= 0 && y < 6 && board[x][y] === colorChar) {
                count++;
            } else {
                break;
            }
        }

        for (let step = 1; step < 4; step++) {
            const x = lastMove.column - step * direction.x;
            const y = lastMove.row - step * direction.y;
            if (x >= 0 && x < 7 && y >= 0 && y < 6 && board[x][y] === colorChar) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 4) {
            return 1;
        }
    }

    // Check if the board is full (draw)
    let isFull = true;
    for (let column = 0; column < 7; column++) {
        if (board[column].length < 6) {
            isFull = false;
            break;
        }
    }

    return isFull ? 0 : null;
}

function findBestMoveArray(board, lastMove) {
    const depth = 4; // Ajustez la profondeur en fonction de la complexité souhaitée
    const bestMove = bestMove(board); // Utilisez la fonction bestMove ici
    return bestMove;
}

console.log(findBestMoveArray(stringTo2DArray("m00000h00000mm0000hmh000h00000h00000000000"), { column: 1, row: 0 }))