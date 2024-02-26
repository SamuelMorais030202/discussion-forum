import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { invalidEmail, returnUserCreate, user } from './mocks/user.nocks';
import UserValidations from '../middlewares/user.validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('User tests', () => {
  it('Should create user', async () => {
    sinon.stub(SequelizeUser, 'create').resolves(returnUserCreate as any);
    sinon.stub(UserValidations, 'validateCreateUser').returns();

    const {id, ...sendData} = returnUserCreate;
    const { status, body } = await chai.request(app).post('/user').send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(returnUserCreate)
  });

  it('Should return an error when trying to create a user with an invalid email', async () => {
    const { status, body } = await chai
      .request(app)
      .post('/user')
      .send(invalidEmail);

    expect(status).to.equal(401);
    expect(body.message).to.deep.equal('Invalid email or password');
  });

  it('Should return an error when trying to create a user without all information', async () => {
    const { id, email, ...sendData } = returnUserCreate;

    const { status, body } = await chai
      .request(app)
      .post('/user')
      .send(sendData);

    expect(status).to.equal(400);
    expect(body.message).to.deep.equal('All fields must be filled');
  });

  it('Should return user by id', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const requestLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    const { status, body } = await chai
      .request(app)
      .get('/user')
      .auth(requestLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(user);
  });

  it('Should update user', async () => {
    sinon.stub(SequelizeUser, 'update').resolves([1] as any);
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);
    sinon.stub(UserValidations, 'validateCreateUser').returns();

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: user.email,
      password: user.password,
    });

    const { id, ...sendData } = user;

    const { status, body } = await chai
      .request(app)
      .put('/user')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(200);
    expect(body.message).to.equal('User update');
  });

  it('Should return an error when trying to update a user with an invalid email', async () => {
    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: user.email,
      password: user.password,
    });

    const { status, body } = await chai
      .request(app)
      .put('/user')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(invalidEmail);

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
  });

  it('Should return an error when trying to update a user without all fields', async () => {
    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: user.email,
      password: user.password,
    });

    const { id, password, ...sendData } = user;

    const { status, body } = await chai
      .request(app)
      .put('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(400);
    expect(body.message).to.deep.equal('All fields must be filled');
  });

  it('Should delete user', async () => {
    sinon.stub(SequelizeUser, 'destroy').resolves();
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    const { status, body } = await chai
      .request(app)
      .delete('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.equal('User deleted');
  });

  it('Should return an error when trying to delete a non-existent user', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: user.email,
        password: user.password,
      });

    const { status, body } = await chai
      .request(app)
      .delete('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(404);
    expect(body.message).to.equal('User 1 not found');
  });

  afterEach(sinon.restore);
});