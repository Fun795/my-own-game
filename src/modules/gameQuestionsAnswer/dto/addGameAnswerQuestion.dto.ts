import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsBoolean } from "class-validator";
import { Question } from "../../question/question.entity";

export class CreateGameAnswerQuestionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    gameId: number;

    @ApiProperty({ type: Question })
    question: Question;
}

export class CreateGameAnswerQuestionTestDto {
    @ApiProperty({ type: Number })
    @IsInt()
    gameId: number;

    @ApiProperty({ type: Question })
    question: Question;

    answerIsCorrect: false;
    questionAsked: false;
    userAnswer: "";
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
