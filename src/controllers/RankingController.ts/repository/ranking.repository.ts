import { IRankingRepository } from './i-ranking.repository';
import { Ranking } from '../entities/ranking.entity';
import { db } from '../../../config/FirebaseComponent/firebase';


export class RankingRepository implements IRankingRepository {
    db: any;

    constructor() {
        this.db = db.collection('ranking');
    }

    async findByTheme(tema: string): Promise<Ranking> {
        const ranking: any = {};

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                if (doc.data().tema === tema) {
                    ranking.id = doc.id;
                    ranking.tema = doc.data().tema;
                    ranking.pontuacoes = doc.data().pontuacoes;
                }
            });
        });

        ranking.pontuacoes.sort((a: any, b: any) => {
            return b.pontuacao - a.pontuacao;
        });

        ranking.pontuacoes = ranking.pontuacoes.slice(0, 10);

        return ranking;
    }

    async findGlobalRanking(): Promise<Ranking> {
        const ranking: any = {};

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                if (doc.data().tema === 'tDgUUnib7rNwV4Kedj3L') {
                    ranking.id = doc.id;
                    ranking.tema = doc.data().tema;
                    ranking.pontuacoes = doc.data().pontuacoes;
                }
            });
        });

        ranking.pontuacoes.sort((a: any, b: any) => {
            return b.pontuacao - a.pontuacao;
        });

        ranking.pontuacoes = ranking.pontuacoes.slice(0, 10);

        return ranking;
    }

    async create(tema: string): Promise<void> {
        await this.db.add({
            tema,
            pontuacoes: [],
        });
    }
}