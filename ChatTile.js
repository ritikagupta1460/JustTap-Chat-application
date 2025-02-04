import React, { useState } from "react"; 
import { FiPaperclip, FiSmile } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { FaCamera, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import "../styles/ChatTile.css";

const ChatTile = ({
  currentUser,
  selectedContact,
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  onFileSend,
  onLocationSend,
  onImageSend,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const emojiList = ["😀", "😂", "😍", "😢", "😎", "😡", "🤔", "🥳", "👍", "🙏"];

  let videoStream = null;

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleCameraClick = async () => {
    if (!isCameraOpen && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStream = stream;
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      document.body.appendChild(video);

      const canvas = document.createElement("canvas");
      video.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        const image = canvas.toDataURL("image/png");
        onImageSend(image);

        stream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(video);
      });

      setIsCameraOpen(true);
    }
  };

  const handleCloseCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSend(file);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onLocationSend(location);
      });
    }
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      onSendMessage();
    }
  };

  return (
    <div className="chat-tile">
      <div className="chat-header">
        <img
          src={selectedContact?.img || "default-profile.png"}
          alt={selectedContact?.name || "Group"}
          className="chat-profile-pic"
        />
        <div className="chat-header-info">
          <h2>{selectedContact?.name || "Other"}</h2>
          <p>{selectedContact?.description || "online"}</p>
        </div>
      </div>

      <div className="chat-content">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((message, index) => {
            const isSentByCurrentUser = message.sender === currentUser;

            return (
              <div key={index} className={`message ${isSentByCurrentUser ? "sent" : "received"}`}>
                {message.type === "text" ? (
                  <p>{message.text}</p>
                ) : message.type === "image" ? (
                  <img src={message.content} alt="sent" className="sent-image" />
                ) : message.type === "file" ? (
                  <a href={message.content} download>
                    Download File
                  </a>
                ) : message.type === "location" ? (
                  <a
                    href={`https://www.google.com/maps?q=${message.content.latitude},${message.content.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Location
                  </a>
                ) : null}
                <span className="timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="chat-input">
        <FiSmile className="input-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojiList.map((emoji, index) => (
              <span key={index} className="emoji" onClick={() => handleEmojiClick(emoji)}>
                {emoji}
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <label>
          <FiPaperclip className="input-icon" />
          <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
        </label>
        <FaCamera className="input-icon" onClick={handleCameraClick} />
        <FaMapMarkerAlt className="input-icon" onClick={handleLocationClick} />
        <button className="send-button" onClick={handleSend}>
          <IoSend />
        </button>
      </div>

      {isCameraOpen && (
        <div className="camera-overlay">
          <button className="close-camera-btn" onClick={handleCloseCamera}>
            <FaTimes />
          </button>
          <video id="camera-video" />
        </div>
      )}
    </div>
  );
};

export default ChatTile;
