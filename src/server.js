const http = require("http");
const app = require("./http/expressServer");
const { criarServidorSocket } = require("./ws/socketServer");

const iniciarClientesBalanças = require("./tcp/tcpServer");
require("dotenv").config();

const PORTA_WEB = process.env.PORTA_WEB || 3000;

const server = http.createServer(app);

// Iniciar WebSocket
criarServidorSocket(server);

// Iniciar TCP
iniciarClientesBalanças();

// Iniciar HTTP
server.listen(PORTA_WEB, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${PORTA_WEB}`);
});
