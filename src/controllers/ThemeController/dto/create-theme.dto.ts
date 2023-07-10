import { IsNotEmpty, IsString } from 'class-validator';


export class CreateThemeDto {
    @IsNotEmpty(
        { message: 'O tema é obrigatório' },
    )
    @IsString(
        { message: 'O tema deve ser uma string' },
    )
    tema: string;

    @IsNotEmpty(
        { message: 'A descrição é obrigatória' },
    )
    @IsString(
        { message: 'A descrição deve ser uma string' },
    )
    descricao: string;
}