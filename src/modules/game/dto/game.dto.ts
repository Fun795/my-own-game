import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/question.entity";

export class GameDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    questions: Question[];

    @ApiProperty()
    step: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    totalScore: number;
}
