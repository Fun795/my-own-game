import { ApiProperty } from "@nestjs/swagger";

export class GameFindAllDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    updatedDate: Date;

    @ApiProperty()
    step: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    total_score: number;
}