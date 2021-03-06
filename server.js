const app = require('./app');
const { logger } = require('./util');
const { PORT } = process.env;

app.listen(PORT, () => logger.info(`Server is listening on port [${PORT}]`));
