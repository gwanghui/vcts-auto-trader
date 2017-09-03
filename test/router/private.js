import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import sinon from 'sinon';
import { expect, should } from 'chai';
import privateRouter from '../../src/router/private';
import * as looper from '../../src/looper';

describe('router/private', function () {
  const USER = 'TEST_USER_NAME';
  let app;
  before(() => {
    sinon.stub(looper, 'run')
      .onCall(0).returns(Promise.resolve())
      .onCall(1).returns(Promise.reject());
    app = express();
    app.use('/', privateRouter);
  });
  after(() => {
    looper.run.restore();
  })
  it('should return 201 when looper running using post is success', done => {
    supertest(app)
      .post(`/users/${USER}/loopers`)
      .expect(201)
      .end((err, res) => {
        if (err) {
          expect.fail('', '', err);
          return;
        }
        done();
      })
  })
  it('should return 500 when looper running using post is fail', done => {
    supertest(app)
      .post(`/users/${USER}/loopers`)
      .expect(500)
      .end((err, res) => {
        if (err) {
          expect.fail('', '', err);
          return;
        }
        done();
      })
  })
});