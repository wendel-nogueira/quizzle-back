import { Request, Response, NextFunction } from 'express';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';


export class ThemesController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        const themesService = new ThemeService();
        const themes = await themesService.findAll();

        return res.status(200).json(themes);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const themesService = new ThemeService();
        const { id } = req.params;
        const theme = await themesService.findOne(id);

        return res.status(200).json(theme);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const themesService = new ThemeService();
        const body = req.body as CreateThemeDto;
        const theme = await themesService.create(body);

        return res.status(201).json(theme);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const themesService = new ThemeService();
        const { id } = req.params;
        const body = req.body as UpdateThemeDto;

        const theme = await themesService.update(id, body);

        return res.status(200).json(theme);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const themesService = new ThemeService();
        const { id } = req.params;
        const theme = await themesService.remove(id);

        return res.status(200).json(theme);
    }
}