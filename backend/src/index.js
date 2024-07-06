const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const { setupWebSocket } = require('./config/websocket');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

setupWebSocket(wss);

app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const userRoutes = require('./routes/userRoutes');
  app.use('/api/users', userRoutes);
  
app.use('/api/games', require('./routes/gameRoutes'));

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));