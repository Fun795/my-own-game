import { Game } from "../entities/game.entity";
import { GameDto, GameFindAllDto } from "../dto";

export function mapGameToGameCreateDto(game: Game): GameDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;

    return createdGameDto;
}

export function mapGameToGameFindAllDto(gameArray: Game[]): GameFindAllDto[] {
    return gameArray.map((elem: GameFindAllDto) => ({
        id: elem.id,
        status: elem.status,
        step: elem.step,
        updatedDate: elem.updatedDate,
        total_score: elem.total_score
    }));
}

export function mapGameToGameDto(game: Game): GameDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;
    createdGameDto.questions = game.questions;
    createdGameDto.step = game.step;
    createdGameDto.total_score = game.total_score;

    return createdGameDto;
}
