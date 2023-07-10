import { RankingRepository } from './repository/ranking.repository';


export class RankingService {
    rankingRepository: RankingRepository;

    constructor() {
        this.rankingRepository = new RankingRepository();
    }

    async findByTheme(tema: string): Promise<any> {
        return await this.rankingRepository.findByTheme(tema);
    }

    async findGlobalRanking(): Promise<any> {
        return await this.rankingRepository.findGlobalRanking();
    }

    async create(tema: string): Promise<void> {
        await this.rankingRepository.create(tema);
    }
}