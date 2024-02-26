import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTopics from '../database/models/SequelizeTopics';
import TopicValidations from '../middlewares/topic.validations';
import { user } from './mocks/user.nocks';
import { formatTopic, formatTopicUpdate, newTopic, updateTopic } from './mocks/topic.mocks';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Topic tests', () => {
  it('Should create topic', async () => {
    sinon.stub(SequelizeTopics, 'create').resolves(formatTopic as any);
    sinon.stub(SequelizeTopics, 'findByPk').resolves(newTopic as any);
    sinon.stub(TopicValidations, 'createTopic').returns();

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    const {id, ...sendData} = newTopic;

    const { status, body } = await chai
      .request(app)
      .post('/topic')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newTopic);
  });

  it('Should return an error when trying to create a topic without all information', async () => {
    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    const { id, name, type } = formatTopic;

    const { status, body } = await chai
      .request(app)
      .post('/topic')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(name);

    expect(status).to.equal(400);
    expect(body.message).to.deep.equal('All fields must be filled');
  });

  it('Should return all topics', async () => {
    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    sinon.stub(SequelizeTopics, 'create').resolves(formatTopic as any);
    sinon.stub(SequelizeTopics, 'findByPk').resolves(newTopic as any);
    sinon.stub(TopicValidations, 'createTopic').returns();

    const {id, ...sendData} = newTopic;

    await chai
      .request(app)
      .post('/topic')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    sinon.stub(SequelizeTopics, 'findAll').resolves(newTopic as any);

    const response = await chai
      .request(app)
      .get('/topic')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal(newTopic)
  });

  it('Should return topic by id', async () => {
    sinon.stub(SequelizeTopics, 'findByPk').resolves(newTopic as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });
    
    const { status, body } = await chai
      .request(app)
      .get(`/topic/${newTopic.id}`)
      .auth(responseLogin.body.token, { type: 'bearer' });
      
    expect(status).to.equal(200)
    expect(body).to.deep.equal(newTopic);
  });

  it('Should return topics by userId', async () => {
    sinon.stub(SequelizeTopics, 'findAll').resolves(newTopic as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });
    
    const { status, body } = await chai
      .request(app)
      .get(`/topic/user/${newTopic.userId}`)
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(newTopic);
  });

  it('Should delete topic', async () => {
    sinon.stub(SequelizeTopics, 'destroy').resolves();
    sinon.stub(SequelizeTopics, 'findByPk').resolves(newTopic as any);

    const requestLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });
    
    const { status, body } = await chai
      .request(app)
      .delete(`/topic/${newTopic.id}`)
      .auth(requestLogin.body.token, { type: 'bearer' });
    
    expect(status).to.equal(200);
    expect(body.message).to.deep.equal(`Topic ${newTopic.id} deleted`);
  });

  it('Should return an error message when trying to delete a non-existent topic', async () => {
    sinon.stub(SequelizeTopics, 'destroy').resolves();
    sinon.stub(SequelizeTopics, 'findByPk').resolves(null);

    const requestLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });
    
    const { status, body } = await chai
      .request(app)
      .delete(`/topic/${newTopic.id}`)
      .auth(requestLogin.body.token, { type: 'bearer' });
    
    expect(status).to.equal(404);
    expect(body.message).to.deep.equal(`Topic ${newTopic.id} not found`)
  });

  afterEach(sinon.restore);
});