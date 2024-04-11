import styles from "./StartChat.module.css";
import FileUpload from "../FileUpload/FileUpload";

const StartChat = () => {
  return (
    <div className={styles.container}>
      <FileUpload />
      <button>Upload PDF</button>
    </div>
  );
};

export default StartChat;
