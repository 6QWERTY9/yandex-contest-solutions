const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0; let m = 0;
const edges = [];



rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    if (n === 0) {
        [n, m] = line.split(' ').map(Number);
        return;
    };

    edges.push(line);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const graph = Array.from({length: n + 1}, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [to, from] = edges[i].split(' ');

        graph[+to].push(+from);
        graph[+from].push(+to);
    }


    let visited = new Uint8Array(n + 1);

    let tin = new Int32Array(n + 1);
    let fup = new Int32Array(n + 1);

    let timer = 0;

    let bridgeDeg = new Int32Array(n + 1);


    const dfs = (start) => {
        visited[start] = 1;
        timer++;
        tin[start] = timer;
        fup[start] = timer;

        const stack = [{ v: start, p: -1, idx: 0 }];

        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const v = top.v;

            if (top.idx < graph[v].length) {
                const to = graph[v][top.idx];
                top.idx++;

                if (to === top.p) {
                    continue;
                }

                if (visited[to] === 1) {
                    fup[v] = Math.min(fup[v], tin[to]);
                } else {
                    visited[to] = 1;
                    timer++;
                    tin[to] = timer;
                    fup[to] = timer;
                    stack.push({ v: to, p: v, idx: 0 });
                }
            } else {
                stack.pop();

                if (top.p !== -1) {
                    fup[top.p] = Math.min(fup[top.p], fup[v]);

                    if (fup[v] > tin[top.p]) {
                        bridgeDeg[top.p]++;
                        bridgeDeg[v]++;
                    }
                }
            }
        }
    };

    dfs(1);

    const MOD = 998244353n;
    const ways = new BigInt64Array(n + 1);

    ways[0] = 1n;
    if (n >= 1) {
        ways[1] = 1n;
    }

    for (let k = 2; k <= n; k++) {
        ways[k] = (ways[k - 1] + BigInt(k - 1) * ways[k - 2]) % MOD;
    }

    let ans = 1n;

    for (let i = 1; i <= n; i++) {
        ans = (ans * ways[bridgeDeg[i]]) % MOD;
    }

    console.log(ans.toString());
})