export class Ranking {
    id: string;
    tema: string;
    pontuacoes: any[];

    constructor(partial: Partial<Ranking>) {
        Object.assign(this, partial);
    }
}