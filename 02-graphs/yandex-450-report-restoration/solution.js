const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const graphBuilder = (vertices, edges) => {
    const graph = {};

    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];

        graph[vertex] = [];
    }

    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];

        graph[from].push(to);
    }

    return graph;
}
let n = 0, m = 0;

let allPage = [];
let startPage = '';
const edges = [];

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    if (n === 0) {
        let nums = line.split(/\s+/).map(Number);
        [n,m] = nums;
        return;
    }

    if (allPage.length === 0) {
        allPage = line.split(/\s+/);
        return;
    }

    if (startPage === '') {
        startPage = line;
        return;
    }

    edges.push(line.split(/\s+/));
});

rl.on('close', () => {
    const graph = graphBuilder(allPage, edges);

    const visited = {};

    let result = 0;

    const dfs = (page) => {
        if (visited[page]) return;

        visited[page] = true;

        const neighbors = graph[page] || [];

        for (let i = 0; i < neighbors.length; i++) {
            const nextPage = neighbors[i];
            dfs(nextPage);
        }
    }

    dfs(startPage);

    for (let i = 0; i < allPage.length; i++) {
        const page = allPage[i]
        if (!visited[page]) {
            result++;
        }
    }

    console.log(result)

})