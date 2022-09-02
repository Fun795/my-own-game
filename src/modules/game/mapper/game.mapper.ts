import { Game } from "../entities/game.entity";
import { GameDto, GameFindAllDto } from "../dto";
import { Question } from "../../question/question.entity";
import { CreateGameAnswerQuestionDto } from "../../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";

export function mapGameToGameCreateDto(game: Game): GameDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;

    return createdGameDto;
}

export function mapGameToGameFindAllDto(gameArray: Game[]): GameFindAllDto[] {
    return gameArray.map((elem) => ({
        id: elem.id,
        status: elem.status,
        step: elem.step,
        updatedDate: elem.updatedDate,
        total_score: elem.totalScore
    }));
}

export function mapGameToGameDto(game: Game): GameDto {
    const createdGameDto: GameDto = new GameDto();

    createdGameDto.id = game.id;
    createdGameDto.status = game.status;
    createdGameDto.questions = game.gameAnswerQuestion;
    createdGameDto.step = game.step;
    createdGameDto.totalScore = game.totalScore;

    return createdGameDto;
}
export function mapQuestionToAnswerQuestionDto(questions: Question[], gameId: number): CreateGameAnswerQuestionDto[] {
    const AnswerQuestions: CreateGameAnswerQuestionDto[] = questions.map((question): CreateGameAnswerQuestionDto => {
        return {
            gameId: gameId,
            question: question
        };
    });
    return AnswerQuestions;
}
