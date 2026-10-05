const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];

const findMaxCostPath = (arr) => {
  const [nums, ...matrix] = arr
  const [n, m] = nums;

   
  const path = [];
  
  
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
          
          if (i === 0 && j === 0) {
              // Твоя 1-я проверка: Самый старт
              dp[i][j] = matrix[i][j];
              
          } else if (i === 0) {
              // Твоя 2-я проверка: Верхняя граница (идти можно только слева)
              dp[i][j] = dp[i][j - 1] + matrix[i][j];
              
          } else if (j === 0) {
              // Твоя 2-я проверка: Левая граница (идти можно только сверху)
              dp[i][j] = dp[i - 1][j] + matrix[i][j];
              
          } else {
              // Твоя 3-я проверка: Внутри таблицы (выбираем максимум!)
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
          }
      }
  }

  const maxSum = dp[n-1][m-1];

  let i = n - 1;
  let j = m - 1;

  
  while (i > 0 || j > 0) {
      if (i === 0) {
          
          path.push('R');
          j--;
      } else if (j === 0) {
          
          path.push('D');
          i--;
      } else {

          if (dp[i - 1][j] > dp[i][j - 1]) {
              path.push('D'); 
              i--;           
          } else {
              path.push('R');
              j--;            
          }
      }
  }

  path.reverse();

  return {
        sum: maxSum,
        route: path.join(' ') // Объединяем буквы в красивую строку через пробел
    };
}

rl.on('line', (input) => {
    const line = input.trim()
    
    if (input === '') {
      rl.close();
      return
    }

    const row = line.split(/\s+/).map(Number)
    lines.push(row)
    /*
    Пример ввода и вывода числа n, где -10^9 < n < 10^9:
    const n = parseInt(input);
    console.log(n);
    */
    
});

rl.on('close', () => {
  const result = findMaxCostPath(lines);

  console.log(result.sum);
  console.log(result.route)
})