import { IThemeRepository } from './i-theme.repository';
import { CreateThemeDto } from '../dto/create-theme.dto';
import { UpdateThemeDto } from '../dto/update-theme.dto';
import { Theme } from '../entities/theme.entity';
import { db } from '../../../config/FirebaseComponent/firebase';
import { v4 } from 'uuid';
import { RankingService } from '../../RankingController.ts/ranking.service';


export class ThemeRepository implements IThemeRepository {
    db: any;

    constructor() {
        this.db = db.collection('temas');
    }

    async findAll(): Promise<Theme[]> {
        const themes: Theme[] = [];

        await this.db.get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                themes.push({
                    id: doc.id,
                    tema: doc.data().tema,
                    descricao: doc.data().descricao,
                });
            });
        });

        return themes;
    }

    async findOne(id: string): Promise<any> {
        const theme: any = {};

        await this.db.doc(id).get().then((doc: any) => {
            theme.id = doc.id;
            theme.tema = doc.data().tema;
            theme.descricao = doc.data().descricao;
        });

        return theme;
    }

    async findOneByTheme(tema: string): Promise<any> {
        const theme = await this.db.get().then((querySnapshot: any) => {
            let theme: any = {};

            querySnapshot.forEach((doc: any) => {
                if (doc.data().tema === tema) {
                    theme = {
                        id: doc.id,
                        tema: doc.data().tema,
                        descricao: doc.data().descricao,
                    };

                    return theme;
                }
            });

            return theme;
        });

        return theme;
    }

    async create(createThemeDto: CreateThemeDto): Promise<Theme> {        
        const id = v4();
        const theme: Theme = {
            id: id,
            tema: createThemeDto.tema,
            descricao: createThemeDto.descricao,
        };

        await this.db.add(theme);

        let docId: string = '';

        await this.db.where('id', '==', id).get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
                docId = doc.id;
            });
        });

        const rankingService = new RankingService();
        await rankingService.create(id);

        return {
            id: docId,
            tema: theme.tema,
            descricao: theme.descricao,
        };
    }

    async update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme> {
        const theme = this.db.doc(id);
        const themeData = await theme.get().then((doc: any) => {
            return doc;
        });

        if (!themeData.exists) {
            throw new Error('Theme not found');
        }

        await this.db.doc(id).update({
            tema: updateThemeDto.tema || themeData.data().tema,
            descricao: updateThemeDto.descricao || themeData.data().descricao,
        });

        return {
            id: id,
            tema: updateThemeDto.tema || themeData.data().tema,
            descricao: updateThemeDto.descricao || themeData.data().descricao,
        }
    }

    async remove(id: string): Promise<void> {
        await this.db.doc(id).delete();
        
        return;
    }
}