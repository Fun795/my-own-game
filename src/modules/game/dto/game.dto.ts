import { ApiProperty } from "@nestjs/swagger";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

export class GameDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    questions: GameAnswerQuestion[];

    @ApiProperty()
    step: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    totalScore: number;
}
