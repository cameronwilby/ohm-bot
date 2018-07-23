const moment = require('moment-timezone');

const link = 'https://bit.ly/18gECvy';

module.exports = function generateMessage(when, type, start, end, bonus, tip) {
  const day = moment.tz('America/Los_Angeles').add(Number(when === 'tomorrow'), 'days');
  const bonusMessage = bonus ? ` Get ${bonus} bonus points when you use 0.412 kWh or less. ` : '';
  const tipMessage = tip ? ` ${tip}` : '';
  return `${when.toUpperCase()} ${type} ${day.format('dddd')} from ${start} - ${end}PM!${bonusMessage}${tipMessage} Check out your forecast and plan how to save. ${link}`;
};
