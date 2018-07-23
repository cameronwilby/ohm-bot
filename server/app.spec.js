const bot = require('./bot');
const app = require('./app')(bot);
const moment = require('moment-timezone');
const chai = require('chai');
const { generateMessage } = require('../lib');

chai.use(require('chai-http'));

const { expect } = chai;

describe('http routes', () => {
  describe('GET /health', () => {
    it('should respond 200', () =>
      chai.request(app).get('/health').then(response => {
        expect(response).to.have.status(200);
      })
    );
  });

  describe('POST /sms', () => {
    it('should create 2 jobs and respond 200 when a valid message is provided', () => {
      const message = generateMessage('tomorrow', '🔥 MEGA #OhmHour', 7, 9, 500);
      return chai.request(app).post('/sms').send({ message }).then(response => {
        expect(response).to.have.status(200);
        expect(response.body.length).to.equal(2);
      });
    });
  });
});