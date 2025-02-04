import React, { useState } from "react";
import { FaSearch, FaUsers, FaUserPlus } from "react-icons/fa";
import "../styles/Sidebar.css";

// Import images
import teamLogo from "./images/teamLogo.png";
import ritikaImg from "./images/Ritika.png";
import priyalImg from "./images/priyal.png";
import pragyaImg from "./images/pragya.png";
import anujImg from "./images/anuj.png";
import astitvaImg from "./images/astitva.png";
import kashishImg from "./images/kashish.png";
import neelImg from "./images/neel.png";
import anjaliImg from "./images/anjali.png";
import amanImg from "./images/aman.jpg";
import shivamImg from "./images/shivam.png";
import yashrajImg from "./images/yashraj.png";
import kasukabeImg from "./images/kasukabe.png";

const Sidebar = ({ setSelectedChat, searchQuery, setSearchQuery }) => {
  const [searchResultMessage, setSearchResultMessage] = useState("");
  const [chats, setChats] = useState([
    { id: 1, name: "Family Group", type: "group", img: teamLogo, lastMessage: "Last message..." },
    { id: 3, name: "Ritika", type: "contact", img: ritikaImg, lastMessage: "Who's online?" },
    { id: 2, name: "Priyal", type: "contact", img: priyalImg, lastMessage: "Work related message..." },
    { id: 4, name: "Pragya", type: "contact", img: pragyaImg, lastMessage: "Hey, how are you?" },
    { id: 5, name: "Anuj", type: "contact", img: anujImg, lastMessage: "Can we meet tomorrow?" },
    { id: 6, name: "Astitva", type: "contact", img: astitvaImg, lastMessage: "Let's grab coffee soon!" },
    { id: 7, name: "Kashish", type: "contact", img: kashishImg, lastMessage: "Did you receive my email?" },
    { id: 8, name: "Neel", type: "contact", img: neelImg, lastMessage: "See you in the office." },
    { id: 9, name: "Anjali", type: "contact", img: anjaliImg, lastMessage: "You need my help?" },
    { id: 10, name: "Aman", type: "contact", img: amanImg, lastMessage: "Let's discuss the contract." },
    { id: 11, name: "Shivam", type: "contact", img: shivamImg, lastMessage: "Let's discuss the contract." },
    { id: 12, name: "Yashraj", type: "contact", img: yashrajImg, lastMessage: "Let's discuss the contract." },
    { id: 13, name: "Friends", type: "group", img: kasukabeImg, lastMessage: "Let's discuss the contract." },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const searchResult = chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchResult.length > 0) {
      setSearchResultMessage("");
      setSelectedChat(searchResult[0]);
    } else {
      setSearchResultMessage("No matching contacts or groups.");
    }
  };

  const handleNewChat = () => {
    const chatName = prompt("Enter the name of the new contact:");
    if (!chatName || chatName.trim() === "") return; // Prevent empty input

    const chatImg = prompt("Enter the profile image URL (or leave blank):");
    const firstMessage = prompt("Enter the first message (or leave blank):");

    setChats([
      ...chats,
      {
        id: Date.now(), // Ensures unique ID
        name: chatName.trim(),
        type: "contact",
        img: chatImg || "",
        lastMessage: firstMessage || "New chat started...",
      },
    ]);
  };

  const handleNewGroup = () => {
    const groupName = prompt("Enter the name of the new group:");
    if (!groupName || groupName.trim() === "") return; // Prevent empty input

    const groupImg = prompt("Enter the group image URL (or leave blank):");
    const firstMessage = prompt("Enter the first message (or leave blank):");

    setChats([
      ...chats,
      {
        id: Date.now(),
        name: groupName.trim(),
        type: "group",
        img: groupImg || "",
        lastMessage: firstMessage || "Group chat started...",
      },
    ]);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-header">Chats</h2>

      <form className="sidebar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sidebar-search-input"
        />
        <button type="submit" className="sidebar-search-btn">
          <FaSearch className="sidebar-search-icon" />
        </button>
      </form>

      <div className="sidebar-actions">
        <button className="sidebar-action-btn" onClick={handleNewChat}>
          <FaUserPlus className="sidebar-action-icon" /> New Chat
        </button>
        <button className="sidebar-action-btn" onClick={handleNewGroup}>
          <FaUsers className="sidebar-action-icon" /> New Group
        </button>
      </div>

      {searchResultMessage && (
        <div className="search-result-message">{searchResultMessage}</div>
      )}

      <div className="sidebar-chat-list">
        {chats
          .filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((chat) => (
            <div key={chat.id} className="sidebar-chat-item" onClick={() => setSelectedChat(chat)}>
              {chat.img ? (
                <img src={chat.img} alt={chat.name} className="sidebar-chat-avatar" />
              ) : (
                <div className="sidebar-chat-avatar-placeholder">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="sidebar-chat-info">
                <h3 className="sidebar-chat-name">{chat.name}</h3>
                <p className="sidebar-chat-message">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
