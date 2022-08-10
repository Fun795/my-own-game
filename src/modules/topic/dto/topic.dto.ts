import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTopicDto } from "./create-topic.dto";

export class TopicDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
