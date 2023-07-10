import { Request, Response, NextFunction } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';


export class QuestionsController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const questions = await questionsService.findAll();

        return res.status(200).json(questions);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const { id } = req.params;
        const question = await questionsService.findOne(id);

        return res.status(200).json(question);
    }

    async countQuestionsByTheme(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const questions = await questionsService.countQuestionsByTheme();

        return res.status(200).json(questions);
    }

    async countQuestions(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const questions = await questionsService.countQuestions();

        return res.status(200).json(questions);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const body = req.body as CreateQuestionDto;
        const question = await questionsService.create(body);

        return res.status(201).json(question);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const { id } = req.params;
        const body = req.body as UpdateQuestionDto;
        const question = await questionsService.update(id, body);

        return res.status(200).json(question);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const questionsService = new QuestionService();
        const { id } = req.params;
        const question = await questionsService.remove(id);

        return res.status(200).json(question);
    }
}