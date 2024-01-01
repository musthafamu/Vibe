
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

   
    socket.on('chat message', (message) => {
     
      console.log(message);
      io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

