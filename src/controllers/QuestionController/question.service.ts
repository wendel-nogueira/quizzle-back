import { QuestionRepository } from './repository/question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Validator } from './question.validator';


export class QuestionService {
    questionsRepository: QuestionRepository;

    constructor() {
        this.questionsRepository = new QuestionRepository();
    }

    async findAll() {
        return await this.questionsRepository.findAll();
    }

    async findOne(id: string) {
        return await this.questionsRepository.findOne(id);
    }

    async create(createQuestionDto: CreateQuestionDto) {
        const validator = new Validator();

        await validator.validate(createQuestionDto);

        return await this.questionsRepository.create(createQuestionDto);
    }

    async update(id: string, updateQuestionDto: UpdateQuestionDto) {
        return await this.questionsRepository.update(id, updateQuestionDto);
    }

    async remove(id: string) {
        return await this.questionsRepository.remove(id);
    }
}