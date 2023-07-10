import { IGameRepository } from './i-game.repository';
import { Game } from '../entities/game.entity';
import { db } from '../../../config/FirebaseComponent/firebase';
import { ThemeService } from '../../ThemeController/theme.service';


export class GameRepository implements IGameRepository {
    db: any;

    constructor() {
        this.db = db.collection('jogos');
    }

    async countGames(): Promise<any> {
        let count = 0;

        await this.db.get().then((querySnapshot: any) => {
            count = querySnapshot.size;
        });

        return count;
    }

    async countFailsByTheme(): Promise<any> {
        const themeService = new ThemeService();
        const themes = await themeService.findAll();
        const failsByTheme: any[] = [];

        for (const theme of themes) {
            let fails = 0;

            await this.db.where('tema', '==', theme.id).get().then((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    fails += (doc.data().perguntas.length - (doc.data().pontuacao / 10));
                });
            });

            failsByTheme.push({
                'name': theme.tema,
                'value': fails
            })
        }

        return failsByTheme;
    }

    async countHitsByTheme(): Promise<any> {
        const themeService = new ThemeService();
        const themes = await themeService.findAll();
        const hitsByTheme: any[] = [];

        for (const theme of themes) {
            let hits = 0;

            await this.db.where('tema', '==', theme.id).get().then((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    hits += doc.data().pontuacao / 10;
                });
            });

            hitsByTheme.push({
                'name': theme.tema,
                'value': hits
            })
        }

        return hitsByTheme;
    }

    async countHighestScore(): Promise<Game> {
        const games: any[] = [];

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                games.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        });

        const highestScore = games.reduce((prev, current) => {
            return (prev.pontuacao > current.pontuacao) ? prev : current;
        });

        return highestScore;
    }

    async recentGames(): Promise<Game[]> {
        const games: any[] = [];

        await this.db.get().then((querySnapshot: any) => {
            const lastFiveGames = querySnapshot.docs.slice(Math.max(querySnapshot.docs.length - 8, 0));

            lastFiveGames.forEach((doc: any) => {
                games.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        });

        return games;
    }
}