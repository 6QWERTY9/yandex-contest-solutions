const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
const solveCave3D = (size, arr) => {
    
    const distance = Array.from({length: size}, 
        () => Array.from({length: size}, 
        () => Array(size).fill(-1)));
    
    const dL = [-1, 1, 0, 0, 0, 0];
    const dR = [0, 0, -1, 1, 0, 0];
    const dC = [0, 0, 0, 0, -1, 1];
    
    let startL = 0, startR = 0, startC = 0;

    for (let i = 0; i < arr.length; i++) {
        const x = arr[i].indexOf('S');

        if (x !== -1) {
            startL = Math.floor(i / size);
            startR =  i % size;
            startC = x;

            break
        }
    }

    distance[startL][startR][startC] = 0;

    const queue = [{ L: startL, row: startR, col: startC }];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.L === 0) {
            
            return distance[current.L][current.row][current.col]
        }

        for (let j = 0; j < 6; j++) {
            let nextL = current.L + dL[j];
            let nextR = current.row + dR[j];
            let nextC = current.col + dC[j];

            if (nextL >=0 && nextL < size && nextR >=0 && nextR < size && nextC >= 0 && nextC < size) {

                if (distance[nextL][nextR][nextC] === -1 && arr[(nextL * size) + nextR][nextC] === '.') {

                    distance[nextL][nextR][nextC] = distance[current.L][current.row][current.col] + 1;

                    queue.push({ L: nextL, row: nextR, col: nextC });
                }
            }
        }

        
    }

    return -1;
}
rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    lines.push(line)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    if (lines.length === 0) return;
    
    const size = Number(lines[0]);
    const arr = lines.slice(1);
    
    const result = solveCave3D(size, arr);
    console.log(result);
})