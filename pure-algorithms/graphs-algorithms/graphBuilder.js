// шаблоны для построения графов
/** * КРАТКАЯ ШПАРГАЛКА ПО ТИПАМ ГРАФОВ:
    * 
    * 1. Ориентированный граф (isOriented = true):
    *    - Дороги с ОДНОСТОРОННИМ движением (стрелочки).
    *    - Связь A -> B не означает наличие пути обратно.
    *    - В коде делаем только один пуш: graph[from].push(to).
    * 
    * 2. Неориентированный граф (isOriented = false):
    *    - Дороги с ДВУСТОРОННИМ движением (обычные линии).
    *    - Связь всегда взаимна: если можно из A в B, то можно и из B в A.
    *    - В коде дублируем пуш в обе стороны: graph[from].push(to) И graph[to].push(from).
*/

const buildStringGraph = (vertices, edges, isOriented = true) => {
    /** Шаблон для ТЕКСТОВЫХ вершин (через ОБЪЕКТ)
        * используется когда вершины - это строки
        * 
        * @param {string[]} vertices - список всех уникальных вершин
        * @param {string[][]} edges - массив ребер, где каждыя пара это [откуда, куда]
        * @param {boolean} isOriented - флаг: ориентированный граф или нет
        * @returns {Object.<string, string[]>} - готовый список смежности графа
    */

    // наш граф смежности
    const graph = {}

    // инициализируем пустые списки для каждой нашей верешины из списка (`vertices`)
    for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        graph[vertex] = [];
    }

    // заполняем связи из списка [`edges`]
    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];

        // добавляем прямую связь 
        graph[from].push(to);

        // Если граф НЕориентированный, добавляем обратную связь
        if (!isOriented) {
            graph[to].push(from);
        }
    }

    return graph;
}

const buildNumberGraph = (n, edges, isOriented = false) => {
    /** шаблон для ЧИСЛОВЫХ вершин (через вложенный массив)
        * используются кода вершины - пронумерованны от 1 до N
        * 
        * @param {number} n - количество вершин
        * @param {number[][]} edges - массив пар чисел [[1, 2], [2, 3]]
        * @param {boolean} isOriented - ориентированный граф или нет
        * @returns {number[][]} - список смежности
    */

    // Создаем массив массивов размером (n + 1), чтобы индексы совпадали с номерами от 1 до N
    const graph = Array.from({length: n + 1}, () => []);

    // заполняем связи из списка [`edges`]
    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i]

        // Добавляем прямую связь
        graph[from].push(to);
        
        // Если граф НЕОРИентированный, добавляем обратную связь
        if (!isOriented) {
            graph[to].push(from);
        }
    }

    return graph;
}