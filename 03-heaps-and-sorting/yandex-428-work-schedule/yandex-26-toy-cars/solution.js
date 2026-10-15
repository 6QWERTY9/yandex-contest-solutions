const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const maxHeap = (arr) => {
    const heap = arr;

    const size = () => heap.length;
    const peek = () => heap[0];
    const swap = (i, j) => {
        [heap[i], heap[j]] = [heap[j], heap[i]];
    }

    const shiftUp = (i) => {
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (heap[i][0] > heap[parent][0]) {
                swap(i, parent);
                i = parent;
            } else {
                break
            }
        }
    }
    const shiftDown = (i, size) => {
        while (true) {
            let largest = i;

            const leftChild = i * 2 + 1;
            const rightChild = i * 2 + 2;

            if (leftChild < size && heap[leftChild][0] > heap[largest][0]) {
                largest = leftChild;
            }
            if (rightChild < size && heap[rightChild][0] > heap[largest][0]) {
                largest = rightChild;
            }

            if (largest !== i) {
                swap(i, largest); 
                i = largest;
            } else {
                break
            }
        }
    }

    const insert = (val) => {
        heap.push(val);
        shiftUp(heap.length - 1);
    }

    const extractMax = () => {

        if (heap.length === 0) return null;

        const max = peek();
        const last = heap.pop();

        if (heap.length > 0) {
            heap[0] = last;
            shiftDown(0, heap.length)
        }

        return max;
    }

    return {peek, size, insert, extractMax}
}

const lines = [];


rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    const row = line.split(/\s+/).map(Number);

    lines.push(...row)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const [n, k, p, ...cars] = lines;


    const nextOccurrence = new Array(p);
    const lastSeen = {};

    for (let i = p - 1; i >= 0; i--) {
        const car = cars[i]; 

        if (lastSeen[car] === undefined) {
            nextOccurrence[i] = Infinity;
        } else {
            nextOccurrence[i] = lastSeen[car];
        }

        lastSeen[car] = i;
    }


    const onFloor = new Set();
    const pool = maxHeap([ ]);
    
    let operations = 0;

    for (let i = 0; i < p; i++) {
        const car = cars[i];

        if (onFloor.has(car)) {
            pool.insert([nextOccurrence[i], car]);
            continue;
        }

        operations++;

        if (onFloor.size < k) {
            onFloor.add(car);
            pool.insert([nextOccurrence[i], car]);
        } else {

            while (true) {
                const [futureIndex, maxCar] = pool.extractMax();

                if (onFloor.has(maxCar)) {
                    onFloor.delete(maxCar);
                    break
                }
            }

            onFloor.add(car);
            pool.insert([nextOccurrence[i], car]);
        }

    }

    console.log(operations);

})