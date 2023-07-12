import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('getById', () => {
    let server: any;
    const id = 'cdCPvtWlrkGPihxVD3j6';

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('getById', async () => {  //  Testa a rota
        const response = await request(server).get('/questions/' + id);   //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toEqual(expect.objectContaining({  //  Espera que o corpo da resposta seja um array contendo objetos
            id: expect.any(String),
            pergunta: expect.any(String),
            resposta: expect.any(String),
            alternativas: expect.any(Array),
            tema: expect.any(Object),
        }));
    });
});