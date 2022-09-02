import { Game } from "../entities/game.entity";
import { CreateGameDto, GameDto, GameFindAllDto } from "../dto";
import { Question } from "../../question/question.entity";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

export function mapGameToGameCreateDto(game: Game): CreateGameDto {
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
export function mapQuestionToAnswerQuestionDto(questions: Question[], gameId: number): GameAnswerQuestion[] {
    return questions.map((question) => {
        const gameAnswerQuestion = new GameAnswerQuestion();
        gameAnswerQuestion.gameId = gameId;
        gameAnswerQuestion.question = question;
        return gameAnswerQuestion;
    });
}
