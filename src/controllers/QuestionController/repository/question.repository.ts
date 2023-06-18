import { IQuestionRepository } from './i-question.repository';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';
import { db } from '../../../config/FirebaseComponent/firebase';
import { v4 } from 'uuid';


export class QuestionRepository implements IQuestionRepository {
    db: any;

    constructor() {
        this.db = db.collection('perguntas');
    }

    async findAll(): Promise<Question[]> {
        const questions: Question[] = [];

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                questions.push({
                    id: doc.id,
                    pergunta: doc.data().pergunta,
                    alternativas: doc.data().alternativas,
                    resposta: doc.data().resposta,
                    tema: doc.data().tema,
                });
            });
        });

        return questions;
    }

    async findOne(id: string): Promise<any> {
        const question: any = {};

        await this.db.doc(id).get().then((doc: any) => {
            question.id = doc.id;
            question.pergunta = doc.data().pergunta;
            question.alternativas = doc.data().alternativas;
            question.resposta = doc.data().resposta;
            question.tema = doc.data().tema;
        });

        return question;
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
        const question = db.doc(id);
        const questionData = await question.get().then((doc: any) => {
            return doc;
        });

        if (!questionData.exists) {
            throw new Error('Question not found');
        }

        console.log(questionData.data().pergunta);

        await this.db.doc(id).update({
            pergunta: updateQuestionDto.pergunta || questionData.data().pergunta,
            alternativas: updateQuestionDto.alternativas || questionData.data().alternativas,
            resposta: updateQuestionDto.resposta || questionData.data().resposta,
            tema: updateQuestionDto.tema || questionData.data().tema,
        });

        return {
            id: id,
            pergunta: updateQuestionDto.pergunta || questionData.data().pergunta,
            alternativas: updateQuestionDto.alternativas || questionData.data().alternativas,
            resposta: updateQuestionDto.resposta || questionData.data().resposta,
            tema: updateQuestionDto.tema || questionData.data().tema,
        }
    }

    async remove(id: string): Promise<void> {
        await this.db.doc(id).delete();
        
        return;
    }
}