import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Topic } from "../topic/entities/topic.entity";
import { Type } from "class-transformer";

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

export class CheckQuestionDto {
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

export class QuestionIdDto {
    @ApiProperty({ required: false })
    id: number;
}
export class QuestionReplaceDto {
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
