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
        graph[to].push(from)
    }

    return graph
}

let n = 0;
let m = 0;
const edges = [];

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    if (n === 0) {
        [n, m] = line.split(/\s+/).map(Number);
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

    const visited = new Array(n + 1).fill(false);
    const components = [];

    for (let i = 1; i <= n; i++) {
        if (visited[i]) continue;

        const currentComponent = [];
        const stack = [i];
        visited[i] = true;

        while (stack.length > 0) {
            const currentVertex = stack.pop();

            currentComponent.push(currentVertex);

            const neighbors = graph[currentVertex] || [];
            for (let j = 0; j < neighbors.length; j++) {
                const neighbor = neighbors[j];

                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor)
                }
            }

        }

        components.push(currentComponent)



    }

    const countConnect = components.length;
    
    for (let i = 0; i < countConnect; i++) {
        if (i === 0) {
            console.log(countConnect)
        }

        const len = components[i].length;
        const connection = components[i].join(' ')

        console.log(len)
        console.log(connection)
    }
})