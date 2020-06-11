import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import App from '@shared/infra/http/App';
import createConnection from '@shared/infra/typeorm';

const app = new App();
let connection: Connection;

describe('initGame', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.getMongoRepository('Hash').deleteMany({});
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new hash', async () => {
    const response = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    expect(response.body).toHaveProperty('hash');
    expect(response.body).toHaveProperty('token');
    expect(response.body.hash).toHaveProperty('id');
  });

  it('should be able to invalid body when create', async () => {
    const response = await request(app.server).post('/hash').send();

    expect(response.status).toBe(400);
  });

  it('should be able to invalid body when init game', async () => {
    const { status } = await request(app.server).post(`/hash`).send();

    expect(status).toBe(400);
  });

  it('should be able to insert player 2', async () => {
    const {
      body: { hash },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { body } = await request(app.server).patch(`/hash/${hash.id}`).send({
      player_2: 'Tester',
    });

    expect(body).toHaveProperty('hash');
    expect(body).toHaveProperty('token');
    expect(body.hash).toHaveProperty('player_2');
    expect(body.hash.player_2).toBe('Tester');
  });

  it('should be able to invalid body when insert player 2', async () => {
    const {
      body: { hash },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { status } = await request(app.server)
      .patch(`/hash/${hash.id}`)
      .send();

    expect(status).toBe(400);
  });

  it('should be able to invalid id', async () => {
    const {
      body: { hash },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    const { status, body } = await request(app.server)
      .patch(`/hash/${hash.id.substr(1)}1`)
      .send({
        player_2: 'Tester 2',
      });

    expect(status).toBe(400);
    expect(body.message).toBe('Hash not found');
  });

  it('should be able to game not available', async () => {
    const {
      body: { hash },
    } = await request(app.server).post('/hash').send({
      player_1: 'Tester',
    });

    await request(app.server).patch(`/hash/${hash.id}`).send({
      player_2: 'Tester 2',
    });

    const { status, body } = await request(app.server)
      .patch(`/hash/${hash.id}`)
      .send({
        player_2: 'Tester 2',
      });

    expect(status).toBe(400);
    expect(body.message).toBe('Game don´t available');
  });
});
