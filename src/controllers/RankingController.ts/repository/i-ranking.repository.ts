import { Ranking } from '../entities/ranking.entity';


export interface IRankingRepository {
    findByTheme(tema: string): Promise<Ranking>;
    findGlobalRanking(): Promise<Ranking>;
    create(tema: string): Promise<void>;
}