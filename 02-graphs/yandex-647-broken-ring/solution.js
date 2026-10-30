function calculateAnswer(n, a, b) {
    // your code

    const visited = new Array(n).fill(false);

    let cycleCount = 0;
    let totalCost = 0;

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            cycleCount++;

            let current = i;
            let minCycleCost = b[i];

            while (!visited[current]) {
                visited[current] = true;

                if (b[current] < minCycleCost) {
                    minCycleCost = b[current]
                }

                current = a[current] - 1;
            }

            totalCost += minCycleCost;
        }
    }

    if (cycleCount === 1) {
        return 0;
    }

    return totalCost
}