const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graphBuilder = (n, edges) => {
    const graph = Array.from({length: n + 1}, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];

        graph[from].push(to);
        graph[to].push(from);

    }

    return graph;
}


let n = 0, m = 0;
const edges = [];
rl.on('line', (input) => {
    const line = input.trim();
    
    if (line === '') return;

    if (n === 0) {
        [n, m] = line.split(/\s+/).map(Number);
        return
    }
    edges.push(line.split(/\s+/).map(Number))
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const graph = graphBuilder(n, edges);

    const visited = new Array(n + 1).fill(false);
    let requiredEdges = 0;
    let count = 0;

    const dfs = (v) => {
        visited[v] = true;

        const neighbors = graph[v]|| [];
        count++
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            count = 0;
            dfs(i);
            requiredEdges += count - 1
        }
    }

    const result = m - requiredEdges

    console.log(result)
})