const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/**
    * Находит кратчайшую последовательность преобразований от начального
    * четырёхзначного числа к целевому с помощью поиска в ширину (BFS).
    *
    * @param {number} num1 Начальное четырёхзначное число (без нулей).
    * @param {number} num2 Целевое четырёхзначное число (без нулей).
    * @returns {number[]} Массив чисел, представляющий минимальный путь от num1 до num2.
*/
const findMinSequence = (num1, num2) => {

    const queue = []; // очередь
    let head = 0; // указатель 
    const parent = new Int32Array(10000).fill(-1); // массив предков
    const result = []; // итоговый массив


    // инициализация
    queue.push(num1);
    parent[num1] = 0;

    // Основной цикл
    while (head < queue.length) {
        // Достаем текущее значение из очереди
        const curr = queue[head];
        head++;

        // точка выхода из цикла, как только мы получили второе число то переходим к восстановлению пути
        if (curr === num2) break;

        // Применяем 4 правила
        const nextNumbers = []; // в нем мы будем хранить числа к которым применили наши 4 правила

        const strCurr = String(curr); // приводим число к строке
        const firstStrNum = strCurr[0]; // первая цифра
        const lastStrNum = strCurr[3]; // последняя цифра
        const sliceToEnd = strCurr.slice(0, 3); // срез от начало до предпоследней цифры
        const sliceToStart = strCurr.slice(1); // срез от второй до последней цифры

        if (+firstStrNum < 9) { // Первое правило, если первая цифра меньше 9
            const first = String(+firstStrNum + 1); // то прибавляем 1

            nextNumbers.push(Number(first + sliceToStart)) // соединяем в одну строку и приводим к числу, кладем в наш массив `nextNumbers`
        }
        
        if (+lastStrNum > 1) { // Второе правило, если последняя цифра больше 1
            const last = String(+lastStrNum - 1); // то уменьшаем ее на 1
            nextNumbers.push(Number(sliceToEnd + last)); // соединяем в одну строку и приводим к числу, кладем в наш массив `nextNumbers`
        }

        const shiftToRight = lastStrNum + sliceToEnd; // Третье правило, сдвиг вправо
        nextNumbers.push(Number(shiftToRight)); // кладем в наш массив `nextNumbers`

        const shiftToLeft = sliceToStart + firstStrNum; // Четвертое правило, сдвиг влево
        nextNumbers.push(Number(shiftToLeft)); // кладем в наш массив `nextNumbers`


        // Проходим по каждому соседу
        for (let i = 0; i < nextNumbers.length; i++) {
            const nextNum = nextNumbers[i]; // приобразованное число по правилам

            if (parent[nextNum] === -1) { // если в массиве предков под индексом `nextNum` хранится -1 то тут мы еще не были
                parent[nextNum] = curr; // запоминаем родителя, из которого пришли
                queue.push(nextNum) // добавляем `nextNum` в очередь
            }
        }
    }


    // Восстанавливаем минимальный путь

    let curr = num2; // Заводим переменную `curr`, идет от конца в начало

    while (curr !== 0) { 
        result.push(curr); // Кладем текущее число `curr` в наш итоговый список `result`

        curr = parent[curr]; // Идем на шаг назад
    }

    return result.reverse(); // Разворачиваем наш итоговый список и возвращаем его
}

const strNums = [];

rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    strNums.push(line);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const [num1, num2] = strNums.map(Number);

    const res = findMinSequence(num1, num2);

    console.log(res.join('\n'));
})