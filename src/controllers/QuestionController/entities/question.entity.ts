export class Question {
    id: string;
    pergunta: string;
    alternativas: string[];
    resposta: string;
    tema: any;

    constructor(partial: Partial<Question>) {
        Object.assign(this, partial);
    }
}