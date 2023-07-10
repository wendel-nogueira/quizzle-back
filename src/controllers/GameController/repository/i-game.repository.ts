import { Game } from '../entities/game.entity';


export interface IGameRepository {
    countGames(): Promise<any>;
    countHitsByTheme(): Promise<any>;
    countFailsByTheme(): Promise<any>;
    countHighestScore(): Promise<Game>;
    recentGames(): Promise<Game[]>;
}