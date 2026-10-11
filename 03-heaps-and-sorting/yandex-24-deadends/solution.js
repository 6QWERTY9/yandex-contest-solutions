const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const minHeap = (arr, index) => {
    const heap = arr;

    const getVal = (i) => {
        /**
            * Вспомогательная функция которая определяет является ли массив вложенным

            * @param {number} i - Индекс элемента (узла) в массиве кучи (от 0 до heap.length - 1).
        */

        // Если был передан index, значит элемент кучи — это массив, и мы берем значение по этому индексу
        if (index !== undefined) {
            return heap[i][index]
        }

        return heap[i];
    }

    
    const size = () => heap.length;

    const swap = (i, j) => {
        /** 
            * эта фукция меня элементы списка местами
        
            * @params {number} i - индекс элемента списка
            * @params {number} j - индекс элемента списка
        */

        [heap[i], heap[j]] = [heap[j], heap[i]]
    }

    const shiftUp = (i) => {
        /**
            * Функция для просеивания элемента кучи снизу вверх
            * 
            * @param {number} i - индекс последнего элемента кучи
        */

        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (getVal(i) < getVal(parent)) {
                swap(i, parent);
                i = parent
            } else {
                break
            }
        }
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

            let leftChild = i * 2 + 1;
            let rightChild = i * 2 + 2;

            if (leftChild < size && getVal(leftChild) < getVal(smallest)) {
                smallest = leftChild;
            }

            if (rightChild < size && getVal(rightChild) < getVal(smallest)) {
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

    const insert = (val) => {
        /**
            * Функция для добавления элемента в нашу кучу
            * 
            * @param {number} val - элемент который надо добавить в нашу кучу
        */
        
        heap.push(val); 
        shiftUp(heap.length - 1)
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

    const peek = () => heap[0];


    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        shiftDown(i, heap.length);
    }

    return { insert, extractMin, size, peek };

}

const lines = [];

rl.on('line', (input) => {
    const line = input.trim();

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
    const [k,n] = lines[0]; 

    const trains = lines.slice(1);
    const deadends = Array.from({length: k}, (_, i) => i + 1);

    const freeHeap = minHeap(deadends);
    const activeHeap = minHeap([], 0);

    const result = [];

    for (let i = 0; i < n; i++) {
        const [arrivalTime, departureTime] = trains[i];

        while (activeHeap.size() > 0 && activeHeap.peek()[0] < arrivalTime) {
            const [releasedDepTime, trackNum] = activeHeap.extractMin();
            freeHeap.insert(trackNum);
        }

        if (freeHeap.size() === 0) {
            console.log(`0 ${i + 1}`); 
            return; 
        }

        const assignedTrack = freeHeap.extractMin();

        result.push(assignedTrack);
        activeHeap.insert([departureTime, assignedTrack]);
    }

    console.log(result.join('\n'));
})