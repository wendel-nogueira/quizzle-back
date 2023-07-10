import { IQuestionRepository } from './i-question.repository';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';
import { db } from '../../../config/FirebaseComponent/firebase';
import { v4 } from 'uuid';
import { ThemeService } from '../../ThemeController/theme.service';


export class QuestionRepository implements IQuestionRepository {
    db: any;

    constructor() {
        this.db = db.collection('perguntas');
    }

    async findAll(): Promise<Question[]> {
        const questions: any[] = [];
        const themes: any[] = [];

        await db.collection('temas').get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                themes.push({
                    id: doc.id,
                    tema: doc.data().tema,
                    descricao: doc.data().descricao,
                });
            });
        });

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                questions.push({
                    id: doc.id,
                    pergunta: doc.data().pergunta,
                    alternativas: doc.data().alternativas,
                    resposta: doc.data().resposta,
                    tema: themes.find((theme: any) => theme.id === doc.data().tema) || 'Tema não encontrado',
                });
            });
        });

        return questions;
    }

    async findOne(id: string): Promise<any> {
        const question: any = {};
        const themes: any[] = [];

        await db.collection('temas').get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                themes.push({
                    id: doc.id,
                    tema: doc.data().tema,
                    descricao: doc.data().descricao,
                });
            });
        });

        await this.db.doc(id).get().then((doc: any) => {
            question.id = doc.id;
            question.pergunta = doc.data().pergunta;
            question.alternativas = doc.data().alternativas;
            question.resposta = doc.data().resposta;
            question.tema = themes.find((theme: any) => theme.id === doc.data().tema) || 'Tema não encontrado';
        });

        return question;
    }

    async countQuestionsByTheme(): Promise<any> {
        const themeService = new ThemeService();
        const themes = await themeService.findAll();

        const questionsByTheme: any[] = [];

        for (const theme of themes) {
            if (theme.tema !== 'Geral') {
                const questions = await this.db.where('tema', '==', theme.id).get().then((querySnapshot: any) => {
                    return querySnapshot.size;
                });

                questionsByTheme.push({
                    name: theme.tema,
                    value: questions,
                });
            }
        }

        return questionsByTheme;
    }

    async countQuestions(): Promise<any> {
        const questions = await this.db.get().then((querySnapshot: any) => {
            return querySnapshot.size;
        });

        return questions;
    }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question: Question = {
            id: v4(),
            pergunta: createQuestionDto.pergunta,
            alternativas: createQuestionDto.alternativas,
            resposta: createQuestionDto.resposta,
            tema: createQuestionDto.tema,
        };

        await this.db.add(question);

        return question;
    }

    async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        const question = await this.db.doc(id).get().then((doc: any) => {
            return doc.data();
        });

        if (!question) {
            console.log('Question not found');
            throw new Error('Question not found');
        }

        await this.db.doc(id).update({
            pergunta: updateQuestionDto.pergunta || question.data().pergunta,
            alternativas: updateQuestionDto.alternativas || question.data().alternativas,
            resposta: updateQuestionDto.resposta || question.data().resposta,
            tema: updateQuestionDto.tema || question.data().tema,
        });

        return {
            id: id,
            pergunta: updateQuestionDto.pergunta || question.data().pergunta,
            alternativas: updateQuestionDto.alternativas || question.data().alternativas,
            resposta: updateQuestionDto.resposta || question.data().resposta,
            tema: updateQuestionDto.tema || question.data().tema,
        }
    }

    async remove(id: string): Promise<void> {
        await this.db.doc(id).delete();

        return;
    }
}