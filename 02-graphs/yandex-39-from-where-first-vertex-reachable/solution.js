const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let N = 0;
let M = 0;

const graph = null;

let isFirstLine = true;


rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    if (isFirstLine) {
        [N, M] = line.split(/\s+/).map(Number);
        
        graph = Array.from({length: N + 1}, () => []);

        isFirstLine = false;
        return;
    }

    const [from, to] = line.split(/\s+/).map(Number);


    if (graph) {
        graph[to].push(from)
    }
});

rl.on('close', () => {
    const visited = new Array(N + 1).fill(false);

    const dfs = (v) => {
        /**
            * @param {Number} v - индекс посещенной вершины 
        */

        // отмечаем текущую вершину как посещенную
        visited[v] = true;

        const neighbors = graph[v] || [];

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    dfs(1);

    const result = [];

    for (let i = 1; i <= N; i++) {
        if (visited[i]) {
            result.push(i)
        }
    }

    console.log(result.join(' '));
})