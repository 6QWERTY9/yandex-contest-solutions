const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const allLines = []; 

rl.on('line', (input) => {
    const line = input.trim();
    if (line !== '') {
        allLines.push(line);
    }
});

rl.on('close', () => {
    if (allLines.length === 0) return;

    const [h, w] = allLines[0].split(' ').map(Number);

    const matrix = [];
    const matrixLinesCount = Math.min(h, allLines.length - 2); 
    
    for (let i = 1; i <= matrixLinesCount; i++) {
        matrix.unshift(allLines[i]); 
    }

    
    const startLine = allLines[allLines.length - 2];
    const endLine = allLines[allLines.length - 1];

    if (!startLine || !endLine) {
        console.log(-1);
        return;
    }

    const [sx, sy] = startLine.split(' ').map(Number);
    const [tx, ty] = endLine.split(' ').map(Number);

    const startX = sx - 1, startY = sy - 1;
    const endX = tx - 1, endY = ty - 1;

    // Массив направлений хода (8 направлений)
    const dx = [0, 0, 1, -1, 1, 1, -1, -1];
    const dy = [1, -1, 0, 0, 1, -1, 1, -1];

    const minTurns = Array.from({ length: h }, () => Array(w).fill(Infinity));

    
    const stack = [];

    
    if (matrix[startY] && matrix[startY][startX] !== 'X') {
        minTurns[startY][startX] = 0;
        stack.push({ x: startX, y: startY, currentTurns: 0 });
    }

    // Главный цикл итеративного DFS
    while (stack.length > 0) {
        
        const { x, y, currentTurns } = stack.pop();

        
        if (currentTurns > minTurns[y][x]) continue;

        for (let d = 0; d < 8; d++) {
            let nx = x + dx[d];
            let ny = y + dy[d];

            
            while (nx >= 0 && nx < w && ny >= 0 && ny < h && matrix[ny] && matrix[ny][nx] !== 'X') {
                const nextTurns = currentTurns + 1;

                
                if (nextTurns < minTurns[ny][nx]) {
                    minTurns[ny][nx] = nextTurns; 
                    
                    
                    if (nx === endX && ny === endY) {
                        nx += dx[d];
                        ny += dy[d];
                        continue; 
                    }

                    
                    stack.push({ x: nx, y: ny, currentTurns: nextTurns });
                }

                nx += dx[d];
                ny += dy[d];
            }
        }
    }

    
    let result = Infinity;
    if (endY >= 0 && endY < h && endX >= 0 && endX < w) {
        result = minTurns[endY][endX];
    }

    if (result === Infinity) {
        console.log(-1);
    } else {
        console.log(result);
    }
});

