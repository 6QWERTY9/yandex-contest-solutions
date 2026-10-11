const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const solveHeapify = () => {

    let heap = []; // наша куча - пустой массив

    const swap = (i, j) => {
        /**
            * Функция меняет элементы с индексом i и j друг с другом
            * @param {number} i - индекс элемента массива
            * @param {number} j - индекс элемента массива
        */

        [heap[i], heap[j]] = [heap[j], heap[i]]
    }

    const shiftDown = (i, size) => {
        /**
            * Функция для просеивания вниз по кучи

            * @param {number} i - индекс элемента, который нужно опустить вниз
            * @param {number} size - Текущий рабочий размер кучи
        */

        while (true) {
            let largest = i; // Изначально считаем текущий узел самым большим

            const leftChild = i * 2 + 1; // Индекс левого дочернего элемента
            const rightChild = i * 2 + 2; // Индекс правого дочернего элемента

            // Проверяем, существует ли левый ребенок и больше ли он текущего лидера
            if (leftChild < size && heap[leftChild] > heap[largest]) {
                largest = leftChild;
            }

            // Проверяем, существует ли правый ребенок и больше ли он текущего лидера
            if (rightChild < size && heap[rightChild] > heap[largest]) {
                largest = rightChild;
            }

            // Если один из детей оказался больше родителя
            if (largest !== i) {
                swap(i, largest); // Меняем родителя с наибольшим ребенком местами
                i = largest; // Переходим по индексу вниз, чтобы продолжить спуск
            } else {
                break; // Если родитель больше всех детей, куча починена — выходим
            }
        }
    }

    const shiftUp = (i) => {
        /**
            * Функция для просеивания элемента кучи снизу вверх
            * 
            * @param {number} i - индекс последнего элемента кучи
        */
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2); // высчитываем родителя узлов

            // проверяем если узел больше родителя
            if (heap[i] > heap[parent]) {
                swap(i, parent); // меняем местами узел с родителем
                i = parent // идем выше по индексам списка
            } else {
                break
            }
        }
    }

    const insert = (val) => {
        /**
            * Функция для добавления элемента в нашу кучу
            * 
            * @param {number} val - элемент который надо добавить в нашу кучу
        */
        
        heap.push(val)
        shiftUp(heap.length - 1) // двигаем добавленый элемент снизу вверх по кучи
    }

    const extract = () => {
        /**
            * Функция для поиска максимального элемента кучи
            * Возвращает максимальный жлемент кучи
        */
        if (heap.length === 0) return null;

        const max = heap[0]; // достаем максимальный элемент кучи, он всегда будет вначале нашего списка
        const last = heap.pop(); // извлекаем последний элемент в нашей кучи

        // если длина ммассива с нашей кучи больше нуля 
        if (heap.length > 0) {
            heap[0] = last; // ставим последний минимальный элемент с нашем максиммальным элементом
            shiftDown(0, heap.length) // просеиваем нашу кучу сверху вниз, что бы на индексе 0 снова был максимальный элемент
        }

        return max; // возвращаем максимальный элемент
    }

    return { insert, extract }; // возвращаем две функции которые нужны для решения этой задачи
}


const myHeap = solveHeapify();

let isFirstLine = true;

rl.on('line', (input) => {
    const line = input.trim();

    if (isFirstLine) {
        isFirstLine = false;
        return
    }

    if (line === '1') {
        const maxVal = myHeap.extract();
        console.log(maxVal);
    } else {
        const parts = line.split(/\s+/);
        const value = Number(parts[1]);
        myHeap.insert(value)
    }
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {})