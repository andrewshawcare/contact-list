const nodeStatic = require("node-static");
const http = require("http");

const staticServer = new nodeStatic.Server("./dist", { gzip: true });
const httpServer = http.createServer((request, response) => {
  request
    .addListener("end", () => {
      staticServer.serve(request, response);
    })
    .resume();
});

const port = 8080;

httpServer.listen(port);

console.log(`Server running on port ${port}`);
