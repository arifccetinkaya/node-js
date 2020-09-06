const expect = require('chai').expect;
const server = require('../server');
const request = require('supertest');
const conn = require('../config/db');

describe('POST /searchRecords', function () {
  it('should search records and respond with JSON', function () {
    before((done) => {
      conn
        .connectDB()
        .then(() => done())
        .catch((err) => done(err));
    });

    after((done) => {
      conn
        .disconnectDB()
        .then(() => done())
        .catch((err) => done(err));
    });

    request(server)
      .post('/api/v1/records')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 300,
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('createdAt');
        expect(body).to.contain.property('totalCount');
        expect(body).to.contain.property('key');
        done();
      });
  });
});
