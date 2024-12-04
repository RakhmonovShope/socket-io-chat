import React, { useState } from "react";
import styles from "./ChatInput.module.scss";

interface IProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<IProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
