import { ApiProperty } from "@nestjs/swagger";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { GameStatus } from "../enums/statusGameEnum";

export class GameDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    questions: GameAnswerQuestion[];

    @ApiProperty()
    step: number;

    @ApiProperty()
    status: GameStatus;

    @ApiProperty()
    totalScore: number;
}
