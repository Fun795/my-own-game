import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TopicCreateDto {
    @ApiProperty()
    @IsString()
    name: string;
}
