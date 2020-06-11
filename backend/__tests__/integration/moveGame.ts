import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import App from '@shared/infra/http/App';
import createConnection from '@shared/infra/typeorm';

const app = new App();
let connection: Connection;

describe('moveGame', () => {
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

    await request(app.server).patch(`/hash/${hash.id}`).send({
      player_2: 'Tester',
    });

    const { body } = await request(app.server)
      .post(`/hash/${hash.id}`)
      .send({
        position: 1,
      })
      .set('Authorization', `bearer ${token}`);

    expect(body).toHaveProperty('id');
    expect(body.id).toBe(hash.id);
  });
});
