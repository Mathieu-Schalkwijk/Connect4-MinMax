// recuperation of front table
let table = document.querySelector("table");
let cells = document.querySelectorAll("td");

// construction of local board
let board = [];
for (let i = 0; i < 7; i++) {
    board.push([0, 0, 0, 0, 0, 0]);
}


let currentPlayer = 'h';

// execution
addEventListeners();

function addEventListeners() {
    cells.forEach(cell => {
        cell.addEventListener("click", async () => {
            if (currentPlayer === 'h') {
                const emptyCell = this.findEmptyCell(cell);
                console.log("cell column : " + emptyCell.cellIndex + "cell ligne : " + emptyCell.parentNode.rowIndex);
                if (emptyCell) this.addPiece(emptyCell, currentPlayer);
                changePlayer();
                let opponentColumn = await getOpponentMove();
                let opponentLine = findFirstEmpty(opponentColumn);
                board[opponentColumn][opponentLine] = currentPlayer;
                table.rows[5 - opponentLine].cells[opponentColumn].classList.add("yellow");
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