const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { parseOhmHour, logger } = require('../lib');

module.exports = (bot) => {
  const app = express();

  app.use(morgan('combined'));
  app.use(bodyParser.json());

  app.get('/health', (req, res) => {
    res.status(200).json();
  });

  app.post('/sms', async (req, res) => {
    const ohmHour = parseOhmHour(req.body.message);

    const jobs = [];

    logger.info(`scheduling device power off for ${ohmHour.start}`);
    const turnOffJob = bot.create('off');
    turnOffJob.schedule(ohmHour.start);
    await turnOffJob.save();

    logger.info(`scheduling device power on for ${ohmHour.end}`);
    const turnOnJob = bot.create('on');
    turnOnJob.schedule(ohmHour.end);
    await turnOnJob.save();

    res.status(200).json([turnOffJob, turnOnJob]);
  });

  return app;
};