import React, { useState } from "react";
import styles from "./ChatInput.module.scss";

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSend(inputValue); // Send the message
      setInputValue(""); // Clear the input field
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
