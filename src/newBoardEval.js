module.exports = {newBoardEval}

function countAlignments(board, color) {
    const directions = [
        { x: 1, y: 0 },  // horizontal
        { x: 0, y: 1 },  // vertical
        { x: 1, y: 1 },  // diagonal up-right
        { x: 1, y: -1 }, // diagonal up-left
    ];
    const alignments = { 2: 0, 3: 0, 4: 0 };

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
                        } else {
                            break;
                        }
                        currentRow += dir.y;
                        currentCol += dir.x;
                    }
                    if (found >= 2 && found <= 4) {
                        alignments[found]++;
                    }
                }
            }
        }
    }

    return alignments;
}

function newBoardEval(board, color) {
    const opponent = color === 'm' ? 'h' : 'm';
    const playerAlignments = countAlignments(board, color);
    const opponentAlignments = countAlignments(board, opponent);

    const playerScore =
        playerAlignments[4] * 1000 +
        playerAlignments[3] * 100 +
        playerAlignments[2] * 10;
    const opponentScore =
        opponentAlignments[4] * 1000 +
        opponentAlignments[3] * 100 +
        opponentAlignments[2] * 10;

    return playerScore - opponentScore;
}
