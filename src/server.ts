import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import router from './routes';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 80;

declare global {
    namespace Express {
        interface Request{
            userToken?: any;
        }
    }
}

app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
app.use('/', router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        let error: any;

        try {
            error = JSON.parse(err.message);
        } catch (e) {
            error = err.message;
        }

        return response.status(400).json({
            error: error
        })
    } else {
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});