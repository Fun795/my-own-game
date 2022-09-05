import { Module } from "@nestjs/common";
import { gameQuestionAnswerController } from "./gameQuestionAnswer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";
import { GameQuestionAnswerService } from "./game-question-answer.service";

@Module({
    imports: [TypeOrmModule.forFeature([GameAnswerQuestion])],
    controllers: [gameQuestionAnswerController],
    providers: [GameQuestionAnswerService],
    exports: [GameQuestionAnswerService]
})
export class GameQuestionAnswerModule {}
