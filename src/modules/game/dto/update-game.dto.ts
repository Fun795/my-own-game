import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatedGameDto } from "./created-game.dto";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateGameDto extends PartialType(CreatedGameDto) {
    @ApiProperty({ type: [Number] })
    questions: number[];

    @IsDate()
    @ApiProperty()
    @Type(() => Date)
    updatedDate: Date;
}
