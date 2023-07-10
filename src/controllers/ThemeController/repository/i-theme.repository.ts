import { CreateThemeDto } from '../dto/create-theme.dto';
import { UpdateThemeDto } from '../dto/update-theme.dto';
import { Theme } from '../entities/theme.entity';


export interface IThemeRepository {
    findAll(): Promise<Theme[]>;
    findOne(id: string): Promise<any>;
    findOneByTheme(tema: string): Promise<any>;
    create(createThemeDto: CreateThemeDto): Promise<Theme>;
    update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme>;
    remove(id: string): Promise<void>;
}