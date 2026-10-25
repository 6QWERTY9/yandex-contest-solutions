const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createBinaryTree = (numbers) => {
    /**
        * @param {number[]} numbers - массив из которого надо сделать бинарное дерево
        * @returns {Object|null}
    */

    let root = null;

    const createNode = (val) => {
        /** Вспомогательная фукннция для создания узлов
            * @param {number} val - значение нового узла
            * @returns {{value: number, left: Object|null, right: Object|null}}
        */

        return {
            value: val,
            left: null,
            right: null
        }
    }

    const insert = (node, val) => {
        /** Рекурсивная вложенная функция для вставки элементов в узел
            * @param {{value: number, left: number | null, right: number | null}} node - узел с его детьми
            * @param {number} val - текущий элемент который надо вставить в узел
            * @returns {{value: number, left: number | null, right: number | null}}
        */


        if (node === null) return createNode(val);

        // если элемент который надо добавить меньше родителя узла то:
        if (val < node.value) {
            // рекурсивно добавляем его в левую часть нашего дерева
            node.left = insert(node.left, val);
        }

        // если элемент который надо добавить больше родителя узла то:
        if (val > node.value) {
            // рекурсивно добавляем его в правую часть нашего дерева
            node.right = insert(node.right, val);
        }

        return node;
    }

    // добавляем элементы массива (`numbers`) в наше дерево
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];

        // точка выхода из цикла (по условию задачи ноль не учитывается в дереве)
        if (num === 0) break;

        // если наше дерево (`root`) пустое, то первый элемент становиться корнем 
        if (root === null) {
            root = createNode(num);
        } else { // добавляем оставшиеся элементы сортируя их в поддеревья
            insert(root, num)
        }
    }

    return root;
}

let inputLine = '';

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    inputLine = line;

    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const numbers = inputLine.split(/\s+/).map(Number);

    const binaryTree = createBinaryTree(numbers);
    let isBalanced = true;

    const dfs = (node) => {

        if (node === null) return 0;

        const leftHeight = dfs(node.left)
        const rightHeight = dfs(node.right)

        if (Math.abs(leftHeight - rightHeight) >= 2) {
            isBalanced = false;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    dfs(binaryTree);

    if (isBalanced) {
        console.log('YES')
    } else {
        console.log('NO')
    }
})