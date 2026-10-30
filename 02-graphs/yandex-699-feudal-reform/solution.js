const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
const parents = [];
let initBalance = [];

rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    if (n === 0) {
        n = parseInt(line, 10);
        return;
    }

    if (parents.length < n - 1) {
        parents.push(parseInt(line, 10));
        return;
    }

    initBalance = line.split(/\s+/).map(Number);
});

rl.on('close', () => {
    
    if (!initBalance || initBalance.length === 0) return;

    const tree = Array.from({ length: n }, () => []);

    
    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        const child = i + 1;
        tree[parent].push(child);
    }

    let totalEdicts = 0;

    const dfs = (node) => {
        let childrenSum = 0;
        const children = tree[node] || [];

        for (let i = 0; i < children.length; i++) {
            childrenSum += dfs(children[i]);
        }

        // Защита: если элемент массива не существует, берем 0
        const currentBalance = initBalance[node] || 0;
        const edicts = currentBalance - childrenSum;
        
        totalEdicts += Math.abs(edicts);

        return edicts + childrenSum;
    };

    dfs(0);

    console.log(totalEdicts);
});

