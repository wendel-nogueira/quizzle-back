import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('getRecentGames', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('getRecentGames', async () => {  //  Testa a rota
        const response = await request(server).get('/game/recent');   //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toEqual(expect.arrayContaining([  //  Espera que o corpo da resposta seja um array contendo objetos
            expect.objectContaining({
                id: expect.any(String),
                usuario: expect.any(String),
                pontuacao: expect.any(Number),
                tema: expect.any(String),
                perguntas: expect.any(Array)
            })
        ]));

        expect(response.body.length).toBeLessThanOrEqual(8);    //  Espera que o corpo da resposta seja um array com no máximo 8 objetos
    });
});