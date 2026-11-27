const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DIRECTIONS_4 = [
    [-1,  0], // ВВЕРХ
    [ 1,  0], // ВНИЗ
    [ 0, -1], // ВЛЕВО
    [ 0,  1]  // ВПРАВО
];

const findShortestPath = (sizes, matrix) => {
    const [n, m] = sizes;

    const queue = [];
    let head = 0;
    const dist = Array.from({length: n}, () => new Array(m).fill(-1));

    queue.push([0,0]);
    dist[0][0] = 0;

    while (head < queue.length) {
        const [row, col] = queue[head];
        head++;

        for (let i = 0; i < DIRECTIONS_4.length; i++) {
            const [dr, dc] = DIRECTIONS_4[i];

            let currRow = row;
            let currCol = col;

            while (
                currRow + dr >= 0 &&
                currRow + dr < n &&
                currCol + dc >= 0 &&
                currCol + dc < m &&
                matrix[currRow + dr][currCol + dc] !== 1
            ) {
                currRow += dr;
                currCol += dc;

                if (matrix[currRow][currCol] === 2) {
                    return dist[row][col] + 1;
                }
            }

            if (dist[currRow][currCol] === -1) {
                dist[currRow][currCol] = dist[row][col] + 1;
                queue.push([currRow, currCol]);
            }
        }
    }
}

const sizes = [];
const matrix = [];

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    const row = line.split(/\s+/).map(Number);

    if (sizes.length === 0) {
        sizes.push(...row)
        return
    }

    matrix.push(row);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const res = findShortestPath(sizes, matrix);

    console.log(res);
})