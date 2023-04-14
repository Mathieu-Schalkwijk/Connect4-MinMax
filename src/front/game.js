
let table = document.querySelector("table");
let cells = document.querySelectorAll("td");

let board = [];
for (let i = 0; i < 7; i++) {
    board.push([0, 0, 0, 0, 0, 0]);
}


let currentPlayer = 'h';

// execution
addEventListeners();

function addEventListeners() {
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (currentPlayer === 'h'){
                const emptyCell = this.findEmptyCell(cell);
                console.log("cell column : "+ emptyCell.cellIndex + "cell ligne : " + emptyCell.parentNode.rowIndex);
                if (emptyCell) this.addPiece(emptyCell, currentPlayer);
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

function changePlayer(){
    currentPlayer = currentPlayer === 'h' ? 'm' : 'h';
}