const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const maxHeap = (arr) => {

    const heap = arr;

    const peek = () => heap[0];
    const size = () => heap.length;

    const swap = (i, j) => {
        [heap[i], heap[j]] = [heap[j], heap[i]];
    }

    const shiftUp = (i) => {

        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (heap[i] > heap[parent]) {
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

            if (leftChild < size && heap[leftChild] > heap[largest]) {
                largest = leftChild
            } 

            if (rightChild < size && heap[rightChild] > heap[largest]) {
                largest = rightChild
            }

            if (largest !== i) {
                swap(i, largest); 
                i = largest;
            }  else {
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

        const max = heap[0]; 
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
    lines.push(row);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const [n, T] = lines[0]
    const friends = lines.slice(1).sort((a,b) => a[0] - b[0]);

    const pool = maxHeap([]);
    let currentTalkTime = 0;
    let maxFriends = 0;

    for (let i = 0; i < n; i++) {
        const [x, t] = friends[i];

        pool.insert(t);
        currentTalkTime += t;

        while (pool.size() > 0 && (x + currentTalkTime) > T) {

            const largestTalkTime = pool.extractMax();

            currentTalkTime -= largestTalkTime;
        }

        if (pool.size() > maxFriends) {
            maxFriends = pool.size();
        }
    }

    console.log(maxFriends)
})