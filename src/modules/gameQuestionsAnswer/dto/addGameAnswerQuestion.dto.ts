import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Question } from "../../question/question.entity";

export class CreateGameAnswerQuestionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    gameId: number;

    @ApiProperty({ type: Question })
    question: Question;
}

export class GetGameAnswerQuestionsDto {
    @ApiProperty({ type: Number })
    @IsInt()
    gameId: number;
}
export class ResultAnswerDto {
    isCorrect: boolean;
    question: Question;
}
