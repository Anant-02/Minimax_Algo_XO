function bestMove() {
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == '') {
                board[i][j] = ai;
                let score = alphaBeta(board, 0, alpha, beta, false);
                board[i][j] = '';
                if(score > bestScore) {
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
}

let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function alphaBeta(board, depth, alpha, beta, isMaximizing) {
    let result = checkWinner();
    if(result !== null) {
        let score = scores[result];
        return score;
    }

    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == '') {
                    board[i][j] = ai;
                    let score = alphaBeta(board, depth + 1, alpha, beta, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha)
                        break; // Beta cutoff
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == '') {
                    board[i][j] = human;
                    let score = alphaBeta(board, depth + 1, alpha, beta, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);
                    if (beta <= alpha)
                        break; // Alpha cutoff
                }
            }
        }
        return bestScore;
    }
}
