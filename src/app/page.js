import FileUpload from "@/components/FileUpload/FileUpload";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <FileUpload />
    </main>
  );
}
