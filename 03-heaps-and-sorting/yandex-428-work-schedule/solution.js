const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const minHeap = (arr) => {
    /**
        * @param {number} arr - массив данных
    */
    const heap = arr;

    const size = () => heap.length

    const swap = (i, j) => {
        /**
            * Функция меняет элементы с индексом i и j друг с другом
            * @param {number} i - индекс элемента массива
            * @param {number} j - индекс элемента массива
        */
        [heap[i], heap[j]] = [heap[j], heap[i]];
    }

    const peak = () => heap[0]

    const shiftUp = (i) => {

        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (heap[i] < heap[parent]) {
                swap(i, parent);
                i = parent;
            } else {
                break
            }
        }
    }

    const shiftDown = (i, size) => {
        

        while  (true) {
            let smallest = i;

            let leftChild = i * 2 + 1;
            let rightChild = i * 2 + 2;

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
                break;
            }
        }
    }

    const insert = (val) => {
        heap.push(val);
        shiftUp(heap.length - 1);
    }

    const extractMin = () => {

        if (heap.length === 0) return null;

        const min = heap[0];
        const last = heap.pop();

        if (heap.length > 0) {
            heap[0] = last;
            shiftDown(0, heap.length);
        }

        return min
    }

    return {extractMin, insert, peak, size}
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
    const n = lines[0][0]

    const tasks =  lines.slice(1).sort((a, b) => a[0] - b[0]);

    const savedTasks = minHeap([]);

    let totalStressSum = 0;

    for (let i = 0; i < n; i++) {
        const [deadline, stress] = tasks[i];

        totalStressSum += stress;

        savedTasks.insert(stress);

        if (savedTasks.size() > deadline) {
            savedTasks.extractMin();
        }
    }

    let savedStressSum = 0;

    while (savedTasks.size() > 0) {
        savedStressSum += savedTasks.extractMin();
    }

    const result = totalStressSum - savedStressSum;

    console.log(result)

})