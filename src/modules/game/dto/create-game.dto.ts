import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateGameDto {
    @ApiProperty({ type: [Number] })
    questions: number[];

    @ApiProperty({ type: Boolean, default: 0 })
    status: boolean;
}
