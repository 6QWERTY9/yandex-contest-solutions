const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const buildTree = (n, parents) => {
    const tree = Array.from({length: n + 1}, () => []);

    let root = 0;

    for (let i = 0; i < n; i++) {
        let parent = parents[i];
        let child = i + 1;

        if (parent === 0) {
            root = child;
        } else {
            tree[parent].push(child)
        }
    }

    return {tree, root}
}

const computeTimeStamps = (root, tree, n) => {
    const timeIn = new Array(n + 1).fill(0);
    const timeOut = new Array(n + 1).fill(0);
    let timer = 0;

    const stack = [[root, 0]];
    
    
    timeIn[root] = ++timer;

    while (stack.length > 0) {
        const currentFrame = stack[stack.length - 1];
        const [v, childIdx] = currentFrame;
        const children = tree[v] || [];

        
        if (childIdx < children.length) {
            const nextChild = children[childIdx];
            
            
            currentFrame[1]++; 
            
            
            timeIn[nextChild] = ++timer;
            
            
            stack.push([nextChild, 0]);
        } else {
            
            timeOut[v] = ++timer;
            stack.pop(); 
        }
    }

    return { timeIn, timeOut };
};


const isAncestor = (a, b, timeIn, timeOut) => timeIn[a] < timeIn[b] && timeOut[a] > timeOut[b];



let n = 0;
let m = 0;
let timeIn = null;
let timeOut = null;
let isTreeProcessed = false;


rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    if (n === 0) {
        n = +line;
        return;
    }

    if (!isTreeProcessed) {
        const parents = line.split(/\s+/).map(Number);

        const {tree, root} = buildTree(n, parents);
        ({timeIn, timeOut} = computeTimeStamps(root, tree, n));

        isTreeProcessed = true;
        return;
    }

    if (m === 0) {
        m = +line;
        return;
    }

    const [a,b] = line.split(/\s+/).map(Number);

    console.log(isAncestor(a, b, timeIn, timeOut) ? 1 : 0);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});