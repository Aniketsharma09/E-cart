const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Disable static file serving (no 'public' folder)
const middlewares = jsonServer.defaults({ static: null });

const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
