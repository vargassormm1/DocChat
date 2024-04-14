import FileUpload from "@/components/FileUpload/FileUpload";
import styles from "./page.module.css";
import InstructionCard from "@/components/InstructionCard/InstructionCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>Welcome to AskPDF!</h2>
        <p>
          Upload any PDF file and chat with our AI assistant to get insights,
          summaries, or answers to your questions about the content.
        </p>
      </div>
      <div className={styles.instructionCards}>
        <InstructionCard
          step="1"
          title="Upload PDF"
          description="Select any PDF file from your device and upload it to our system."
        />
        <InstructionCard
          step="2"
          title="Chat with AI"
          description="Once the upload is complete, you'll be redirected to a chat page where you can ask our AI assistant anything about the PDF."
        />
        <InstructionCard
          step="3"
          title="Get Answers"
          description="Receive insightful summaries, answers, or information about the uploaded PDF from our AI assistant."
        />
      </div>
      <FileUpload />
    </main>
  );
}
