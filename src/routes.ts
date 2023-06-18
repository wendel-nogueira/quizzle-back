import { Router } from 'express';
import { QuestionsController } from './controllers/QuestionController/question.controller';

const router = Router();
const questionsController = new QuestionsController();

router.get('/questions', questionsController.findAll);
router.get('/questions/:id', questionsController.findOne);
router.post('/questions', questionsController.create);
router.put('/questions/:id', questionsController.update);
router.delete('/questions/:id', questionsController.remove);

export default router;