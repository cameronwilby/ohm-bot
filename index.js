require('dotenv').config();
const bot = require('./server/bot');
const app = require('./server/app')(bot);
const { logger } = require('./lib');

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Listening on port ${port}`));
