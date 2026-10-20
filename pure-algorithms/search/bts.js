// Алгорим бинарного дерева поиска (BST - Binary search tree)

const bst = () => {
    /** Данная функция реализует алгоритм бинарного дерева поиска
        * 
        * @returns {{add: function(number): void, has: function(number): boolean, getRoot: function(): (Object|null)}}
    */



    // глобальный корень дерева, который видят все вложенные функции
    let root = null;

    const createNode = (val) => {
        /** Вспомогательная фукннция для создание узлов
            * @param {number} val - текущий узел
            * @returns {{value: number, left: number | null, right: number | null}}
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
            node.left = insert(node.left, val);
        }

        // если элемент который надо вставить больше родителя узла то:
        if (val > node.value) {
            // рекурсивно добавляем его в правую часть нашего дерева
            node.right = insert(node.right, val)
        }

        return node;
    }

    const search = (node, target) => {
        /** Рекурсивная вложенная функция для поиска элемента 
            * @param {{value: number, left: number | null, right: number | null}} node - узел в котором мы будем искать `target`
            * @param {number} target - число которое нам надо найти в узле (`node`)
            * @returns {boolean}
        */

        // условие для выхода из рекурсии
        // Если узел пустой то выходим
        if (node === null) return false;

        // Если мы нашли нашу ЦЕЛЬ то выходим и возвращаем true
        if (node.value === target) return true;

        // Рекурсия
        // Если ЦЕЛЬ меньше родителя узла то отсеиваем правую часть нашего дерева и продолжаем рекурсивно обходить только левую часть
        if (target < node.value) {
            return search(node.left, target)
        }

        // Если ЦЕЛЬ больше родителя узла то отсеиваем левую часть нашего дерева и продолжаем рекурсивно обходить только правую часть
        if (target > node.value) {
            return search(node.right, target)
        }
    }

    return {
        add: (value) => {
            root = insert(root, value)
        },

        has: (target) => {
            return search(root, target);
        },

        getRoot: () => root
    }
}