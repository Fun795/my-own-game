import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { TopicModule } from "../topic/topic.module";
import { GameQuestionAnswerModule } from "../gameQuestionsAnswer/gameQuestionAnswer.module";
import { QuestionModule } from "../question/question.module";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), TopicModule, GameQuestionAnswerModule, QuestionModule],
    controllers: [GameController],
    providers: [GameService]
})
export class GameModule {}
