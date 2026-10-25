const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createBinaryTree = (numbers) => {
    /**
        * @param {number[]} numbers -
        * @returns {Object|null}
    */

    // глобальный корень дерева, который видят все вложенные функции
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

        // точка выхода из рекурсии
        if (node === null) return createNode(val);

        // если элемент который надо вставить меньше родителя узла то:
        if (val < node.value) {
            // рекурсивно добавляем его в левую часть нашего дерева
            node.left = insert(node.left, val)
        }

        // если элемент который надо вставить больше родителя узла то:
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
    const line = input.trim('');

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
    const result = [];

    const dfs = (node) => {

        // Точка выхода из рекурсии
        if (node === null) return;

        // Сначала идем влевое поддерево (чтобы наш массив (`result`) сразу был отсортирован)
        dfs(node.left);

        // Переменные для проверки условия задачи (имеющих только одного ребёнка)
        const hasLeft = node.left !== null;
        const hasRight = node.right !== null;


        // Если один ребенок есть а второго нет, значит мы нашли наш узел
        if ((hasLeft && !hasRight) || (!hasLeft && hasRight)) {
            result.push(node.value)
        }

        // так же идем вправое поддерево
        dfs(node.right)
    }

    dfs(binaryTree);

    for (let i = 0; i < result.length; i++) {
        console.log(result[i])
    }
})