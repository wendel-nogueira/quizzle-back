import { CreateQuestionDto } from './dto/create-question.dto';
import { validateOrReject } from 'class-validator';


export class Validator {
    async validate(question: CreateQuestionDto) {
        const validateTool = new CreateQuestionDto();

        validateTool.pergunta = question.pergunta;
        validateTool.alternativas = question.alternativas;
        validateTool.resposta = question.resposta;
        validateTool.tema = question.tema;

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