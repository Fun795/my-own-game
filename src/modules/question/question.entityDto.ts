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
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    desc: string;

    @ApiProperty()
    @Column()
    point: number;

    @ApiProperty()
    @Column()
    topic_id: number;

    @ApiProperty()
    @IsString()
    @Column()
    answer: string;
}

export class QuestionIdDto {
    @ApiProperty({ required: false })
    id: number;
}
export class QuestionReplaceDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: false })
    @IsString()
    @Column()
    title: string;

    @ApiProperty({ required: false })
    @Column()
    desc: string;

    @ApiProperty({ required: false })
    @Column()
    point: number;

    @ApiProperty()
    @IsString()
    @Column()
    answer: string;

    @ApiProperty({ required: false })
    @Column()
    topic_id: number;
}
