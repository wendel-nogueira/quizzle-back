export class Game {
    id: string;
    perguntas: string[];
    pontuacao: number;
    tema: string;
    usuario: string;
    usuarioId: string;

    constructor(partial: Partial<Game>) {
        Object.assign(this, partial);
    }
}