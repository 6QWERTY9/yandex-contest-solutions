const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const findRoomArea = (size, start, matrix) => {
    /** * Основная функция для поиска площади
        * 
        * @param {number} size - размер матрицы (по условию задачи матрича квадратная)
        * @param {number[]} start - стартовые координаты
        * @param {string[][]} matrix - матрица с лабиринтом 
        *
        * @returns {number} - возвращает итоговую площадь 
    */

    const inBound = (r, c) => {
        /** * Вспомогательная функция для проверки границ матрицы
            * 
            * @param {number} r - Индекс строки
            * @param {number} c - Индекс столбца
            * 
            * @returns {boolean} - Возвращает булево значение
        */
        return r >= 0 && r < size && c >= 0 && c < size
    }

    // список с направлениями куда мы можем ходить
    const directions = [
        [-1, 0], // вверх
        [1,  0], // вниз
        [0, -1], // влево
        [0,  1]  // вправо
    ]

    // список посещений для отслеживания наших ходов
    const visited = Array.from({length: size}, () => new Array(size).fill(false));

    // счетчик площади
    let roomArea = 0;

    const dfs = (r, c) => {
        /** * Вложенный DFS (алгоритм поиска в глубину) для обхода сетки
            * 
            * @param {number} r - текущая строка
            * @param {number} c - текущий столбец
            * 
            * @returns {void}
        */

        // Если мы вышли за границы матрицы то выходим
        if (!inBound(r,c)) return;

        // Если на текущих координатах стена '*' или мы тут уже были, то выходим 
        if (matrix[r][c] === '*' || visited[r][c]) return;

        // Если проверки выше были пройдены то это значит что клетка пустая '.'

        // отмечаем текущую клетку как посещенную 
        visited[r][c] = true;

        // И прибавлаем к нашему счетчику площади 1
        roomArea++;

        // Запускаем рекурсивный проход по соседям, для этого циклом проходим по нашей переменной направлений 
        for (let i = 0; i < directions.length; i++) {

            // достаем наши следующие координаты
            const [dr, dc] = directions[i];

            const nextRow = r + dr;
            const nextCol = c + dc;

            // запускаем рекурсию
            dfs(nextRow, nextCol);
        }
    }


    // достаем наше стартовые координаты
    const [startRow, startCol] = start;

    // и по ним запускаем наш поиск в глубину
    dfs(startRow, startCol)

    return roomArea;
}

let n = 0;
let matrix = [];
let startLine = '';
rl.on('line', (input) => {
    let line = input.trim();

    if (line === '') return;

    if (n === 0) {
        n = parseInt(line);
        return;
    } 

    if (matrix.length < n) {
        matrix.push(line);
        return;
    }

    if (!startLine) {
        startLine = line;
    }

    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on("close", () => {
    const start = startLine.split(/\s+/).map(Number).map(x => x - 1)
    const result = findRoomArea(n, start, matrix);

    console.log(result)
})