// Алгорим бинарного дерева поиска рекурсия (BST - Binary search tree)

const bst = () => {
    /** Данная функция реализует алгоритм бинарного дерева поиска с использованием рекурсии
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

const iterativeBst = () => {
    /** Данная функция реализует алгоритм бинарного дерева поиска с итеративного подхода
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

    const insert = (val) => {
        /** Итеративная вложенная функция для вставки элементов в узел
            * @param {number} val - текущий элемент который надо вставить в узел
            * @returns {{value: number, left: number | null, right: number | null}}
        */
        
        // Создаем новый узел с переданным значением
        const newNode = createNode(val);

        // Если дерево еще пустое, новый узел сразу становится корнем
        if (root === null) {
            root = newNode;
            return; // Завершаем работу функции
        }

        // Заводим указатель для обхода по дереву, начинаем с корня
        let current = root;

        // Запускаем бесконечный цикл, который остановится только при вставке узла
        while (true) {
            // Если новое значение меньше значения в текущем узле — уходим налево
            if (val < current.value) {
                // Если левая ветка пуста, значит мы нашли идеальное место
                if (current.left === null) {
                    current.left = newNode; // Привязываем новый узел
                    break; // Выходим из цикла while
                }
                // Если место занято, сдвигаем указатель глубже влево и идем на следующий круг
                current = current.left;
            } else { // Если новое значение больше или РАВНО текущему — уходим направо
                // Если правая ветка пуста, значит мы нашли идеальное место
                if (current.right === null) {
                    current.right = newNode; // Привязываем новый узел
                    break; // Выходим из цикла while
                }
                // Если место занято, сдвигаем указатель глубже вправо
                current = current.right;
            }
        }
    }

    const search = (target) => {
        /** Итеративная вложенная функция для поиска элемента 
            * @param {number} target - число которое нам надо найти в узле (`node`)
            * @returns {boolean}
        */

        // Начинаем поиск с самого верха дерева — с корня
        let current = root;

        // Идем вглубь дерева, пока не упрёмся в пустой узел (null)
        while (current !== null) {
            // Если значение в текущем узле совпало с искомым — мы нашли элемент
            if (target === current.value) return true;

            // Если искомое значение меньше текущего — идем в левую ветку, иначе в правую.
            // Запись через тернарный оператор эквивалентна конструкции if/else:
            // if (value < current.value) { current = current.left; } else { current = current.right; }
            current = target < current.value ? current.left : current.right;
        }

        // Если цикл завершился и мы дошли до null, значит элемента в дереве нет
        return false;
    }
    
    return {
        add: (value) => {
            insert(value)
        },

        has: (target) => {
            return search(target);
        },

        getRoot: () => root
    }
}

