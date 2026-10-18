const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];

const findShortesPath = (size, matrix, start, end) => {
    start = start - 1;
    end = end - 1;

    const distance = Array.from({length: size}).fill(-1);
    distance[start] = 0;

    const queue = [start]

    while (queue.length > 0) {
        let current = queue.shift();

        for (let neighbor = 0; neighbor < size; neighbor++) {
            if (matrix[current][neighbor] === 1 && distance[neighbor] === -1) {
                distance[neighbor] = distance[current] + 1;
                queue.push(neighbor)
            }
        }
    }
    
    return distance[end];
}

rl.on('line', (input) => {

    const line = input.trim()

    if (line === '') return;

    const row = line.split(/\s+/).map(Number)
    lines.push(row)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
    
    
});

rl.on('close', () => {
    const n = lines[0][0];

    const matrix = lines.slice(1, n + 1);

    const [start, end] = lines[n + 1]

    const result = findShortesPath(n, matrix, start, end);
    
    console.log(result);
})