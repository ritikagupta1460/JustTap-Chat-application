import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatTile from "./ChatTile";
import Navbar from "./Navbar";
import "../styles/ChatWindow.css";

const ChatWindow = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState("Alice"); // Replace with logged-in user's ID or name

  useEffect(() => {
    if (!selectedContact) return;

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8080");

      ws.onopen = () => {
        console.log("Connected to WebSocket server");
        ws.send(JSON.stringify({ type: "connect", user }));
        ws.send(JSON.stringify({ type: "join", user, contact: selectedContact }));
      };

      ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage.sender === selectedContact || receivedMessage.receiver === selectedContact) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      };

      ws.onerror = (error) => console.error("WebSocket error:", error);

      ws.onclose = () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        socket.close();
      }
    };
  }, [selectedContact, user]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const messagePayload = {
      sender: user,
      receiver: selectedContact,
      text: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    setMessages((prevMessages) => [...prevMessages, messagePayload]); // Ensure instant UI update
    socket.send(JSON.stringify(messagePayload));
    setNewMessage("");
  };

  const sendFile = (file) => {
    const filePayload = {
      sender: user,
      receiver: selectedContact,
      timestamp: new Date().toISOString(),
      type: "file",
      content: URL.createObjectURL(file),
    };

    setMessages((prevMessages) => [...prevMessages, filePayload]);
    socket.send(JSON.stringify(filePayload));
  };

  const sendImage = (image) => {
    const imagePayload = {
      sender: user,
      receiver: selectedContact,
      timestamp: new Date().toISOString(),
      type: "image",
      content: image,
    };

    setMessages((prevMessages) => [...prevMessages, imagePayload]);
    socket.send(JSON.stringify(imagePayload));
  };

  const sendLocation = (location) => {
    const locationPayload = {
      sender: user,
      receiver: selectedContact,
      timestamp: new Date().toISOString(),
      type: "location",
      content: location,
    };

    setMessages((prevMessages) => [...prevMessages, locationPayload]);
    socket.send(JSON.stringify(locationPayload));
  };

  return (
    <div className="chat-app">
      <Sidebar
        setSelectedChat={setSelectedContact}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="chat-window">
        <Navbar />
        {selectedContact ? (
          <ChatTile
            selectedContact={selectedContact}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={sendMessage}
            onFileSend={sendFile}
            onImageSend={sendImage}
            onLocationSend={sendLocation}
          />
        ) : (
          <div className="placeholder">
            <h2>Select a contact to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
