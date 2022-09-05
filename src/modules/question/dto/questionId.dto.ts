import { ApiProperty } from "@nestjs/swagger";

export class QuestionIdDto {
    @ApiProperty({ required: false })
    id: number;
}