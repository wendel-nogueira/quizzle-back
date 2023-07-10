import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../entities/question.entity';


export interface IQuestionRepository {
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<any>;
    countQuestionsByTheme(): Promise<any>;
    countQuestions(): Promise<any>;
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: string): Promise<void>;
}