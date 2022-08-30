import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Topic } from "../../topic/entities/topic.entity";

export class QuestionCreateDto {
    @ApiProperty()
    @IsString()
    desc: string;

    @ApiProperty()
    @IsInt()
    point: number;

    @ApiProperty()
    @IsInt()
    topicId: number;

    @IsOptional()
    topic: Topic;

    @ApiProperty()
    @IsString()
    answer: string;
}