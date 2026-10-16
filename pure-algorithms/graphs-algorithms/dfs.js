// dfs - поиск в глубину

// Базовый шаблон кода 

const runDfsTemplate = (N, graph, start) => {
    /**
        * @param {Number} N - размер графа
        * @param {Array {Number}} graph - наш граф (список смежности)
        * @param {start} start - стартовая вершина
    */

    // массив флагов, что бы не ходить по кругу
    const visited = new Array(N + 1).fill(false);

    // основная рекурсивная функция
    const dfs = (v) => {
        /**
            * @param {Number} v - индекс посещенной вершины 
        */

        visited[v] = true; // отмечаем что мы здесь уже были

        // перебираем всех соседей
        const neighbors = graph[v]|| []; // Если соседей нет, берём пустой массив

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            // Если у соседа ещё нет нашего флажка — бежим к нему вглубь!
            if (!visited[neighbor]) {
                dfs(neighbor); // Рекурсивный вызов (бег по нитке дальше)
            }
        }
    }

    dfs(start)
}
