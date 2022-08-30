import { ApiProperty, PartialType } from "@nestjs/swagger";
import { TopicCreateDto } from "./topic.create.dto";

export class TopicUpdateDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
