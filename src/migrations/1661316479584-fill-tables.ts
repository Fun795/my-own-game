import { MigrationInterface, QueryRunner } from "typeorm";

export class fillTables1661316479584 implements MigrationInterface {
    name = "fillTables1661316479584";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "topic"("id", "name") VALUES (1, 'случайная тема');
            INSERT INTO "topic"("id", "name") VALUES (2, 'История');
            INSERT INTO "topic"("id", "name") VALUES (3, 'Биология');
            INSERT INTO "topic"("id", "name") VALUES (4, 'Животные');
            INSERT INTO "topic"("id", "name") VALUES (5, 'Программирование');
            
            
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Млекопитающее, которое откладывает яйца', 500, 4, 'утконос');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Столько пар рёбер у человека', 200, 3, '12');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Мужской орган размножения у цветков', 300, 3, 'тычинка');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Гормон радости', 400, 3, 'дофамин');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('У какого животного цвет жира зеленый?', 300, 4, 'крокодил');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Эта птица летает задом наперед', 200, 4, 'калибри');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Он напал на россию в 1812 году', 400, 2, 'наполеон');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('год начало второй мировой войны', 300, 2, '1939');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('сколько node.js программистов нужно, чтобы вкрутить лампочку?', 500, 5, 'пять');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('сколько node.js программистов нужно, чтобы вкрутить лампочку?', 100, 5, 'один');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('сколько node.js программистов нужно, чтобы вкрутить лампочку?', 200, 5, 'два');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('сколько node.js программистов нужно, чтобы вкрутить лампочку?', 300, 5, 'три');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('сколько node.js программистов нужно, чтобы вкрутить лампочку?', 400, 5, 'четыре');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Самые тонкие сосуды человека', 100, 3, 'капиляры');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('К какой группе растений относится сосна?', 500, 3, 'покрытосемянные');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Броня из колец?', 100, 2, 'кольчуга');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Броня из железных плит?', 200, 2, 'латы');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Он произнес фразу  И ТЫ БРУТ', 500, 2, 'цезарь');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Это животное самый близкий родственник мамонтов', 400, 4, 'слон');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Какая порода у пса полицейского в сериале ''комиссар Рекс''?', 100, 4, 'овчарка');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Солнце относится к этому типу небесных тел', 100, 1, 'звезда');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('В этой игре надо забить мяч в кольцо', 200, 1, 'баскетбол');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('В этой части автомобиля находятся лошади', 300, 1, 'двигатель');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Флаг этой страны представляет проямоугольник с цветамными полосками сверху вниз - белый-синий-красный', 400, 1, 'россия');
            INSERT INTO "question"("desc", "point", "topic_id", "answer") VALUES ('Музыкальная группа из германии солистом которой является Тиль Линдеман', 500, 1, 'rammstein');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
