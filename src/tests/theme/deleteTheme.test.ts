import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('delete', () => {
    let server: any;
    let id: string;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('theme not exists', async () => {  //  Testa a rota
        const response = await request(server).delete('/themes/tema');  //  Faz uma requisição DELETE para a rota

        expect(response.status).toBe(400);  //  Espera que o status da resposta seja 200
    });

    it('delete', async () => {  //  Testa a rota
        const response = await request(server).post('/themes').send({  //  Faz uma requisição POST para a rota
            tema: 'teste_delete',
            descricao: 'teste_delete',
        });

        id = response.body.id;

        const response2 = await request(server).delete('/themes/' + id);  //  Faz uma requisição DELETE para a rota

        expect(response2.status).toBe(200);  //  Espera que o status da resposta seja 200
    });
});