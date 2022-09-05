import { ApiProperty } from "@nestjs/swagger";

export class TopicDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
