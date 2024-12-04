import React, { useEffect, useState } from "react";
import styles from "./ChatContent.module.scss";
import { useContext } from "../../context";
import ChatInput from "../ChatInput/ChatInput.tsx";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to the backend server

const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);

  const { state } = useContext();

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  if (!state.chatUserId)
    return (
      <div className={styles.chatContent}>
        Please select a user to start chat
      </div>
    );

  const sendMessage = (content: any) => {
    const message = {
      senderId: state.profile?.id,
      receiverId: state.chatUserId,
      content,
    };

    socket.emit("sendMessage", message);

    setMessages((prevMessages: any) => [
      ...prevMessages,
      { ...message, self: true },
    ]);
  };

  return (
    <>
      <div className={styles.chatContent}>
        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.self ? styles.sent : styles.received}`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
      <ChatInput onSend={sendMessage} />
    </>
  );
};

export default ChatContent;
