import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import App from '@shared/infra/http/App';
import createConnection from '@shared/infra/typeorm';

const app = new App();
let connection: Connection;

describe('showGame', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.getMongoRepository('Hash').deleteMany({});
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to return game data', async () => {
    const {
      body: { hash, token },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { body } = await request(app.server)
      .get(`/hash/${hash.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(body).toHaveProperty('id');
    expect(body.id).toBe(hash.id);
  });

  it('should be able to invalid token', async () => {
    const {
      body: { hash, token },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { body, status } = await request(app.server)
      .get(`/hash/${hash.id}`)
      .set('Authorization', `bearer ${token}1`);

    expect(status).toBe(401);
    expect(body.message).toBe('Invalid JWT token');
  });

  it('should be able to invalid id', async () => {
    const {
      body: { hash, token },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { body, status } = await request(app.server)
      .get(`/hash/${hash.id.substr(1)}1`)
      .set('Authorization', `bearer ${token}`);

    expect(status).toBe(400);
    expect(body.message).toBe('Jogo não encontrado');
  });
});
