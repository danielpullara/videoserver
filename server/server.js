const http = require('http');

const app = require('./App');
const config = require('config');

const port = config.port;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is ${server.listening ? 'listening' : 'NOT listening'} on port ${port} in ${config.isProduction ? 'production' : 'development'} mode.`);
});
