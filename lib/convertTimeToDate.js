const moment = require('moment-timezone');

module.exports = function convertTimeToDate(time, isPm) {
  time = time.toString().toLowerCase();
  isPm = Boolean(time.indexOf('pm') + 1) || Boolean(isPm);
  return moment.tz('America/Los_Angeles')
    .startOf('day')
    .add(
      Number(time.replace(/(am|pm)/g, ''))
      +
      Number(isPm && 12),
      'hours'
    ).toDate();
};
