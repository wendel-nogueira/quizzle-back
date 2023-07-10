export class Theme {
    id: string;
    tema: string;
    descricao: string;

    constructor(partial: Partial<Theme>) {
        Object.assign(this, partial);
    }
}