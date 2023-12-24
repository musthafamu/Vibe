// ChatWidget.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button } from '@mui/material';
import FlexBetween from '../../components/Flexbetween';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { colorToken } from '../../theme';
const socket = io.connect('http://localhost:3001'); // Update with your server URL

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const firstName = useSelector((state) => state.user.firstName);

  useEffect(() => {
    // Event listener for receiving chat messages
    const handleChatMessage = (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat message', handleChatMessage);

    // Cleanup when the component unmounts
    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      // Emit a chat message to the server
      socket.emit('chat message', { text: inputMessage, sender: firstName });

      // Clear the input field
      setInputMessage('');
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflowY: 'auto', padding: '1rem' }}>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            borderRadius:"10rem",
            padding:".5rem",
            '&:hover': {
                border: `1px solid ${colorToken.sky}`, // Add your desired border style here
              },
          }}
        >
            <Box sx={{display:"flex"}}>

          <Typography sx={{display:"flex"}}> <AccountCircleIcon/>{message.sender} :-</Typography>
          <Typography>{message.text}</Typography>
                </Box>
        </Box>
      ))}
      <FlexBetween sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '1rem', backgroundColor: '#fff' }}>
        <TextField
          id="outlined-basic"
          label="Type your message..."
          variant="outlined"
          fullWidth
          InputProps={{ style: { height: '40px', borderRadius: '8px' } }}
          InputLabelProps={{ style: { height: '40px', borderRadius: '8px' } }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button onClick={sendMessage} variant="contained" color="primary" style={{ height: '40px', borderRadius: '8px' }}>
          Send
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default ChatWidget;
