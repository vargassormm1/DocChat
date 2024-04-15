import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <h1>
        <a href="/">DocChat</a>
      </h1>
      <p>Ask Away, Learn Instantly.</p>
    </div>
  );
};

export default Logo;
