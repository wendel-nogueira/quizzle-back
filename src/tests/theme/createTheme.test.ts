import request from 'supertest';
import { createServer } from 'http';
import app from '../../src/server';


describe('create', () => {
    let server: any;

    beforeAll((done) => {
        server = createServer(app); //  Cria um servidor para testar a rota
        server.listen(done);    //  Inicia o servidor
    });

    afterAll((done) => {
        server.close(done); //  Fecha o servidor
    });

    it('theme exists', async () => {  //  Testa a rota
        const response = await request(server).post('/themes').send({  //  Faz uma requisição POST para a rota
            tema: 'História',
            descricao: 'Perguntas sobre história',
        });

        expect(response.status).toBe(400);  //  Espera que o status da resposta seja 400
        expect(response.body).toEqual(expect.objectContaining({  //  Espera que o corpo da resposta seja um array contendo objetos
            error: expect.any(String),
        }));
    });

    it('field invalid', async () => {  //  Testa a rota
        const response = await request(server).post('/themes').send({  //  Faz uma requisição POST para a rota
            tema: '',
            descricao: '',
        });

        expect(response.status).toBe(400);  //  Espera que o status da resposta seja 400
        expect(response.body).toEqual(expect.objectContaining({  //  Espera que o corpo da resposta seja um array contendo objetos
            error: expect.any(Array),
        }));
    });

    it('create', async () => {  //  Testa a rota
        const response = await request(server).post('/themes').send({  //  Faz uma requisição POST para a rota
            tema: 'teste',
            descricao: 'teste',
        });

        expect(response.status).toBe(201);  //  Espera que o status da resposta seja 201

        const response2 = await request(server).delete('/themes/' + response.body.id);  //  Faz uma requisição DELETE para a rota

        expect(response2.status).toBe(200);  //  Espera que o status da resposta seja 200
    });
});