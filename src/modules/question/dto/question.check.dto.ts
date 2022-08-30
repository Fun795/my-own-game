import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class QuestionCheckDto {
    @ApiProperty({ type: Number })
    @Type((value) => Number)
    @IsInt()
    id: number;

    @ApiProperty({ type: Number })
    @Type((value) => Number)
    @IsInt()
    game_id: number;

    @ApiProperty()
    @IsString()
    answer: string;
}
