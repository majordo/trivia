import { useContext } from "react";
import AddUser from "./AddUser";
import { ScoreContext } from "./ScoreContext";

const RegisterScore = () => {
  const [score] = useContext(ScoreContext);
  return (
    <div className="register-score-steps">
      <h1>Register your score</h1>
      <h3>You scored {score}</h3>
      <p>Before saving your score you need to register :)</p>
      <AddUser />
    </div>
  );
};

export default RegisterScore;
