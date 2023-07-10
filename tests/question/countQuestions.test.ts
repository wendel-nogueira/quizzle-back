import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('countQuestions', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {    
        server.close(done); //  Fecha o servidor
    });

    it('countQuestions', async () => {  //  Testa a rota
        const response = await request(server).get('/questions/count/all');  //  Faz uma requisição GET para a rota

        expect(response.status).toBe(200);  //  Espera que o status da resposta seja 200
        expect(response.body).toBeGreaterThanOrEqual(0);    //  Espera que o corpo da resposta seja maior ou igual a 0
    });
});