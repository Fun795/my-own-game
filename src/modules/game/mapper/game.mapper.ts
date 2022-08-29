import { Game } from "../entities/game.entity";
import { GameDto, GameFindAllDto, GameFindOneDto } from "../dto";

export function GameMapperCreate(game: Game): GameDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;

    return createdGameDto;
}

export function GameMapperFindAll(gameArray: Game[]): GameFindAllDto[] {
    const GameArrayMapped = [];

    gameArray.forEach((elem) => {
        const findAllGameDto: GameFindAllDto = new GameFindAllDto();
        findAllGameDto.id = elem.id;
        findAllGameDto.status = elem.status;
        findAllGameDto.step = elem.step;
        findAllGameDto.updatedDate = elem.updatedDate;
        findAllGameDto.total_score = elem.total_score;

        GameArrayMapped.push(findAllGameDto);
    });

    return GameArrayMapped;
}

export function GameFindOneMapper(game: Game): GameFindOneDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;
    createdGameDto.questions = game.questions;
    createdGameDto.step = game.step;
    createdGameDto.total_score = game.total_score;

    return createdGameDto;
}
