import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMessage from '../database/models/SequelizeMessage';
import { message, messages } from './mocks/message.mocks';
import { user } from './mocks/user.nocks';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Message tests', () => {
  it('Should create message', async () => {
    sinon.stub(SequelizeMessage, 'create').resolves(message as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { id, ...sendData } = message;

    const { status, body } = await chai
      .request(app)
      .post('/message')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(message);
  });

  it('Should return all messages', async () => {
    sinon.stub(SequelizeMessage, 'findAll').resolves(messages as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .get('/message')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(messages);
  });

  it('Should return message by id', async () => {
    sinon.stub(SequelizeMessage, 'findByPk').resolves(message as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .get(`/message/${message.id}`)
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(message);
  });

  it('Should return all messages by user id', async () => {
    sinon.stub(SequelizeMessage, 'findAll').resolves(messages as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .get(`/message/user/${user.id}`)
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(messages);
  });

  it('Should return all messages by topic id', async () => {
    sinon.stub(SequelizeMessage, 'findAll').resolves(messages as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .get(`/message/topic/1`)
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(messages);
  });

  it('Should delete message by id', async () => {
    sinon.stub(SequelizeMessage, 'destroy').resolves();
    sinon.stub(SequelizeMessage, 'findByPk').resolves(message as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .delete(`/message/${message.id}`)
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Message deleted');
  });

  afterEach(sinon.restore);
});