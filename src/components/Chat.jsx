import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const [firstName, lastName, userId] = [
    user?.firstName,
    user?.lastName,
    user?._id,
  ];

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    try {
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as page loaded, socket connection is established and joinchat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text, photoUrl }) => {
      setMessages((messages) => [...messages, { firstName, text, photoUrl }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = (message) => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
      photoUrl: user.photoUrl,
    });
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-base-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder (replace with target photo if you have) */}
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-base-300" />
            </div>

            <div className="leading-tight">
              <h1 className="font-bold text-base">Chat</h1>
              <p className="text-xs opacity-70">with {targetUserId}</p>
            </div>
          </div>

          <button className="btn btn-sm btn-ghost">⋯</button>
        </div>

        {/* Messages */}
        <div className="h-[70vh] overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, index) => {
            console.log("msg object:", msg);
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="avatar" src={msg?.photoUrl} />
                  </div>
                </div>
                <div className="chat-header">
                  {msg?.firstName}
                  <time className="text-xs opacity-50">12:00</time>
                </div>
                <div className="chat-bubble">{msg?.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}

          {/* Outgoing message example */}
          <div className="flex justify-end">
            {/* <div className="max-w-[75%] rounded-2xl rounded-br-md bg-pink-500 text-white px-4 py-2 text-sm">
              Hi! How’s it going?
            </div> */}
          </div>

          {/* Add your mapped messages here */}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-base-300">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-circle btn-sm bg-base-300 border-0"
              title="Add"
            >
              +
            </button>

            <input
              value={newMessage}
              className="input input-bordered w-full rounded-full"
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button
              className="btn btn-circle btn-sm bg-pink-500 text-white border-0 hover:bg-pink-600"
              title="Send"
              onClick={sendMessage}
            >
              ➤
            </button>
          </div>

          {/* Bottom actions (optional) */}
          <div className="mt-3 flex justify-between">
            <button className="btn btn-sm btn-ghost">Logout</button>
            <button className="btn btn-sm btn-ghost">Block</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
