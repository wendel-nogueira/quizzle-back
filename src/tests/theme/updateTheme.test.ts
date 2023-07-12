import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('update', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('theme not exists', async () => {  //  Testa a rota
        const response = await request(server).put('/themes/tema').send({  //  Faz uma requisição PUT para a rota
            tema: 'teste',
            descricao: 'teste',
        });

        expect(response.status).toBe(400);  //  Espera que o status da resposta seja 400
        expect(response.body).toEqual(expect.objectContaining({  //  Espera que o corpo da resposta seja um array contendo objetos
            error: expect.any(String),
        }));
    });

    it('update', async () => {  //  Testa a rota
        const response = await request(server).post('/themes').send({
            tema: 'teste_update2',
            descricao: 'teste_update2',
        });

        const id = response.body.id;

        const response2 = await request(server).put('/themes/' + id).send({  //  Faz uma requisição PUT para a rota
            tema: 'teste_update2_a',
            descricao: 'teste_update2_a',
        });

        expect(response2.status).toBe(200);  //  Espera que o status da resposta seja 200

        await request(server).delete('/themes/' + id);  //  Faz uma requisição DELETE para a rota
    });
});