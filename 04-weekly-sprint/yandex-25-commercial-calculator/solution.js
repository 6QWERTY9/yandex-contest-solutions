const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const minHeap = (arr) => {
    const heap = arr;

    const size = () => heap.length;

    const swap = (i, j) => {
        /** 
            * эта фукция меня элементы списка местами
        
            * @params {number} i - индекс элемента списка
            * @params {number} j - индекс элемента списка
        */

        [heap[i], heap[j]] = [heap[j], heap[i]]
    }

    const shiftDown = (i, size) => {
        /**
            * Функция для просеивания элемента кучи сверху вниз (Sift Down / Heapify).
            * Восстанавливает основное свойство Min-Heap (родитель должен быть меньше детей).
            * 
            * @param {number} i - Индекс элемента-нарушителя, который нужно опустить вниз.
            * @param {number} size - Текущий рабочий размер кучи (активная граница массива).
        */


        while (true) {
            let smallest = i;

            const leftChild = i * 2+1; // Индекс левого дочернего элемента
            const rightChild = i * 2+2; // Индекс правого дочернего элемента

            if (leftChild < size && heap[leftChild] < heap[smallest]) {
                smallest = leftChild;
            }

            if (rightChild < size && heap[rightChild] < heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest !== i) {
                swap(i, smallest);
                i = smallest;
            } else {
                break
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
            let parent = Math.floor((i - 1) / 2);

            if (heap[i] < heap[parent]) {
                swap(i, parent);
                i = parent;
            } else {
                break;
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

    const extractMin = () => {

        if (heap.length === 0) return null;

        const min = heap[0];
        const last = heap.pop();

        if (heap.length > 0) {
            heap[0] = last;
            shiftDown(0, heap.length)
        }

        return min;
    }

    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        shiftDown(i, heap.length);
    }

    return { insert, extractMin, size };
}


let lines = [];

rl.on('line', (input) => {
    let line = input.trim();

    if (line === '') return;

    const row = line.split(/\s+/).map(Number);
    lines.push(row);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const arr = lines[1]
    
    const heapInstance = minHeap(arr);
    let totalSum = 0;

    while (heapInstance.size() > 1) {

        const a = heapInstance.extractMin();
        const b = heapInstance.extractMin();

        const currentSum = a + b;

        totalSum += currentSum;

        heapInstance.insert(currentSum)
    }

    const result = (totalSum * 0.05).toFixed(2)

    console.log(result)
})