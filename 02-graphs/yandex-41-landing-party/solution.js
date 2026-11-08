const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const flattenMatrix = (matrix) => {
    const flatCells = [];
    const row = matrix.length;
    const col = matrix[0].length;

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            flatCells.push({
                height: matrix[r][c],
                row: r,
                col: c
            })
        }
    }

    return flatCells;
}

let n = 0;
let m = 0;

const matrix = [];

rl.on('line', (input) => {
    let line = input.trim();

    if (line === '') return;

    if (n === 0) {
        [n, m] = line.split(/\s+/).map(Number);
        return
    }

    const row = line.split(/\s+/).map(Number);
    matrix.push(row)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);  
    console.log(n);
    */
});

rl.on('close', () => {
    const sortedCells = flattenMatrix(matrix).sort((a, b) => a.height - b.height);

    const visited = Array.from({length: n}, () => new Array(m).fill(false));
    const DIRECTIONS_4 = [
        [-1,  0], // ВВЕРХ
        [ 1,  0], // ВНИЗ
        [ 0, -1], // ВЛЕВО
        [ 0,  1]  // ВПРАВО
    ];

    let traps = 0;

    const dfs = (cell) => {
        const stack = [cell];
        visited[cell.row][cell.col] = true;

        while (stack.length > 0) {
            const currentCell = stack.pop();
            const {height, row, col} = currentCell;

            for (let i = 0; i < DIRECTIONS_4.length; i++) {
                const nextRow = row + DIRECTIONS_4[i][0];
                const nextCol = col + DIRECTIONS_4[i][1];

                if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < m) {
                    if (!visited[nextRow][nextCol] && matrix[nextRow][nextCol] >= height) {
                        visited[nextRow][nextCol] = true;

                        stack.push({
                            height: matrix[nextRow][nextCol],
                            row: nextRow,
                            col: nextCol
                        })
                    }
                }
            }
        }
    }

    for (let i = 0; i < sortedCells.length; i++) {
        const cell = sortedCells[i];

        if (!visited[cell.row][cell.col]) {
            traps++;
            dfs(cell)
        }
    }

    console.log(traps)
})
