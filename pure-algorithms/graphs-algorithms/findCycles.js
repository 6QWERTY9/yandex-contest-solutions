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
