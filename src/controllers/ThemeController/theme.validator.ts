import { CreateThemeDto } from './dto/create-theme.dto';
import { validateOrReject } from 'class-validator';


export class Validator {
    async validate(theme: CreateThemeDto) {
        const validateTool = new CreateThemeDto();

        validateTool.tema = theme.tema;
        validateTool.descricao = theme.descricao;

        await validateOrReject(validateTool).catch(errors => {
            const errorMessage: any = errors.map((error: { property: any; constraints: any; }) => {
                return Object.values(error.constraints).map((constraint: any) => {
                    return constraint;
                });
            });

            throw new Error(JSON.stringify(errorMessage));
        });
    }
}