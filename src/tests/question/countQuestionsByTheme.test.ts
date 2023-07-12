import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('countQuestionsByTheme', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {    
        server.close(done); //  Fecha o servidor
    });

    it('countQuestionsByTheme', async () => {  //  Testa a rota
        const response = await request(server).get('/questions/count/byTheme');  //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toEqual(expect.arrayContaining([  //  Espera que o corpo da resposta seja um array contendo objetos
            expect.objectContaining({
                name: expect.any(String),
                value: expect.any(Number)
            })
        ]));
    });
});