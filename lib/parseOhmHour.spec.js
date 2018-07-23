const chai = require('chai');
const moment = require('moment-timezone');
const parseOhmHour = require('./parseOhmHour');
const { generateMessage } = require('./');

const { expect } = chai;

const link = 'https://bit.ly/18gECvy';
const [mega, normal] = ['🔥 MEGA #OhmHour', '#OhmHour'];

describe('parseOhmHour', () => {
  it('should parse today message', () => {
    const ohmHour = parseOhmHour(generateMessage('today', normal, 7, 9));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').format('dddd'),
      when: 'today',
      start: moment.tz('America/Los_Angeles').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').startOf('day').add(21, 'hours').toDate()
    });
  });
  it('should parse today message with tip', () => {
    const ohmHour = parseOhmHour(generateMessage('today', normal, 7, 9, null, 'You should save all the energy!'));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').format('dddd'),
      when: 'today',
      start: moment.tz('America/Los_Angeles').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').startOf('day').add(21, 'hours').toDate(),
      extra: 'You should save all the energy!'
    });
  });
  it('should parse today message with bonus', () => {
    const ohmHour = parseOhmHour(generateMessage('today', normal, 7, 9, 500));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').format('dddd'),
      when: 'today',
      start: moment.tz('America/Los_Angeles').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').startOf('day').add(21, 'hours').toDate(),
      extra: 'Get 500 bonus points when you use 0.412 kWh or less.'
    });
  });
  it('should parse today message with tip and bonus', () => {
    const ohmHour = parseOhmHour(generateMessage('today', normal, 7, 9, 500, 'A tip about things'));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').format('dddd'),
      when: 'today',
      start: moment.tz('America/Los_Angeles').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').startOf('day').add(21, 'hours').toDate(),
      extra: 'Get 500 bonus points when you use 0.412 kWh or less.  A tip about things'
    });
  });
  it('should parse tomorrow message', () => {
    const ohmHour = parseOhmHour(generateMessage('tomorrow', normal, 7, 9));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').add(1, 'day').format('dddd'),
      when: 'tomorrow',
      start: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(21, 'hours').toDate()
    });
  });
  it('should parse tomorrow message with tip', () => {
    const ohmHour = parseOhmHour(generateMessage('tomorrow', normal, 7, 9, null, 'You should save all the energy!'));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').add(1, 'day').format('dddd'),
      when: 'tomorrow',
      start: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(21, 'hours').toDate(),
      extra: 'You should save all the energy!'
    });
  });
  it('should parse tomorrow message with bonus', () => {
    const ohmHour = parseOhmHour(generateMessage('tomorrow', normal, 7, 9, 500));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').add(1, 'day').format('dddd'),
      when: 'tomorrow',
      start: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(21, 'hours').toDate(),
      extra: 'Get 500 bonus points when you use 0.412 kWh or less.'
    });
  });
  it('should parse tomorrow message with tip and bonus', () => {
    const ohmHour = parseOhmHour(generateMessage('tomorrow', normal, 7, 9, 500, 'A tip about things'));

    expect(ohmHour).to.deep.equal({
      type: normal,
      link,
      day: moment.tz('America/Los_Angeles').add(1, 'day').format('dddd'),
      when: 'tomorrow',
      start: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(19, 'hours').toDate(),
      end: moment.tz('America/Los_Angeles').add(1, 'day').startOf('day').add(21, 'hours').toDate(),
      extra: 'Get 500 bonus points when you use 0.412 kWh or less.  A tip about things'
    });
  });
  it('should parse over messages', () => {
    const ohmHour = parseOhmHour('#OhmHour is over. Your power is now coming from cleaner sources');

    expect(ohmHour).to.be.undefined;
  });
});
