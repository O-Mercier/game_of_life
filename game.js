var grid = [];
var rows, cols;
var requestID;
var canvas, ctx;
const ALIVE = '#000000', DEAD = '#FFFFFF';

function start(width ,height) {
    if (canvas == null){
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');
        rows = Math.floor(height / 4);
        cols = Math.floor( width / 4);
    }
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++){
            grid[i][j] = Math.floor(Math.random() * 100) % 2;
        }
    }
}

function stopLoop() {
    cancelAnimationFrame(requestID);
}

function clearGame() {
    ctx.fillStyle = DEAD;
    ctx.fillRect(0,0, 800, 800);
    start(800,800);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++){
            if (grid[i][j] === 1){
                ctx.fillStyle = ALIVE;
                ctx.fillRect( i * 4, j * 4, 4, 4);
            }
            else {
                ctx.fillStyle = DEAD;
                ctx.fillRect( i * 4, j * 4, 4, 4);
            }
        }
    }
}

function gridUpdate() {
    let surrounding;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            surrounding = countSurrounding(i,j);
            if(surrounding === 3 ||  (grid[i][j] === 1 && surrounding === 2))
                grid[i][j] = 1;
            else
                grid[i][j] = 0;
        }
    }
}

function countSurrounding(row, col) {
    let surrounding = 0;
    if (row-1 >= 0) {
        if (grid[row-1][col] === 1)
            surrounding++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] === 1)
            surrounding++;
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] === 1)
            surrounding++;
    }
    if (col-1 >= 0) {
        if (grid[row][col-1] === 1)
            surrounding++;
    }
    if (col+1 < cols) {
        if (grid[row][col+1] === 1)
            surrounding++;
    }
    if (row+1 < rows) {
        if (grid[row+1][col] === 1)
            surrounding++;
    }
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] === 1)
            surrounding++;
    }
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] === 1)
            surrounding++;
    }
    return surrounding;
}


function gameLoop() {
    draw();
    gridUpdate();
    sleep(50);
    requestID = requestAnimationFrame(gameLoop);
}