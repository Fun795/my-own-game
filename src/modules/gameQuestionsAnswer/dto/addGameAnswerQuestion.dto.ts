import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsBoolean } from "class-validator";

export class CreateGameAnswerQuestionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    game_id: number;

    @ApiProperty({ type: Number })
    @IsInt()
    question_id: number;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    is_answered: boolean;
}
export class GetGameAnswerQuestionsDto {
    @ApiProperty({ type: Number })
    @IsInt()
    game_id: number;
}
