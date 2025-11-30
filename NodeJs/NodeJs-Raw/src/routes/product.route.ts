import { Message } from "./../../node_modules/esbuild/lib/main.d";
import { IncomingMessage, ServerResponse } from "http";

const productRoute = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (method == "GET" && url == "/") {
    res.writeHead(200, { "content-type": "application.json" });
    res.end(
      JSON.stringify({
        message: "This is root url",
        status: "OK",
      })
    );
  } else {
    //handling errors.. Confirming that our server not crash
    res.writeHead(404, { "content-type": "application.json" });
    res.end(
      JSON.stringify({
        message: "There is nothing",
        status: "404",
      })
    );
  }
};
export default productRoute;
