"use client";

import { useState } from "react";
import styles from "./chat.module.css";
import QACard from "@/components/QACard/QACard";
import { Input } from "antd";
import { getAIResponse } from "@/utils/api";
import { useParams } from "next/navigation";
import { Spin, Alert, Space } from "antd";

const Chat = () => {
  const { filename } = useParams();
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Do you have any questions about the PDF you just gave me?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSend = async () => {
    try {
      setMessage("");
      setChatHistory((prev) => [...prev, { role: "You", content: message }]);
      setLoading(true);
      const response = await getAIResponse(filename, message);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      setError(true);
      setErrorMessage(`Error fetching AI response`);
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {error ? (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Alert message={errorMessage} type="error" />
        </Space>
      ) : (
        <></>
      )}
      <div className={styles.chatHistory}>
        {chatHistory.map((el, id) => {
          return <QACard key={id} user={el.role} content={el.content} />;
        })}
        {loading ? <Spin /> : <></>}
      </div>
      <div className={styles.chatForm}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message AI Helper"
          className={styles.chatInput}
        />
        <button onClick={onSend} className={styles.chatButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
