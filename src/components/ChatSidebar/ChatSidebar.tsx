import styles from "./ChatSidebar.module.scss";
import { useEffect, useState } from "react";
import http from "../../http";
import { useContext, Types } from "../../context";

const ChatSidebar = () => {
  const { state, methods } = useContext();
  const [items, setItems] = useState<Types.User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null); // Track active user ID

  useEffect(() => {
    http.get("/admin").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleClick = (id: string) => {
    setActiveUserId(id); // Update active user ID
    methods.setChatUserId(id); // Call context method
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>Chats</div>
      <ul className={styles.chatList}>
        {items
          .filter((item) => item.id !== state.profile?.id)
          .map((item) => (
            <li
              key={item.id}
              className={`${styles.chatItem} ${
                activeUserId === item.id ? styles.active : ""
              }`}
              onClick={() => handleClick(item.id)}
            >
              {item.firstName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
