import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class QuestionUpdateDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    desc?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    point?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    answer?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    topicId?: number;
}