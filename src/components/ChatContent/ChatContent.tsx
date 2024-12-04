import React, { useEffect, useState } from "react";
import styles from "./ChatContent.module.scss";
import { useContext } from "../../context";
import ChatInput from "../ChatInput/ChatInput";
import io from "socket.io-client";
import http from "../../http";

const socket = io("http://localhost:3000"); // Backend bilan bog'lanish

const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const { state } = useContext();

  useEffect(() => {
    if (state.chatUserId) {
      http
        .get(
          `/messages?senderId=${state.profile?.id}&receiverId=${state.chatUserId}`,
        )
        .then((response) => {
          console.log("fetch, setMessage");
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Failed to load messages", error);
        });
    }
  }, [state.chatUserId]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (
        (message.senderId === state.chatUserId &&
          message.receiverId === state.profile?.id) ||
        (message.senderId === state.profile?.id &&
          message.receiverId === state.chatUserId)
      ) {
        setMessages((prevMessages: any) => {
          console.log("useEffect, setMessage");
          return [...prevMessages, message];
        });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [state.chatUserId, state.profile?.id]);

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
  };

  return (
    <>
      <div className={styles.chatContent}>
        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.senderId === state.profile?.id
                  ? styles.sent
                  : styles.received
              }`}
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
