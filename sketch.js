let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let w;
let h;

let ai = 'X';
let human = 'O';
let currentPlayer;

function setup() {
    createCanvas(400, 400);
    w = width/3;
    h = height/3;
    let playerChoice = prompt("Do you want to play first? (yes/no)");
    if (playerChoice.toLowerCase() === 'yes') {
        currentPlayer = human;
    } else {
        currentPlayer = ai;
        bestMove();
    }
}

function equals3(a, b, c) {
    return (a==b && b==c && a != '');
}

function checkWinner() {
    let winner = null;

    //horizontal 
    for(let i = 0;i < 3;i++) {
        if(equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    //vertical
    for(let i = 0;i < 3;i++) {
        if(equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    //diagonal
    if(equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[2][2];
    }

    if(equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for(let i = 0;i < 3;i++) {
        for(let j = 0;j < 3;j++) {
            if(board[i][j] == '') {
                openSpots++;
            }
        }
    }
    if(winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function mousePressed() {
    if(currentPlayer == human) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);

        if(board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = ai;
            if (!checkWinner()) {
                bestMove();
            }
        }
    }
}

function draw() {
    background(220);
    let w = width/3;
    let h = height/3;

    line(w, 0, w, height);
    line(w*2, 0, w*2, height);
    line(0, h, width, h);
    line(0, h*2, width, h*2);

    for(let j = 0;j < 3;j++) {
        for(let i = 0;i < 3;i++) {
            let x = w*i + w/2;
            let y = h*j + h/2;
            let spot = board[i][j];
            textSize(32);
            strokeWeight(4);
            if(spot == human) {
                noFill();
                ellipse(x, y, w/2);
            }
            else if(spot == ai) {
                let xr = w/4;
                line(x-xr, y-xr, x+xr, y+xr);
                line(x+xr, y-xr, x-xr, y+xr);
            }
        }
    }

    let result = checkWinner();
    if(result != null) {
        let resultText;
        if (result === 'tie') {
            resultText = 'It\'s a tie!';
        } else {
            resultText = 'Winner: ' + result;
        }
        document.getElementById('result').innerText = resultText; // Update the result div
        noLoop();
    }
}
