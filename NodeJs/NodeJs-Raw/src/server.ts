import http, { Server } from "http";
const server: Server = http.createServer((req, res) => {
  console.log("server is running");
  if (req.url == "/" && req.method == "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: " Node js with the typescript",
        path: req.url,
      })
    );
  }
});

server.listen(8000, () => {
  console.log(`Server is running on port ${8000}`);
});
