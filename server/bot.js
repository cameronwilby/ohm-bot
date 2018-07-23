const Agenda = require('agenda');
const WifiPlug = require('../lib/wifiPlug');
const { logger } = require('../lib');

const bot = new Agenda({ db: { address: process.env.MONGODB_URI } });

bot.on('ready', () => {
  bot.define('on', async (job, done) => {
    logger.info('turning all devices on');
    try {
      const desktopPlug = new WifiPlug();

      await desktopPlug.turnOn();

      done();
    } catch (e) {
      done(e);
    }
  });

  bot.define('off', async (job, done) => {
    logger.info('turning all devices off');
    try {
      const desktopPlug = new WifiPlug();

      await desktopPlug.turnOff();

      done();
    } catch (e) {
      done(e);
    }
  });

  logger.info('bot started');
  bot.start();
});

module.exports = bot;