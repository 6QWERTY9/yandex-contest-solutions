// Шаблон алгоритма поиска в ширину 

const BfsTemplate = (start, graph, target) => {
    /** Шаблон поиска в ширину для работы с графом
        * @param {number} start - Стартовая позиция с которой начнется поиск 
        * @param {number[][]}  graph - Основной граф
        * @param {number} target - Цель которую надо найти в графе
        * 
        * @return {number[] | number}
    */

    // Очередь, тут будут храниться вершины которые надо проверить
    const queue = [];

    // Указатель на первый элемент в очереди
    let head = 0;

    // Массив расстояний, массив размером с количество вершин
    const dist = new Array(graph.length).fill(-1);


    // Инициализация 


    // Добавляем нашу первую вершину (`start`) в очередь (`queue`)
    queue.push(start);
    
    // Помечаем стартовую вершину (`start`) как посещенную в нашем массиве расстояний (`dist`)
    dist[start] = 0;


    // Запускаем основной цикл, он работает до тех пор пока в очереди есть необработанные элементы
    while (head < queue.length) {
        
        // Достаем текущий элемент из очереди (`queue`)
        const curr = queue[head];
        
        // Добавляем к нашему указателю (`head`) + 1, что бы на следующей итерации мы шли дальше по очереди (`queue`)
        head++;

        // Если текущая вершина (`curr`) равна целевой вершине (`target`) то возвращаем результат
        if (target !== undefined && curr === target) return dist[curr];

        // Достаем соседей текущей вершины (`curr`)
        const neighbors = graph[curr] || [];

        // Перебераем соседей
        for (let i = 0; i < neighbors.length; i++) {
            
            // Достаем соседа из (`neighbors`)
            const next = neighbors[i];

            // Проверяем были ли мы уже у соседа
            if (dist[next] === -1) {

                // Добавляем расстояние от текущей вершины (`curr`) до следующий (`next`) + 1
                dist[next] = dist[curr] + 1;

                // Добавляем соседа в нашу очередь (`queue`)
                queue.push(next)
            }
        }
    }

    // возвращаем результат
    return target !== undefined ? -1 : dist;
}