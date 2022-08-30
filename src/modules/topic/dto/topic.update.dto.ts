import { ApiProperty, PartialType } from "@nestjs/swagger";

export class TopicUpdateDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
