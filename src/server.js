const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Criando servidor HTTP
const server = http.createServer(app);

// Configurando Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Evento de conexão
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Disponibilizando io para outros módulos
app.set("io", io);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
