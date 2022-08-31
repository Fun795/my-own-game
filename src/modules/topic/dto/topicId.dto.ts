import { ApiProperty } from "@nestjs/swagger";

export class TopicIdDto {
    @ApiProperty()
    id: number;
}