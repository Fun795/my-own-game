import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class GetGameAnswerQuestionsByGameIdAndQuestionDto {
    @IsInt()
    @Type((value) => Number)
    @ApiProperty({ type: Number })
    game_id: number;

    @ApiProperty({ type: Number })
    @Type((value) => Number)
    @IsInt()
    question_id: number;
}
