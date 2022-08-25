import { ApiProperty } from "@nestjs/swagger";

export class CreatedGameDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    questions: number[];

    @ApiProperty()
    step: number;

    @ApiProperty()
    updatedDate: Date;

    @ApiProperty()
    status: string;

    @ApiProperty()
    total_score: number;
}
