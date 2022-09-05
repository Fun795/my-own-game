import { ApiProperty } from "@nestjs/swagger";
import { GameStatus } from "../enums/statusGameEnum";

export class CreateGameDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    status: GameStatus;
}
