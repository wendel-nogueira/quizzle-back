import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('getHighestScore', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('getHighestScore', async () => { //  Testa a rota
        const response = await request(server).get('/game/highestScore');   //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toEqual(expect.objectContaining({ //  Espera que o corpo da resposta seja um objeto contendo as propriedades
            id: expect.any(String),
            usuario: expect.any(String),
            pontuacao: expect.any(Number),
            tema: expect.any(String),
            perguntas: expect.any(Array)
        }));
    });
});