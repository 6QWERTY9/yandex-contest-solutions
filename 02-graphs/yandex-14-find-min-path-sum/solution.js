const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];

const findMinPathSum = (n, m, s, t, q, arr ) => {
    /*
        * Возвращает минимальное значение суммы длин путей или −1.

        * @params {number} {number} n, m - размеры матрицы, где n - это количество строк а m - это количество столбцов
        * @params {number} {number} s, t - координаты начальной клетки
        * @params {number} q - количество фигур на доске
        * @params {array} arr - список с координатами расположением каждой фигуры
    */
    let startRow = s - 1; let startCol = t - 1;

    const distance = Array.from({length: n}, () => Array(m).fill(-1));
    distance[startRow][startCol] = 0;

    const queue = [{row: startRow, col: startCol}];

    const dr = [-2, -2, -1, -1, 1, 1, 2, 2];
    const dc = [-1, 1, -2, 2, -2, 2, -1, 1];

    while (queue.length > 0) {
        const current = queue.shift();

        for (let k = 0; k < 8; k++) {
            const nextRow = current.row + dr[k];
            const nextCol = current.col + dc[k];

            if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < m && distance[nextRow][nextCol] === -1) {

                distance[nextRow][nextCol] = distance[current.row][current.col] + 1;

                queue.push({row: nextRow, col: nextCol})
            }
        }
    }

    let totalSum = 0;

    for (let i = 0; i < q; i++) {
        let fRow = arr[i][0] - 1; 
        let fCol = arr[i][1] - 1;

        if (distance[fRow][fCol] === -1) {
            return -1
        }

        totalSum += distance[fRow][fCol];
    }

    return totalSum;
}


rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    const row = line.split(/\s+/).map(Number);
    lines.push(row);

    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const [n, m, s, t, q] = lines[0]; 
    const arr = lines.slice(1, q + 1);

    const result = findMinPathSum(n,m,s,t,q,arr);

    console.log(result)
})