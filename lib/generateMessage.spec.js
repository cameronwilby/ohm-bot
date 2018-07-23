const chai = require('chai');
const generateMessage = require('./generateMessage');
const moment = require('moment-timezone');

const { expect } = require('chai');

const link = 'https://bit.ly/18gECvy';
const [mega, normal] = ['🔥 MEGA #OhmHour', '#OhmHour'];

describe('generateMessage', () => {
  it('should generate today message', () => {
    const message = generateMessage('today', normal, 6, 7);
    
    expect(message).to.equal(`TODAY #OhmHour ${moment.tz('America/Los_Angeles').format('dddd')} from 6 - 7PM! Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate today message with tip', () => {
    const message = generateMessage('today', normal, 6, 7, null, 'do stuff');
    
    expect(message).to.equal(`TODAY #OhmHour ${moment.tz('America/Los_Angeles').format('dddd')} from 6 - 7PM! do stuff Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate today message with bonus', () => {
    const message = generateMessage('today', normal, 6, 7, 500);
    
    expect(message).to.equal(`TODAY #OhmHour ${moment.tz('America/Los_Angeles').format('dddd')} from 6 - 7PM! Get 500 bonus points when you use 0.412 kWh or less.  Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate today message with tip and bonus', () => {
    const message = generateMessage('today', normal, 6, 7, 500, 'Time to save energy and do something spontaneous. Show that calendar who is boss.');
    
    expect(message).to.equal(`TODAY #OhmHour ${moment.tz('America/Los_Angeles').format('dddd')} from 6 - 7PM! Get 500 bonus points when you use 0.412 kWh or less.  Time to save energy and do something spontaneous. Show that calendar who is boss. Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate tomorrow message', () => {
    const message = generateMessage('tomorrow', normal, 6, 7);
    
    expect(message).to.equal(`TOMORROW #OhmHour ${moment.tz('America/Los_Angeles').add(1, 'day').format('dddd')} from 6 - 7PM! Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate tomorrow message with tip', () => {
    const message = generateMessage('tomorrow', normal, 6, 7, null, 'do stuff');
    
    expect(message).to.equal(`TOMORROW #OhmHour ${moment.tz('America/Los_Angeles').add(1, 'day').format('dddd')} from 6 - 7PM! do stuff Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate tomorrow message with bonus', () => {
    const message = generateMessage('tomorrow', normal, 6, 7, 500);
    
    expect(message).to.equal(`TOMORROW #OhmHour ${moment.tz('America/Los_Angeles').add(1, 'day').format('dddd')} from 6 - 7PM! Get 500 bonus points when you use 0.412 kWh or less.  Check out your forecast and plan how to save. ${link}`);
  });
  it('should generate tomorrow message with tip and bonus', () => {
    const message = generateMessage('tomorrow', normal, 6, 7, 500, 'Time to save energy and do something spontaneous. Show that calendar who is boss.');
    
    expect(message).to.equal(`TOMORROW #OhmHour ${moment.tz('America/Los_Angeles').add(1, 'day').format('dddd')} from 6 - 7PM! Get 500 bonus points when you use 0.412 kWh or less.  Time to save energy and do something spontaneous. Show that calendar who is boss. Check out your forecast and plan how to save. ${link}`);
  });
});
