import styles from "./ChatPage.module.scss";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import ChatContent from "../ChatContent/ChatContent";

const ChatPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <div className={styles.chatPage}>
      <ChatSidebar />
      <div className={styles.chatSection}>
        <div className={styles.btn} onClick={handleLogout}>
          Logout
        </div>
        <ChatContent />
      </div>
    </div>
  );
};

export default ChatPage;
