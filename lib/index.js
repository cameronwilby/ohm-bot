const Winston = require('winston');

module.exports = {
  convertTimeToDate: require('./convertTimeToDate'),
  parseOhmHour: require('./parseOhmHour'),
  generateMessage: require('./generateMessage'),

  logger: new Winston.Logger({
    level: 'info',
    transports: [
      new Winston.transports.Console({
        json: false,
        prettyPrint: JSON.stringify,
        stderrLevels: ['error'],
        timestamp: true,
      })
    ]
  })
};
