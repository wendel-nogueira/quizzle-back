
import { Request, Response, NextFunction } from 'express';
import { GameService } from './game.service';


export class GameController {
    async countGames(req: Request, res: Response, next: NextFunction) {
        const gameService = new GameService();
        const games = await gameService.countGames();

        return res.status(200).json(games);
    }

    async countFailsByTheme(req: Request, res: Response, next: NextFunction) {
        const gameService = new GameService();
        const games = await gameService.countFailsByTheme();

        return res.status(200).json(games);
    }

    async countHitsByTheme(req: Request, res: Response, next: NextFunction) {
        const gameService = new GameService();
        const games = await gameService.countHitsByTheme();

        return res.status(200).json(games);
    }

    async countHighestScore(req: Request, res: Response, next: NextFunction) {
        const gameService = new GameService();
        const games = await gameService.countHighestScore();

        return res.status(200).json(games);
    }

    async recentGames(req: Request, res: Response, next: NextFunction) {
        const gameService = new GameService();
        const games = await gameService.recentGames();

        return res.status(200).json(games);
    }
}