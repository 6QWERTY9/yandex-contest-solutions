function getLastCommonCommitMessage(commits, branches) {
    if (!commits || commits.length === 0) throw new Error('No common commit');

    const [brancheA, brancheB] = branches;

    // множества для хранения id веток
    const historyA = new Set();
    const historyB = new Set();

    // объект где ключ - id коммита, а значение - сам коммит. Нужен он чтобы dfs функции было проще работать по id родителей коммита
    const commitsMap = {};
    for (const commit of commits) {
        commitsMap[commit.id] = commit;
    }

    const dfs = (ids, currentHistory) => {
        /** Итеративный поиск в глубину
            * @param {} ids - текущие id коммита
            * @param {} currentHistory - множество в котором будут хранится id коммитов
        */

        // Создаем стек в котором изначально будет храниться id текущего коммита
        const stack = [...ids];
        
        // Запускаем бесконечный цикл пока длина стека больше 0
        while (stack.length > 0) {
            const id = stack.pop();

            // Если текущий id уже есть в множестве то пропускаем 
            if (currentHistory.has(id)) continue;

            // Иначе ложим текущий id в множество
            currentHistory.add(id);

            // Достаем текущий коммит по его id
            const commit = commitsMap[id];

            // Если есть коммит и у коммита есть родитель то:
            if (commit && commit.parents) {
                // запускаем цикл по его родителям
                for (const parentId of commit.parents) {
                    // добавляем id родителя в наш стек
                    stack.push(parentId)
                }
            }
        }
    }

    
    // переменные для хранения id последних коммитов
    let brancheIdsA = [];
    let brancheIdsB = [];
    
    // С помощью цикла ищем эти id
    for (const commit of commits) {
        if (commit.branches) {
            if (commit.branches.includes(brancheA)) { // Если у коммита в ветка ("branches") есть наша ветка ("brancheA") 
                brancheIdsA.push(commit.id)
            }
    
            if (commit.branches.includes(brancheB)) { // Если у коммита в ветка ("branches") есть наша ветка ("brancheB") 
                brancheIdsB.push(commit.id)
            }
        }
    }
    
    // Запускаем наш поиск в глубину ("dfs") от id последних коммитов для наших веток ("brancheA") и ("brancheB")
    dfs(brancheIdsA, historyA);
    dfs(brancheIdsB, historyB);


    // По пересечениям фильтруем наш исходный массив с коммитами
    const commonCommits = commits.filter((commit) => historyA.has(commit.id) && historyB.has(commit.id));

    // Если длина отфильтрованного массива ("") равна 0, бросаем ошибку
    if (commonCommits.length === 0) throw new Error('No common commit');

    // Иначе сортируем наш массив от большего времени к меньшему 
    const sortCommonCommits = commonCommits.sort((a, b) => b.timestamp - a.timestamp);

    // Достаем коммит с самым большим временем
    const result = sortCommonCommits[0];

    // Возвращаем сообщение если его нет то пустую строку
    return result.message || '';
};


module.exports = {getLastCommonCommitMessage};

// node 04-weekly-sprint/yandex-127-last-common-git-commit/solution.js