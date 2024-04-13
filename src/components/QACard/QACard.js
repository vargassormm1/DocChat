import styles from "./QACard.module.css";

const QACard = ({ user, content }) => {
  return (
    <div>
      <h3>Name: {user}</h3>
      <p>{content}</p>
    </div>
  );
};

export default QACard;
