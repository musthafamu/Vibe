// socket.js

import { Server } from 'socket.io';

export const configureSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Handle chat messages
    socket.on('chat message', (message) => {
      // Broadcast the message to all connected clients
      console.log(message);
      io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
