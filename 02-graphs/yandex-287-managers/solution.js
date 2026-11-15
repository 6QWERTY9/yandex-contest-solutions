const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
let edges = [];

let countLine = 1;

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    if (countLine === 1) {
        n = +line;
        countLine++
        return
    }

    if (countLine === 2) {
        let currentNum = 0;
        let hasDigit = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === ' ') {
                
                if (hasDigit) {
                    edges.push(currentNum);
                    currentNum = 0;
                    hasDigit = false;
                }
            } else {
                
                currentNum = currentNum * 10 + (char - '0');
                hasDigit = true;
            }
        }

        if (hasDigit) {
            edges.push(currentNum);
        }

        rl.close();
    }


    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
})

rl.on('close', () => {
    
    const graph = Array.from({length: n + 1}, () => []);
    let director = -1;

    for (let i = 0; i < edges.length; i++) {
        const boss = edges[i];
        const employee = i + 1;

        if (boss === 0) {
            director = employee;
        } else {
            graph[boss].push(employee)
        }
    }

    const dfs = (graph, director, n) => {
        const result = new Array(n);

        const stack = [[director, 0]];

        while (stack.length > 0) {
            const [node, depth] = stack.pop();

            result[node - 1] = depth;

            const employees = graph[node] || [];

            for (let i = 0; i < employees.length; i++) {
                const employee = employees[i];

                stack.push([employee, depth + 1]);
            }
        }

        return result;
    }

    const res = dfs(graph,director, n)
    console.log(res.join(' '))
})