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

let n = 0;
let m = 0;

const edges = [];


rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    if (n === 0) {
        [n,m] = line.split(/\s+/).map(Number);
        return;
    }

    const row = line.split(/\s+/).map(Number);
    edges.push(row)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const graph = graphBuilder(n, edges);
    
    const colors = new Array(n + 1).fill(0);
    

    let result = 'YES'

    const dfs = (vertex, currentColor) => {
        colors[vertex] = currentColor;

        const neighbors = graph[vertex] || [];
        const nextColor = 3 - currentColor;

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (colors[neighbor] === 0) {
                dfs(neighbor, nextColor)
            } else if (colors[neighbor] === currentColor) {
                result = 'NO';
                return
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        if (colors[i] === 0) dfs(i, 1)
    }

    console.log('\n' + result)
})