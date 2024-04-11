import StartChat from "@/components/StartChat/StartChat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <StartChat />
    </main>
  );
}
