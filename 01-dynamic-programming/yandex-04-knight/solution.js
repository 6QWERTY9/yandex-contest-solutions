const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const findMaxRouteChessKnight = (n,m) => {
    const dp = Array.from({length: n}, () => Array(m).fill(0));
    dp[0][0] = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            
            if (dp[i][j] > 0) {
                if ( i + 1 < n && j + 2 < m) {
                    dp[i+1][j + 2] += dp[i][j];
                }

                if (i + 2 < n && j + 1 < m) {
                    dp[i + 2][j + 1] += dp[i][j]
                }
            }
        }
    }

    return dp[n-1][m-1]
}

rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    const [n, m] = line.split(/\s+/).map(Number);
    
    const result = findMaxRouteChessKnight(n, m);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
    console.log(result);
    rl.close();
});