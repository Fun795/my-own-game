import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class sendAnswerRequest {
    dto: QuestionCheckDto;
    metadata;
}

export class QuestionCheckDto {
    @ApiProperty({ type: Number })
    @Type((value) => Number)
    @IsInt()
    questionId: number;

    @ApiProperty({ type: Number })
    @Type((value) => Number)
    @IsInt()
    gameId: number;

    @ApiProperty()
    @IsString()
    answer: string;
}
