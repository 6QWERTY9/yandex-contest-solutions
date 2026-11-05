const fs = require('fs');

function solve() {
    
    const buffer = fs.readFileSync(0);
    let offset = 0;

    function readInt() {
        while (offset < buffer.length && buffer[offset] <= 32) {
            offset++;
        }
        if (offset >= buffer.length) return null;
        let res = 0;
        while (offset < buffer.length && buffer[offset] > 32) {
            res = res * 10 + (buffer[offset] - 48);
            offset++;
        }
        return res;
    }

    const n = readInt();
    if (n === null) return;

    const deliveryIds = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
        deliveryIds[i] = readInt();
    }

    
    const parents = new Int32Array(n + 1);
    const childCount = new Int32Array(n + 1);
    const pallets = [];

    for (let i = 1; i <= n; i++) {
        const p = readInt();
        parents[i] = p;
        if (p === 0) {
            pallets.push(i);
        } else {
            childCount[p]++; 
        }
    }

    const k = readInt();
    const missingSet = new Set();
    for (let i = 0; i < k; i++) {
        missingSet.add(readInt());
    }

    
    const head = new Int32Array(n + 2);
    for (let i = 1; i <= n + 1; i++) {
        head[i] = head[i - 1] + childCount[i - 1];
    }

    
    const currentEdgeIdx = new Int32Array(head);
    
    const edges = new Int32Array(n + 1);

    for (let child = 1; child <= n; child++) {
        const p = parents[child];
        if (p !== 0) {
            edges[currentEdgeIdx[p]++] = child; 
        }
    }

    // Массив состояний (0 - не проверен, 1 - ок, 2 - брак)
    const status = new Uint8Array(n + 1);
    const result = [];

    
    const stack = new Int32Array(n + 1);
    
    const nextChildIdx = new Int32Array(n + 1);

    
    const dfs = (palletID) => {
        if (missingSet.has(deliveryIds[palletID])) {
            status[palletID] = 2;
            return false;
        }

        let stackSize = 0;
        stack[stackSize] = palletID;
        nextChildIdx[palletID] = head[palletID];

        let isPalletValid = true;

        while (stackSize >= 0) {
            const current = stack[stackSize];
            const currentEdge = nextChildIdx[current];
            const lastEdgeForCurrent = head[current + 1];

            
            if (currentEdge < lastEdgeForCurrent) {
                const child = edges[currentEdge];
                nextChildIdx[current]++; 

                
                if (missingSet.has(deliveryIds[child]) || status[child] === 2) {
                    status[current] = 2;
                    isPalletValid = false;
                    break;
                }

                if (status[child] === 0) {
                    stackSize++;
                    stack[stackSize] = child;
                    nextChildIdx[child] = head[child]; 
                }
            } else {
                
                status[current] = 1;
                stackSize--; 
            }
        }

        status[palletID] = isPalletValid ? 1 : 2;
        return isPalletValid;
    };

    
    for (let i = 0; i < pallets.length; i++) {
        const palletID = pallets[i];
        if (dfs(palletID)) {
            result.push(palletID);
        }
    }

    
    if (result.length === 0) {
        console.log("0");
    } else {
        console.log(result.length)
        result.sort((a, b) => a - b);
        console.log(result.join(' '));
    }
}

solve();

