import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class QuestionDto {
    @ApiProperty({ required: false })
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

export class QuestionDtoCreate {
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

export class QuestionDtoId {
    @ApiProperty({ required: false })
    id: number;
}
