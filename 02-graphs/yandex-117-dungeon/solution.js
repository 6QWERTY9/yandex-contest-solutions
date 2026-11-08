function scan(map) {
    const rows = map.length;
    if (rows === 0) return {ceil: 0, floor: 0, both: 0};
    const cols = map[0].length
    
    const result = {ceil: 0, floor: 0, both: 0};
    

    const visited = Array.from({length: rows}, () => new Array(cols).fill(false))

    const DIRECTIONS_4 = [
        [-1,  0], // ВВЕРХ
        [ 1,  0], // ВНИЗ
        [ 0, -1], // ВЛЕВО
        [ 0,  1]  // ВПРАВО
    ];

    

    const dfs = (row, col) => {
        const stack = [[row, col]];
        visited[row][col] = true;

        let touchesCeil = false;
        let touchesFloor = false;

        while (stack.length > 0) {
            const [currentRow, currentCol] = stack.pop();

            if (currentRow == 0) {
                touchesCeil = true;
            } 
            if (currentRow === rows - 1) {
                touchesFloor = true
            }

            for (let i = 0; i < DIRECTIONS_4.length; i++) {
                const nextRow = currentRow + DIRECTIONS_4[i][0];
                const nextCol = currentCol + DIRECTIONS_4[i][1];

                if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
                    if (!visited[nextRow][nextCol] && map[nextRow][nextCol] == 1) {
                        visited[nextRow][nextCol] = true;
                        stack.push([nextRow, nextCol])
                    }
                }
            }
        }

        return {ceil: touchesCeil, floor: touchesFloor}
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!visited[r][c] && map[r][c] == 1) {

                const {ceil, floor}= dfs(r, c);

                if (ceil && floor) {
                    result.both++
                } else if (ceil) {
                    result.ceil++
                } else if (floor) {
                    result.floor++
                }
            }
        }
    }

    return result;
}
const map1 = [
 [0, 0, 0],
 [0, 0, 0]
]


const map2 = [
 [1, 0, 0],
 [1, 0, 1],
 [1, 1, 1]
]

const map3 = [
 [0, 0, 0, 1],
 [0, 0, 1, 0],
 [0, 1, 0, 0],
 [1, 0, 0, 0]
]

console.log("Тест 1:", scan(map1));
console.log("Тест 2:", scan(map2));
console.log("Тест 3:", scan(map3));
module.exports = { scan };