import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";
import { Column, UpdateDateColumn } from "typeorm";
import { Type } from "class-transformer";

export class CreateGameDto {
    @ApiProperty({ type: [Number] })
    questions: number[];

    @IsDate()
    @ApiProperty()
    @Type(() => Date)
    updatedDate: Date;

    // @ApiProperty({ type: Number })
    // total_score: number;
}
