import { ApiProperty } from "@nestjs/swagger";

export class GameFindOneDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    questions: number[];

    @ApiProperty()
    step: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    total_score: number;
}