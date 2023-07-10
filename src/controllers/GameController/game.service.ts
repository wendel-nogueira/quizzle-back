import { GameRepository } from './repository/game.repository';


export class GameService {
    gameRepository: GameRepository;

    constructor() {
        this.gameRepository = new GameRepository();
    }

    async countGames(): Promise<any> {
        return await this.gameRepository.countGames();
    }

    async countFailsByTheme(): Promise<any> {
        return await this.gameRepository.countFailsByTheme();
    }

    async countHitsByTheme(): Promise<any> {
        return await this.gameRepository.countHitsByTheme();
    }

    async countHighestScore(): Promise<any> {
        return await this.gameRepository.countHighestScore();
    }

    async recentGames(): Promise<any> {
        return await this.gameRepository.recentGames();
    }
}
