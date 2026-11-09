const solve = require('./solution'); // Путь к вашему файлу с кодом

// ============================================================================
// ТЕСТ 1: Минимальное дерево (Кружка)
// ============================================================================
const good1 = { type: 'good', name: 'Кружка', comments: [], related: [] };
const c1 = { type: 'comment', text: 'Тёплая!', comments: [], parent: good1 };
good1.comments.push(c1);

console.log("--- ЗАПУСК ТЕСТА 1 ---");
console.log(solve(c1));


// ============================================================================
// ТЕСТ 2: Глубокая вложенность (Яблоко и Банан)
// ============================================================================
const a = { type: 'good', name: 'Яблоко', comments: [], related: [] };
const b = { type: 'good', name: 'Банан', comments: [], related: [] };
a.related.push(b);
b.related.push(a);

const r = { type: 'comment', text: 'Сладкий!', comments: [], parent: a };
a.comments.push(r);

const reply = { type: 'comment', text: 'Согласен', comments: [], parent: r };
r.comments.push(reply);

const reply2 = { type: 'comment', text: 'А я нет', comments: [], parent: reply };
reply.comments.push(reply2);

console.log("--- ЗАПУСК ТЕСТА 2 ---");
console.log(solve(reply2));


// ============================================================================
// ТЕСТ 3: Изолированный обход со старта (Хлеб и Молоко)
// ============================================================================
const milk = { type: 'good', name: 'Молоко', comments: [], related: [] };
const bread = { type: 'good', name: 'Хлеб', comments: [], related: [] };
milk.related.push(bread); // Однонаправленная связь: Молоко знает про Хлеб, но не наоборот

const cA = { type: 'comment', text: 'Вкусно', comments: [], parent: milk };
const cB = { type: 'comment', text: 'Арбуз лучше', comments: [], parent: bread };
const cC = { type: 'comment', text: 'Берите!', comments: [], parent: milk };
milk.comments.push(cA, cC);
bread.comments.push(cB);

console.log("--- ЗАПУСК ТЕСТА 3 ---");
console.log(solve(bread));

// node 04-weekly-sprint/yandex-258-put-on-shelves/test.js