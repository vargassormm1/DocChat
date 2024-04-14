"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import QACard from "@/components/QACard/QACard";
import { Input } from "antd";
import { getAIResponse } from "@/utils/api";
import { useParams } from "next/navigation";
import { Spin, Alert, Space, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const Chat = () => {
  const chatHistoryRef = useRef(null);
  const { filename } = useParams();
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "PDF Buddy: ",
      content:
        "Welcome! Do you have any questions about the PDF you just uploaded? Feel free to ask anything, and I'll do my best to assist you.",
    },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const onSend = async () => {
    try {
      setMessage("");
      setChatHistory((prev) => [...prev, { role: "You:", content: message }]);
      setLoading(true);
      const response = await getAIResponse(filename, message);
      setChatHistory((prev) => [
        ...prev,
        { role: "PDF Buddy: ", content: response },
      ]);
    } catch (error) {
      setError(true);
      setErrorMessage(`Error fetching AI response`);
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

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
      <div ref={chatHistoryRef} className={styles.chatHistory}>
        {chatHistory.map((el, id) => {
          return <QACard key={id} user={el.role} content={el.content} />;
        })}
        {loading ? <Spin /> : <></>}
      </div>
      <div className={styles.chatForm}>
        <Space.Compact
          style={{
            alignSelf: "center",
            justifySelf: "center",
            width: "100%",
          }}
        >
          <Input
            size="large"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message AI Helper"
          />
          <Button size="large" onClick={onSend} type="primary">
            <SendOutlined />
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default Chat;
