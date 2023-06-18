import { IsNotEmpty, IsString, IsArray } from 'class-validator';


export class CreateQuestionDto {
    @IsNotEmpty(
        { message: 'A pergunta é obrigatória' },
    )
    @IsString(
        { message: 'A pergunta deve ser uma string' },
    )
    pergunta: string;
    
    @IsNotEmpty(
        { message: 'A descrição é obrigatória' },
    )
    @IsArray(
        { message: 'As alternativas devem ser um array' },
    )
    alternativas: string[];

    @IsNotEmpty(
        { message: 'A resposta é obrigatória' },
    )
    @IsString(
        { message: 'A resposta deve ser uma string' },
    )
    resposta: string;

    @IsNotEmpty(
        { message: 'O tema é obrigatório' },
    )
    @IsString(
        { message: 'O tema deve ser uma string' },
    )
    tema: string;
}