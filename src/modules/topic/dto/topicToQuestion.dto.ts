import { ApiProperty } from "@nestjs/swagger";

export class TopicToQuestionDto {
    @ApiProperty()
    idQuest: number;

    @ApiProperty()
    idTopic: number;
}