/**
 * This version uses the string implementation of the board instead of the 2D array
 * String example: m00000h00000mm0000hmh000h00000h00000000000
 */

function boardEval(boardStr, colorChar) {
    let value = 0;

    for (let column = 0; column < 7; column++) {
        for (let row = 0; row < 6; row++) {
            const index = column * 6 + row;

            if (boardStr[index] === '0') {
                let cellValue = 0;
                let horizontalVal = 0;

                let valLeft = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLeft = column - i;
                    if (indexLeft > -1 && boardStr[indexLeft * 6 + row] === colorChar) {
                        valLeft += 1;
                    } else {
                        break;
                    }
                }

                let valRight = 0;
                for (let i = 1; i < 4; i++) {
                    let indexRight = column + i;
                    if (indexRight < 7 && boardStr[indexRight * 6 + row] === colorChar) {
                        valRight += 1;
                    } else {
                        break;
                    }
                }
                horizontalVal = ((valRight + valLeft) >= 3) ? 4 : Math.max(valLeft, valRight);

                let bottomVal = 0;
                for (let i = 1; i < 4; i++) {
                    let indexBottom = row - i;
                    if (indexBottom > -1 && colorChar === boardStr[column * 6 + indexBottom]) {
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
                    if (indexLine < 6 && indexColumn < 7 && colorChar === boardStr[indexColumn * 6 + indexLine]) {
                        sumUpRight += 1;
                    } else {
                        break;
                    }
                }

                let sumDownLeft = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row - i;
                    let indexColumn = column - i;
                    if (indexLine > -1 && indexColumn > -1 && colorChar === boardStr[indexColumn * 6 + indexLine]) {
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
                    if (indexLine < 6 && indexColumn > -1 && colorChar === boardStr[indexColumn * 6 + indexLine]) {
                        sumUpLeft += 1;
                    } else {
                        break;
                    }
                }

                let sumDownRight = 0;
                for (let i = 1; i < 4; i++) {
                    let indexLine = row - i;
                    let indexColumn = column + i;
                    if (indexLine > -1 && indexColumn < 7 && colorChar === boardStr[indexColumn * 6 + indexLine]) {
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



function findBestMoveString(boardStr, colorChar) {
    let bestMoveColumn = -1;
    let bestMoveValue = -Infinity;

    for (let column = 0; column < 7; column++) {
        const topIndex = column * 6 + 5;
        if (boardStr[topIndex] === '0') {
            // Trouver la première cellule vide dans la colonne
            let row = 0;
            while (row < 6 && boardStr[column * 6 + row] !== '0') {
                row++;
            }
            const index = column * 6 + row;

            // Faire un mouvement temporaire
            const tempMoveStr = boardStr.slice(0, index) + (colorChar) + boardStr.slice(index + 1);

            // Évaluer le tableau
            const currentValue = boardEval(tempMoveStr, colorChar);

            // Mettre à jour le meilleur coup si nécessaire
            if (currentValue > bestMoveValue) {
                bestMoveValue = currentValue;
                bestMoveColumn = column;
            }
        }
    }

    return bestMoveColumn;
}

module.exports = {findBestMoveString, boardEval}