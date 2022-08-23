import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateGameDto } from "./create-game.dto";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @ApiProperty({ type: [Number] })
    questions: number[];

    @IsDate()
    @ApiProperty()
    @Type(() => Date)
    updatedDate: Date;
}
