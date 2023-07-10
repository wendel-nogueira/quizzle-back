import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('getAll', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('getAll', async () => {  //  Testa a rota
        const response = await request(server).get('/themes');   //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toEqual(expect.arrayContaining([  //  Espera que o corpo da resposta seja um array contendo objetos
            expect.objectContaining({
                id: expect.any(String),
                tema: expect.any(String),
                descricao: expect.any(String),
            })
        ]));
    });
});