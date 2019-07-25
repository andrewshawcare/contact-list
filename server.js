if (process.env.NEWRELIC_ENABLED) {
  require('newrelic');
}
const nodeStatic = require('node-static');
const http = require('http');

const staticServer = new nodeStatic.Server('./dist', { gzip: true });
const httpServer = http.createServer((request, response) => {
  request.addListener('end', () => {
    staticServer.serve(request, response);
  }).resume();
});

httpServer.listen(process.env.PORT);

console.log(`Server running on port ${process.env.PORT}`);
