import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";

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



    // @ApiProperty({ type: Number })
    // id: number;
    //
    // @ApiProperty({ type: [Number] })
    // questions: number[];
    //
    // @ApiProperty({ type: Number })
    // step: number;
    //
    // @ApiProperty({ type: String })
    // status: string;
    //
    // @IsDate()
    // @ApiProperty()
    // @Type(() => Date)
    // updatedDate: Date;
    //
    // @ApiProperty({ type: Number })
    // total_score: number;
    // // @ApiProperty({ type: Number })
    // // total_score: number;
}
