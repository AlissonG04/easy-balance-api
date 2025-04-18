const net = require("net");
const { emitirPeso } = require("../ws/socketServer");
require("dotenv").config();

function conectarBalança(id, ip, porta) {
  const socket = new net.Socket();

  const reconectar = () => {
    console.log(`Tentando conectar à ${id} em ${ip}:${porta}...`);
    socket.connect(porta, ip);
  };

  socket.on("connect", () => {
    console.log(`Conectado à ${id} (${ip}:${porta})`);
  });

  socket.on("data", (data) => {
    const peso = data.toString().trim();
    console.log(`⚖️ Peso recebido da ${id}: ${peso}`);

    // Emitir via WebSocket
    emitirPeso(id, peso);
  });

  socket.on("error", (err) => {
    console.error(`Erro na conexão com ${id}:`, err.message);
    setTimeout(reconectar, 5000);
  });

  socket.on("close", () => {
    console.warn(`Conexão com ${id} encerrada. Reconectando...`);
    setTimeout(reconectar, 5000);
  });

  reconectar();
}

function iniciarClientesBalanças() {
  conectarBalança(
    "balanca01",
    process.env.BALANCA01_IP,
    process.env.BALANCA01_PORTA
  );
  conectarBalança(
    "balanca02",
    process.env.BALANCA02_IP,
    process.env.BALANCA02_PORTA
  );
}

module.exports = iniciarClientesBalanças;
