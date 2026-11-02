const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graphBuilder = (n, matrix) => {
    const graph = Array.from({length: n + 1}, () => []);

    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                graph[i + 1].push(j + 1)
            }
        }
    }

    return graph;
}

const findCycles = (n, graph) => {
    const visited = new Array(n + 1).fill(false);

    let hasCycle = 'NO';
    let cylcleVertices = [];
    const path = [];

    const dfs = (currentVertex, parentVertex) => {
        visited[currentVertex] = true;
        path.push(currentVertex);

        const neighbors = graph[currentVertex] || [];

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (neighbor === parentVertex) {
                continue
            }

            if (!visited[neighbor]) {
                if (dfs(neighbor, currentVertex)) {
                    return true;
                }
            } else {
                hasCycle = 'YES';

                const startIndex = path.indexOf(neighbor);

                if (startIndex !== -1) {
                    cylcleVertices.push(...path.slice(startIndex));
                }

                return true;
            }

            
        }

        path.pop();
        return false;
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            if (dfs(i, -1)) {
                break;
            }
        }
    }

    const countCycles = cylcleVertices.length;
    

    return {hasCycle, cylcleVertices, countCycles}
}

let n = 0;
const matrix = [];

rl.on('line', (input) => {

    let line = input.trim();
    if (line === '') return;

    if (n === 0) {
        n = +line;
        return
    }

    const row = line.split(/\s+/).map(Number);
    matrix.push(row);

    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const graph = graphBuilder(n, matrix)
    const {hasCycle, countCycles, cylcleVertices} = findCycles(n, graph);

    if (hasCycle === 'YES') {
        console.log(hasCycle);
        console.log(countCycles);
        console.log(cylcleVertices.join(' '));
    } else {
        console.log(hasCycle)
    }
})

