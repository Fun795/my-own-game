import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Max, Min } from "class-validator";
import { Topic } from "../topic/entities/topic.entity";

export class QuestionDto {
    @ApiProperty({ type: Number })
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    desc: string;

    @ApiProperty()
    @Column()
    point: number;
}

export class QuestionCreateDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    desc: string;

    @ApiProperty()
    @IsInt()
    point: number;

    @ApiProperty()
    @IsInt()
    topic_id: number;

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

    @ApiProperty({ required: false })
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsString()
    desc: string;

    @ApiProperty({ required: false })
    @IsInt()
    point: number;

    @ApiProperty()
    @IsString()
    answer: string;

    @ApiProperty({ required: false })
    @IsInt()
    topic_id: number;
}
