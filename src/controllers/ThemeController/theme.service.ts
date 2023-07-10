import { ThemeRepository } from './repository/theme.repository';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Validator } from './theme.validator';


export class ThemeService {
    themesRepository: ThemeRepository;

    constructor() {
        this.themesRepository = new ThemeRepository();
    }

    async findAll() {
        return await this.themesRepository.findAll();
    }

    async findOne(id: string) {
        return await this.themesRepository.findOne(id);
    }

    async findOneByTheme(tema: string) {
        return await this.themesRepository.findOneByTheme(tema);
    }

    async create(createThemeDto: CreateThemeDto) {
        const validator = new Validator();

        await validator.validate(createThemeDto);

        const themeExists = await this.themesRepository.findOneByTheme(createThemeDto.tema);

        if (themeExists.length > 0 || themeExists.id) {
            throw new Error('Tema já cadastrado');
        }
        
        return await this.themesRepository.create(createThemeDto);
    }

    async update(id: string, updateThemeDto: UpdateThemeDto) {
        const themeExists = await this.themesRepository.findOne(id);

        if (!themeExists) {
            throw new Error('Tema não encontrado');
        }

        return await this.themesRepository.update(id, updateThemeDto);
    }

    async remove(id: string) {
        const themeExists = await this.themesRepository.findOne(id);

        if (!themeExists) {
            throw new Error('Tema não encontrado');
        }

        return await this.themesRepository.remove(id);
    }
}