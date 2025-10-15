import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../AuthContext"; // adjust path if needed

const socket = io("https://mind-ease-backend-n95p.onrender.com"); // backend URL

const Wchatapp = () => {
  const { user } = useAuth();
  const myEmail = user?.email || ""; // get logged-in email

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [id, setId] = useState(0);
  const [add, setAdd] = useState(true);
  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({}); // { chatId: [msg1, msg2] }

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => ({
        ...prev,
        [data.chatId]: [...(prev[data.chatId] || []), data],
      }));
    });

    return () => socket.off("receive_message");
  }, []);

  // Handle selecting a chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat.id);

    const roomId =
      myEmail > chat.email
        ? `${chat.email}_${myEmail}`
        : `${myEmail}_${chat.email}`;
    socket.emit("join-room", roomId);
  };

  // Send message
  const sendMessage = () => {
    if (!selectedChat || message.trim() === "") return;

    const chat = chats.find((c) => c.id === selectedChat);
    if (!chat) return;

    const roomId =
      myEmail > chat.email
        ? `${chat.email}_${myEmail}`
        : `${myEmail}_${chat.email}`;

    const msgData = {
      text: message,
      senderId: socket.id,
      room: roomId,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      chatId: selectedChat,
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  // Add new contact
  const AddDetail = () => {
    setId(id + 1);
    setChats((prev) => [...prev, { id: id + 1, name: addName, email: addEmail }]);
    setAdd(true);
    setAddName("");
    setAddEmail("");
  };

  return (
    <>
      {/* Display logged-in email */}
      <div className="p-4 text-primary font-semibold">Logged in as: {myEmail}</div>

      {/* Add new contact form */}
      {!add && (
        <div className="p-4 bg-card/80 rounded-lg m-4 shadow-md border border-primary/20">
          <label className="block text-primary font-semibold mb-1">Name</label>
          <input
            type="text"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            className="border border-primary/30 rounded-lg p-2 w-full mb-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <label className="block text-primary font-semibold mb-1">Email</label>
          <input
            type="email"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
            className="border border-primary/30 rounded-lg p-2 w-full mb-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={AddDetail}
            className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg shadow-glow hover:shadow-primary transition"
          >
            Add Contact
          </button>
        </div>
      )}

      {/* Chat UI */}
      {add && (
        <div className="h-screen grid grid-cols-[300px_1fr] bg-background">
          {/* Sidebar */}
          <div className="bg-card/80 border-r border-primary/20 flex flex-col">
            <h2 className="p-4 font-bold text-lg text-foreground">Chats</h2>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-3 cursor-pointer rounded-full mb-1 ${
                    selectedChat === chat.id
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "hover:bg-primary/10 text-foreground"
                  } transition`}
                >
                  {chat.name}
                </div>
              ))}
            </div>
            <button
              onClick={() => setAdd(false)}
              className="m-4 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg shadow-glow hover:shadow-primary transition"
            >
              Add New Contact
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-gradient-primary text-primary-foreground p-4 font-semibold shadow-md">
              {chats.find((c) => c.id === selectedChat)?.name || "Select a chat"}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-card/80">
              {(messages[selectedChat] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.senderId === socket.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl shadow-md text-sm ${
                      msg.senderId === socket.id
                        ? "bg-gradient-primary text-primary-foreground rounded-br-none"
                        : "bg-background text-foreground rounded-bl-none"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-card/80 flex items-center gap-2 border-t border-primary/20">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border border-primary/30 rounded-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full shadow-glow hover:shadow-primary transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wchatapp;
