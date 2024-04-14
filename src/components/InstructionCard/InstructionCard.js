import styles from "./InstructionCard.module.css";
const InstructionCard = ({ step, title, description }) => {
  return (
    <div className={styles.instructionCard}>
      {/* <div className={styles.step}>{step}</div> */}
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InstructionCard;
