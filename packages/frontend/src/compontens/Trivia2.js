import { useTrivia } from "../hooks/trivia";
import Loading from "./Loading";
import { Row, Col, Button, Modal, Result, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ScoreContext } from "./ScoreContext";
import { Parser } from "html-to-react";
const htmlToReactParser = new Parser();

const Trivia = () => {
  const navigate = useNavigate();
  const { quiz, loading, next, checkResponse, done } = useTrivia();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [answerRight, setAnswerRight] = useState(false);
  // console.log(loading, data, session);
  // if (quiz) console.log(quiz);
  const [score, setScore] = useContext(ScoreContext);

  const handleClick = async (v) => {
    const res = await checkResponse(quiz.index, v);
    // console.log("handleClick:", v, res.data);
    if (res.data?.correct) {
      setAnswerRight(true);
      setScore(score + res.data.score);
    } else {
      setAnswerRight(false);
    }
    setIsModalVisible(true);
  };

  const handleNext = () => {
    setIsModalVisible(false);
    next();
  };

  const handleSaveScore = (r) => {
    console.log("handleSaveScore:", r);
    if (r) {
      navigate("/register-score");
    } else {
      navigate("/leaderboard");
    }
  };

  // console.log("DONE:", done);
  if (done === true) return <GameOver handleSaveScore={handleSaveScore} />;
  else if (loading || quiz === null) return <Loading size="large" />;
  else
    return (
      <>
        <div className="trivia">
          <div className="score-header">
            <Row>
              <Col span={12} offset={6}>
                <h3>
                  Question {quiz.index + 1} of 10 --- Your score: {score}
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
                <Answers data={quiz.answers} handleClick={handleClick} />
              </div>
              {/* <Button onClick={next}>next</Button> */}
            </Col>
          </Row>
        </div>

        <Modal
          title="Result"
          visible={isModalVisible}
          // onOk={handleOk}
          // onCancel={false}
          footer={[
            <Button key={1} type="primary" onClick={handleNext}>
              Next
            </Button>,
          ]}
        >
          <Result
            status={answerRight ? "success" : "error"}
            title={answerRight ? "Good one!" : "Wrong!"}
          />
        </Modal>
      </>
    );
};

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
            onClick={() => handleClick(a)}
          >
            {htmlToReactParser.parse(a)}
          </Button>
        </div>
      ))}
    </div>
  );
};

const GameOver = ({ handleSaveScore }) => {
  const [score] = useContext(ScoreContext);
  return (
    <div className="game-over">
      <h1>GAME OVER</h1>
      <p>Your score was {score}</p>
      <p>Do you wnat to save your score?</p>
      <div>
        <Space>
          <Button primary="true" onClick={() => handleSaveScore(true)}>
            Yes
          </Button>
          <Button onClick={() => handleSaveScore(false)}>No</Button>
        </Space>
      </div>
    </div>
  );
};

export default Trivia;
