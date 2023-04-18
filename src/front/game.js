// recuperation of front table
let table = document.querySelector("table");
let cells = document.querySelectorAll("td");

// construction of local board
let board = [];
for (let i = 0; i < 7; i++) {
    board.push([0, 0, 0, 0, 0, 0]);
}


let currentPlayer = 'h';

let gameOver = false;

document.querySelector(".player-win-container").innerHTML = currentPlayer === 'h' ? "It's human's turn" : "It's machine's turn";

// execution
addEventListeners();

function addEventListeners() {
    cells.forEach(cell => {
        cell.addEventListener("click", async () => {
            if (currentPlayer === 'h' && !gameOver) {
                const emptyCell = this.findEmptyCell(cell);
                console.log("cell column : " + emptyCell.cellIndex + "cell ligne : " + emptyCell.parentNode.rowIndex);
                if (emptyCell) this.addPiece(emptyCell, currentPlayer);
                if (checkWin(board, currentPlayer)){
                    gameOver = true;
                    displayWin(currentPlayer);
                    return;
                }
                changePlayer();
                let opponentColumn = await getOpponentMove();
                let opponentLine = findFirstEmpty(opponentColumn);
                board[opponentColumn][opponentLine] = currentPlayer;
                table.rows[5 - opponentLine].cells[opponentColumn].classList.add("yellow");
                if (checkWin(board, currentPlayer)){
                    gameOver = true;
                    displayWin(currentPlayer);
                    return;
                }
                changePlayer();
            }
        });
    });
}

function addPiece(cell, player) {
    console.log("On va ADD piece de du joueur" + player);
    let color = player === 'h' ? "blue" : "yellow"; // human is blue
    board[cell.cellIndex][cell.parentNode.rowIndex] = player;
    table.rows[5 - cell.parentNode.rowIndex].cells[cell.cellIndex].classList.add(color); // used to change a piece's style
    console.log(board);
}

function findEmptyCell(cell) {
    let column = cell.cellIndex;
    console.log("cell column : " + column);

    for (let i = 0; i<6; i++){
        if (board[column][i] === 0) {
            return table.rows[i].cells[column];
        }
    }
    return;
}

function findFirstEmpty(column){
    for (let i = 0; i<6; i++){
        if (board[column][i] === 0) {
            return i;
        }
    }
}

function changePlayer(){
    currentPlayer = currentPlayer === 'h' ? 'm' : 'h';
    document.querySelector(".player-win-container").innerHTML = currentPlayer === 'h' ? "It's human's turn" : "It's machine's turn";
}

function array2DToString(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    let str = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            str += arr[i][j];
        }
    }
    return str;
}
async function getOpponentMove() {
    const value = array2DToString(board);
    const response = await fetch("http://localhost:3000/move?b=" + value, {
        method: "GET", headers: {
            "Content-Type": "application/json"
        }, mode: 'no-cors'
    });
    const OpponentResp = await response.json();
    console.log("Opponent resp : " + OpponentResp.column);
    return OpponentResp.column;
}

function checkWin(board, color) {
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

function displayWin(color) {
    console.log("WIN:", color)
    document.querySelector(".player-win-container").innerHTML = color === 'h' ? "Human wins!" : "Machine wins!";
    cells.forEach(cell => {
        cell.addEventListener("click", null);
    });
}