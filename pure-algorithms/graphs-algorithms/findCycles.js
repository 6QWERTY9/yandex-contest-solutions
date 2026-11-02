const findCycleAndMinCost = (n, a, b) => {
    /** Шаблон: поиск циклов в ориентированном графе
        * 
        * @param {number} n - количество вершин
        * @param {number[]} a - массив переходов
        * @param {number[]} b - массив стоимостей вершин
        * @returns {{cycleCount: number, totalCost: number}} - количество циклов и их цена 
    */

    // массив посещений
    const visited = new Array(n).fill(false);

    let cycleCount = 0; // счетчик кругов (циклов) в графе
    let totalCost  = 0; // общая сумма минимальных штрафов

    // цикл для прохода по вершинам
    for (let i = 0; i < n; i++) {

        // если в этой вершине мы еще не были то 
        if (!visited[i]) {
            cycleCount++; // нашли круг

            let current = i; 
            let minCycleCost = b[current]; // цена первой вершины

            // Идем по нашим стрелкам пока не дойдем до посещенной вершины
            while (!visited[current]) {
                visited[current] = true; // отмечаем текущую вершину как пройденную

                // Если цена текущей вершины меньше нашего минимума — обновляем
                if (b[current] < minCycleCost) {
                    minCycleCost = b[current];
                }

                // Шагаем дальше по стрелке
                current = a[current] - 1;
            }

            // Накопив данные по кругу, добавляем его самый дешёвый ценник к ответу
            totalCost += minCycleCost;
        }
    }

    return {cycleCount, totalCost}
}

const findCycles = (n, graph) => {
    /** Шаблон функции для поиска, подсчета, вывода вершин цикла в неориентированном графе.
        * @param {number} n - Количество вершин.
        * @param {number[][]} graph - граф с которым будет работать функции.
        * 
        * @returns {hasCycle: {string}, countCycles: {number}, cylcleVertices: {number[]}}
    */

    
    const visited = new Array(n + 1).fill(false); // Массив посещений.

    
    let hasCycle = 'NO'; // Наш флаг-индикатор если в графе есть цикл - YES, иначе NO.
    let cylcleVertices = []; // Массив для хранения вершин цикла.
    const path = []; // Массив для хранения текущего маршрута.

    
    const dfs = (currentVertex, parentVertex) => {
        /** Рекурсивная функция поиска в глубину.
            * @param {number} currentVertex - Текущая вершина.
            * @param {number} parentVertex - Вершина родителя, то есть та из которой мы попали в текущию (`currentVertex`).
            * 
            * @returns {boolean} 
        */


        visited[currentVertex] = true; // Отмечаем текущию вершину (`currentVertex`) как посещеную.
        path.push(currentVertex); // Добавляем текущию вершину в наш маршрут.

        const neighbors = graph[currentVertex] || []; // Достаем соседий из нашего графа.


        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i]; // Достаем одного соседа.

            // Защита от шага назад. Если сосед равен родителю то мы уже посещали эту вершину поэтому продолжаем наш цикл
            if (neighbor === parentVertex) {
                continue
            }

            // Если мы еще не посещали соседа.
            if (!visited[neighbor]) {
                // Запускаем рекурсию если она вернут (`true`) значит где то глубоко мы нашли цикл.
                if (dfs(neighbor, currentVertex)) {
                    return true; // Возвращаем true.
                }
            } else { // Иначе, мы обнаружили цикл. Из-за первого условие `Защита от шага назад`, мы знаем что это точно не родитель.
                hasCycle = 'YES'; // Меняем наш флаг-индикатор на `YES`.

                
                const startIndex = path.indexOf(neighbor); // Находим, где в нашем пути началась эта вершина (`сосед`).

                
                if (startIndex !== -1) {
                    cylcleVertices.push(...path.slice(startIndex)); // Отрезаем всё от неё и до конца
                }

                
                return true; // Возвращаем НАВЕРХ: что цикл найден
            }
        }

        // Если мы перебла всех соседей текущей вершины и так и не нашли цикл то:
        path.pop(); // Убираем ее из нашего массива маршрута.
        return false; // Сообщаем предыдущей вершины что цикла здесь нет.
    }

    // Глобальный запуск
    for (let i = 1; i <= n; i++) {
        if (!visited[i]) { // Только для не посещеных вершин
            if (dfs(i, -1)) {
                break; // если нашли цикл то перываем цикл
            }
        }
    }

    // Счетчик вершин цикла в графе
    const countCycles = cylcleVertices.length;
    
    return {hasCycle, cylcleVertices, countCycles}
}