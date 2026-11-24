const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const parseCoordinates = (coord) => {
    /** Вспомогательная функция для перевода координат из формата "a1" в формат "[number, number]"
        * @param {string} coord - координаты в формате 'a1'
        * 
        * @returns {number[]}
    */

    // вспомогательная строка. С помощью метода .indexOf() будем доставать индексы + 1
    const cols = "abcdefgh";


    // разделяем букву от цифры
    const [col, row] = [coord[0], coord[1]];

    return [+row, cols.indexOf(col) + 1]
}





let coords = [];


rl.on('line', (input) => {
    const line = input.trim();

    if (line === '') return;

    coords = line.split(/\s+/);
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
});

rl.on('close', () => {
    const [firstKnight, secondKnight] = coords;

    const KNIGHT_MOVES = [
        [-2, -1], [-2,  1], // две клетки вверх, одна влево/вправо
        [-1, -2], [-1,  2], // одна клетка вверх, две влево/вправо
        [ 1, -2], [ 1,  2], // одна клетка вниз, две влево/вправо
        [ 2, -1], [ 2,  1]  // две клетки вниз, одна влево/вправо
    ];


    const bfs = (coord1, coord2) => {

        // Переменные для первого коня
        const queueFirstKnight = [];
        let headFirstKnight = 0;
        const distFirstKnight = Array.from({length: 9}, () => new Array(9).fill(-1))

        // Переменные для второго коня
        const queueSecondKnight = [];
        let headSecondKnight = 0;
        const distSecondKnight = Array.from({length: 9}, () => new Array(9).fill(-1))


        queueFirstKnight.push(coord1);
        distFirstKnight[coord1[0]][coord1[1]] = 0;

        queueSecondKnight.push(coord2);
        distSecondKnight[coord2[0]][coord2[1]] = 0;


        while (headFirstKnight < queueFirstKnight.length) {
            const currentCoordinate = queueFirstKnight[headFirstKnight];
            headFirstKnight++

            const [r, c] = currentCoordinate;

            for (const [dr, dc] of KNIGHT_MOVES) {
                const nextR = r + dr;
                const nextC = c + dc;

                if (nextR >= 1 && nextR <= 8 && nextC >= 1 && nextC <= 8) {
                    if (distFirstKnight[nextR][nextC] === -1) {
                        distFirstKnight[nextR][nextC] = distFirstKnight[r][c] + 1;
                        queueFirstKnight.push([nextR, nextC])
                    }
                }
            }
        }


        while (headSecondKnight < queueSecondKnight.length) {
            const currentCoordinate = queueSecondKnight[headSecondKnight];
            headSecondKnight++

            const [r, c] = currentCoordinate;

            for (const [dr, dc] of KNIGHT_MOVES) {
                const nextR = r + dr;
                const nextC = c + dc;

                if (nextR >= 1 && nextR <= 8 && nextC >= 1 && nextC <= 8) {
                    if (distSecondKnight[nextR][nextC] === -1) {
                        distSecondKnight[nextR][nextC] = distSecondKnight[r][c] + 1;
                        queueSecondKnight.push([nextR, nextC])
                    }
                }
            }
        }


        let res = Infinity;

        for (let row = 1; row < 9; row++) {
            for (let col = 1; col < 9; col++) {
                const d1 = distFirstKnight[row][col];
                const d2 = distSecondKnight[row][col];

                if (d1 !== -1 && d2 !== -1 && d1 % 2 === d2 % 2) {
                    const move = Math.max(d1, d2);

                    if (res > move) res = move;
                }
            }
        }

        if (res === Infinity) res = -1;

        return res;
    }

    const result = bfs(parseCoordinates(firstKnight), parseCoordinates(secondKnight));

    console.log(result);
})