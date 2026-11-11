const readline = require('readline');
const { inflate } = require('zlib');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
let edges = [];

const buildGraph = (n, edges) => {
    const graph = Array.from({length: n + 1}, () => []);

    for (let  i = 0; i < edges.length; i++) {
        const [from,to,weight] = edges[i].split(' ');

        graph[+from].push({to: +to, weight: +weight});
        graph[+to].push({to: +from, weight: +weight});
    }

    return graph;
}

rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    if (n === 0) {
        n = +line;
        return
    }

    const row = input;
    edges.push(row);


    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const graph = buildGraph(n, edges);

    const maxUp = Array.from({length: n + 1}, () => 0); // снизу вверх
    const maxDown = Array.from({length: n + 1}, () => 0); // сверху вниз
    const maxSpare = Array.from({length: n + 1}, () => 0); // сверху вниз запасные пути

    const parents = Array.from({length: n + 1}, () => 0);

    const dfsDown = (current, parent) => {

        parents[current] = parent;

        const currentEdges = graph[current] || [];

        for (let i = 0; i < currentEdges.length; i++) {
            const edge = currentEdges[i];

            if (edge.to === parent) continue;

            dfsDown(edge.to, current);

            const currentPath = maxDown[edge.to] + edge.weight;

            if (currentPath > maxDown[current]) {
                maxSpare[current] = maxDown[current];
                maxDown[current] = currentPath;
            } else if (currentPath > maxSpare[current]) {
                maxSpare[current] = currentPath;
            }

        }
    }

    const dfsUp = (current, parent) => {

        const currentEdges = graph[current] || [];

        for (let i = 0; i < currentEdges.length; i++) {
            const edge = currentEdges[i];

            if (edge.to === parent) continue;

            const child = edge.to;
            const weight = edge.weight;

            if (maxDown[child] + weight === maxDown[current]) {
                maxUp[child] = weight + Math.max(maxUp[current], maxSpare[current]);
            } else {
                maxUp[child] = weight + Math.max(maxUp[current], maxDown[current]);
            }

            dfsUp(child, current);
        }
    }

    dfsDown(1, -1);
    dfsUp(1, -1);

    let minRadius = Infinity;

    for (let i = 0; i < edges.length; i++) {
        const [uStr, vStr, weightStr] = edges[i].split(' ');

        let [u, v, weight] = [+uStr, +vStr, +weightStr]
        
        if (parents[u] === v) {
            const temp = u;

            u = v;
            v = temp;
        }

        const radiusV = maxDown[v];
        let radiusU = maxUp[u];
        
        if (maxDown[v] + weight === maxDown[u]) {
            radiusU = Math.max(radiusU, maxSpare[u]);
        } else {
            radiusU = Math.max(radiusU, maxDown[u]);
        }

        const currentR = Math.max(radiusV, radiusU);

        if (currentR < minRadius) {
            minRadius = currentR;
        }


    }

    console.log(minRadius);
})

