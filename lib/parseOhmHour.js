const moment = require('moment-timezone');
const convertTimeToDate = require('./convertTimeToDate');

module.exports = function parseOhmHour(message) {
  const split = decodeURIComponent(message).replace(/\+/g, ' ').split(' ');
  const day =  split[split.indexOf('from') - 1];
  const when = split[0].toLowerCase().trim();

  if (when !== 'today' && when !== 'tomorrow') return; // invalid sms

  const indices = {
    'when': message.indexOf(when),
    'from': message.indexOf('from'),
    '!': message.indexOf('!'),
    'forecast': Math.max(
      message.indexOf('Check out your forecast and tell us how you\'re saving.'),
      message.indexOf('Check out your forecast and plan how to save.')
    )
  };

  const range = message.substring(
    indices.from + 'from'.length,
    indices['!']
  ).trim();
  let [start, end] = range.split('-');
  const isPm = Boolean(end.indexOf('PM') + 1);
  start = moment(convertTimeToDate(start, isPm)).tz('America/Los_Angeles').add(Number(when === 'tomorrow'), 'days').toDate();
  end = moment(convertTimeToDate(end, isPm)).tz('America/Los_Angeles').add(Number(when === 'tomorrow'), 'days').toDate();

  const ohmHour = {
    type: message.substring(indices.when + when.length + 1, message.indexOf(day)).trim(),
    link: split[split.length - 1],
    day,
    when,
    start,
    end,
  };

  const extra = message.slice(indices['!'] + 1, indices.forecast).trim();
  if (extra) {
    ohmHour.extra = extra;
  }
  return ohmHour;
};
