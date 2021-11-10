import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Modal, Result } from "antd";
import random from "random";
import axios from "axios";
import { Parser } from "html-to-react";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "./ScoreContext";
import Loading from "./Loading";
const htmlToReactParser = new Parser();



const Trivia = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({ question: "" });
  const [answers, setAnswers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEndVisible, setEndVisible] = useState(false);
  const [answerRight, setAnswerRight] = useState(false);
  const [difficulty, setDifficulty] = useState();
  // const [score, setScore] = useState(0);
  const [score, setScore] = useContext(ScoreContext);

  useEffect(() => {
    // const i = random.int(0, 9);
    if (data.length > 0) getQuiz();
    else loadData();
  }, []);

  useEffect(() => {
    // console.log("DATA:", data);
    if (data.length > 0) getQuiz();
    
  }, [data]);

  const loadData = async () => {
    const _res = await axios.get("/trivia");
    // console.log("_res:", _res);
    setData(_res.data);
  };

  const getQuiz = () => {
    if (data.length === 0) {
      setEndVisible(true);
      setQuiz({ question: "" });
      setAnswers([]);
      return;
    }
    const i = random.int(0, data.length - 1);
    const quiz = data[i];
    // console.log(i, data);
    data.splice(i, 1);
    // console.log(i, data);
    // console.log(quiz);
    // setQuiz(data[i]);
    setQuiz(quiz);
    const answers = [
      ...quiz.incorrect_answers.map((e) => ({ desc: e, correct: false })),
      { desc: quiz.correct_answer, correct: true },
    ];
    setDifficulty(quiz.difficulty);
    shuffleArray(answers);
    setAnswers(answers);
  };

  const handleClick = (v) => {
    setIsModalVisible(true);
    setAnswerRight(v);
    // console.log("handleClick:", v, difficulty);
    if (v)
      switch (difficulty) {
        case "medium":
          // score += 2;
          setScore(score + 2);
          break;

        case "hard":
          // score += 3;
          setScore(score + 3);
          break;

        default:
          // score += 1;
          setScore(score + 1);
          break;
      }
    // setScore(score);
  };

  const nextQuestion = () => {
    setIsModalVisible(false);
    getQuiz();
  };

  const handleSaveScore = (r) => {
    // console.log("handleSaveScore:", r);
    if (r) {
      navigate("/register-score");
    } else {
      setEndVisible(false);
      navigate("/leaderboard");
    }
  };
  // console.log("isEndVisible:", isEndVisible, data.length, quiz);

  
  if (quiz.question === "" && isEndVisible === false)
    return <Loading size="large" />;
  else
    return (
      <>
        <div className="trivia">
          <div className="score-header">
            <Row>
              <Col span={12} offset={6}>
                <h3>
                  Question {10 - data.length} of 10 --- Your score: {score}
                </h3>
              </Col>
            </Row>
          </div>

          <Row>
            <Col span={12} offset={6} className="quiz-container">
              <div className="category">{quiz.category}</div>
              <div className="question">
                {htmlToReactParser.parse(quiz.question)}
              </div>
              <div className="answers">
                <Answers data={answers} handleClick={handleClick} />
              </div>
            </Col>
          </Row>
        </div>

        <Modal
          title="Result"
          visible={isModalVisible}
          // onOk={handleOk}
          // onCancel={false}
          footer={[
            <Button key={1} type="primary" onClick={nextQuestion}>
              Next
            </Button>,
          ]}
        >
          <Result
            status={answerRight ? "success" : "error"}
            title={answerRight ? "Good one!" : "Wrong!"}
          />
        </Modal>

        <Modal
          title="GAME OVER"
          visible={isEndVisible}
          // onOk={handleOk}
          // onCancel={false}
          footer={[
            <Button
              key={1}
              type="primary"
              onClick={() => handleSaveScore(true)}
            >
              Yes
            </Button>,
            <Button key={2} onClick={() => handleSaveScore(false)}>
              No
            </Button>,
          ]}
        >
          <p>Your score was {score}</p>
          <p>Do you wnat to save your score?</p>
        </Modal>
      </>
    );
};

export default Trivia;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const Answers = ({ data, handleClick }) => {
  // const data = [];
  // console.log("Answers:", data);
  return (
    <div>
      {data.map((a, index) => (
        <div key={index} style={{ padding: "5px 0 5px" }}>
          <Button
            // key={index}
            type="primary"
            block
            onClick={() => handleClick(a.correct)}
          >
            {htmlToReactParser.parse(a.desc)}
          </Button>
        </div>
      ))}
    </div>
  );
};
