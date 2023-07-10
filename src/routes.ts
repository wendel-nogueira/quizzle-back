import { Router } from 'express';
import { QuestionsController } from './controllers/QuestionController/question.controller';
import { ThemesController } from './controllers/ThemeController/theme.controller';
import { RankingController } from './controllers/RankingController.ts/ranking.controller';
import { GameController } from './controllers/GameController/game.controller';

const router = Router();
const questionsController = new QuestionsController();
const themesController = new ThemesController();
const rankingController = new RankingController();
const gameController = new GameController();

router.get('/questions', questionsController.findAll);
router.get('/questions/:id', questionsController.findOne);
router.get('/questions/count/byTheme', questionsController.countQuestionsByTheme);
router.get('/questions/count/all', questionsController.countQuestions);
router.post('/questions', questionsController.create);
router.put('/questions/:id', questionsController.update);
router.delete('/questions/:id', questionsController.remove);

router.get('/themes', themesController.findAll);
router.get('/themes/:id', themesController.findOne);
router.post('/themes', themesController.create);
router.put('/themes/:id', themesController.update);
router.delete('/themes/:id', themesController.remove);

router.get('/ranking/:tema', rankingController.findByTheme);
router.get('/ranking', rankingController.findGlobalRanking);

router.get('/game/count', gameController.countGames);
router.get('/game/countFails', gameController.countFailsByTheme);
router.get('/game/countHits', gameController.countHitsByTheme);
router.get('/game/highestScore', gameController.countHighestScore);
router.get('/game/recent', gameController.recentGames);

export default router;