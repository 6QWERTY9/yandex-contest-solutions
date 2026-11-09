const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const binaryTree = () => {
    let root = null;

    const createNode = (val) => {
        return {
            value: val,
            left: null,
            right: null,
        }
    }

    const insert = (node, val) => {
        if (node === null) return createNode(val);

        if (val < node.value) {
            node.left = insert(node.left, val);
        }

        if (val > node.value) {
            node.right = insert(node.right, val)
        }

        return node
    }

    const toArray = () => {
        let result = [];
        
        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);   
            result.push(node.value); 
            traverse(node.right); 
        };
        traverse(root);
        return result;
    }

    return {
        add: (value) => {
            root = insert(root, value)
        },
        toArray,
        getRoot: () => root
    }
}

let nums = [];

rl.on('line', (input) => {
    const line = input.trim();
    if (line === '') return;

    const row = input.split(/\s+/).map(Number);

    nums = row.slice(0, row.length - 1);

    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const tree = binaryTree();
    for (let i = 0; i < nums.length; i++) {
        tree.add(nums[i])
    }

    const res = tree.toArray();
    
    for (let num of res) {
        console.log(num);
    }
})