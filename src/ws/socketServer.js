module.exports = function criarServidorSocket(server) {
  const WebSocket = require("ws");
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Novo cliente WebSocket conectado");

    ws.send(JSON.stringify({ message: "Conexão WebSocket ativa" }));

    ws.on("message", (message) => {
      console.log("Mensagem recebida do cliente:", message);
    });

    ws.on("close", () => {
      console.log("Cliente WebSocket desconectado");
    });
  });
};
