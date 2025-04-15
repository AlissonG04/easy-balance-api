// src/ws/socketServer.js
const WebSocket = require("ws");

let wss;

function criarServidorSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("🔗 Cliente WebSocket conectado");

    ws.send(JSON.stringify({ message: "Conexão WebSocket ativa" }));

    ws.on("close", () => {
      console.log("❌ Cliente WebSocket desconectado");
    });
  });
}

function emitirPeso(balancaId, peso) {
  const payload = JSON.stringify({ balanca: balancaId, peso });

  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }
}

module.exports = {
  criarServidorSocket,
  emitirPeso,
};
