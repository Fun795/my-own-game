import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class QuestionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    id: number;

    @ApiProperty()
    desc: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    @IsString()
    answer: string;
}
