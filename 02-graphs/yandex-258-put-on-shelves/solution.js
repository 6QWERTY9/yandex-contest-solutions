/**
 * @param {Good|Comment} data - ссылка на товар, отзыв или ответ на отзыв,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
module.exports = function (data) {

    // хранилище для уникальных объектов графа
    const visited = new Set();


    const isdataType = (node) => {
        /** Вспомогательная функция определения типа объекта
            * @param {object|null} node - текущий объект
            * @returns {boolean}
        */
        return node && 'name' in node; // Если node существует и в нем есть name вернет true(товар) иначе false(отзыв)
    }

    
    const dfs = (node) => {
        /** Рекурсивный обход в глубину
            * @param {object|null} node - текущий узел
            * @returns {void}
        */

        // точка выхода из рекурсии
        if (!node || visited.has(node)) return;

        // помечаем тукущий узел как посещенный 
        visited.add(node);

        // Если это товар иначе это отзыв
        if (isdataType(node)) {
            if (node.comments) node.comments.forEach(dfs); // Рекурсивно идем вглубь коментариев comment[]
            if (node.related) node.related.forEach(dfs); // Рекурсивно идем вглубь похожих товаров good[]
        } else {
            if (node.parent) dfs(node.parent); // Рекурсивно поднимаемся к родителю
            if (node.comments) node.comments.forEach(dfs); // Рекурсивно идем вглубь коментариев comment[]
        }
    }

    // запускаем сбор
    dfs(data);

    // функция для сортировки строк по алфавиту
    const alphabetSort = (a, b) => a.localeCompare(b);

    const buildReviews = () => {
        /** Функция для генирации блока с отзывами
            * @returns {string}
        */
        
        // переменная для хранения результата
        const lines = [];

        // переменная для хранения корневых комментариев
        const rootComments = [];

        // Фильтруем и добавляем только корневые отзывы
        for (const item of visited) {
            // Если это отзыв и если у отзыва есть родитель и если родитель это товар:
            if  (!isdataType(item) &&  item.parent && isdataType(item.parent)) {
                // То добавляем в массив с корневыми отзывами
                rootComments.push(item);
            }
        }

        // Сортируем корневые отзывы по алфавиту
        rootComments.sort((a,b) => alphabetSort(a.text, b.text));


        const formateCommentTree = (comment, depth) => {
            /** Функция для рекурсивного обхода по ответам на отзыв для построения отступов
                * @param {object} comment - текущий ответ на отзыв
                * @param {number} depth - глубина отступа
                * @returns {void}
            */
            
            // Если ответа нет или длина ответа равна 0 то выходим из рекурсии
            if (!comment.comments || comment.comments.length === 0) return;

            //  Копируем и сортируем вложенные ответы по алфавиту
            const sortedChildren = [...comment.comments].sort((a, b) => alphabetSort(a.text, b.text));

            // Обходим все вложенные ответы и добавлем к ним отступы
            for (const child of sortedChildren) {
                const indent = '  '.repeat(depth);
                lines.push(`${indent}- ${child.text}`);
                formateCommentTree(child, depth + 1);
            }
        }


        // Формируем строки для главных отзывов
        for (const comment of rootComments) {
            lines.push(`- ${comment.text} - про ${comment.parent.name}`);
            formateCommentTree(comment, 1);
        }

        return lines.join('\n');
    }


    const buildGoods = () => {
        /** Функция для генирации блока с отзывами
            * @returns {string}
        */
        
        // переменная для хранения результата
        const lines = [];
        // переменная для хранения товаров
        const goods = [];

        // Фильтруем товары из собранной коллекции
        for (const good of visited) {
            if (isdataType(good)) {
                goods.push(good);
            }
        }

        // Сортируем по названию
        goods.sort((a,b) => alphabetSort(a.name, b.name));

        // Собираем и форматируем под формат MarkDown
        for (const good of goods) {
            lines.push(`- ${good.name}`);

            // Если у товара есть похожее и длина массив с похожеми товарами больше 0 то:
            if (good.related && good.related.length > 0) {
                // Копируем и сортируем по алфавиту
                const sortedRelated = [...good.related].sort((a, b) => alphabetSort(a.name, b.name));

                // добавляем в наш результат 
                for (const rel of sortedRelated) {
                    lines.push(`  * ${rel.name}`)
                }
            }
        }

        return lines.join('\n')
    }

    return [
        '## Отзывы',
        '',
        buildReviews(),
        '',
        '## Товары',
        '',
        buildGoods()
    ].join('\n').trim() + '\n'
};



