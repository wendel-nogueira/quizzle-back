import { Request, Response, NextFunction } from 'express';
import { RankingService } from './ranking.service';


export class RankingController {
    async findByTheme(req: Request, res: Response, next: NextFunction) {
        const rankingService = new RankingService();
        const { tema } = req.params;
        const ranking = await rankingService.findByTheme(tema);

        return res.status(200).json(ranking);
    }

    async findGlobalRanking(req: Request, res: Response, next: NextFunction) {
        const rankingService = new RankingService();
        const ranking = await rankingService.findGlobalRanking();

        return res.status(200).json(ranking);
    }
}