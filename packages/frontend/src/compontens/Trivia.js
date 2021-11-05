import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Result } from "antd";
import random from "random";
// const HtmlToReactParser = require("html-to-react").Parser;
import { Parser } from "html-to-react";
const htmlToReactParser = new Parser();

const data = [
  {
    category: "Entertainment: Books",
    type: "boolean",
    difficulty: "easy",
    question:
      "The &quot;Berenstein Bears&quot; is the correct spelling of the educational children&#039;s book series&#039; name.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "easy",
    question:
      "What name was historically used for the Turkish city currently known as Istanbul?",
    correct_answer: "Constantinople",
    incorrect_answers: [
      "H&uuml;davendigar",
      "S&ouml;\u011f&uuml;t",
      "Adrianople",
    ],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "A bear does NOT defecate during hibernation. ",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "What is the Italian word for &quot;tomato&quot;?",
    correct_answer: "Pomodoro",
    incorrect_answers: ["Aglio", "Cipolla", "Peperoncino"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "The creeper in Minecraft was the result of a bug while implementing which creature?",
    correct_answer: "Pig",
    incorrect_answers: ["Zombie", "Chicken", "Cow"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "&quot;Gimmick!&quot; is a Japanese Famicom game that uses a sound chip expansion in the cartridge. What is it called?",
    correct_answer: "FME-7",
    incorrect_answers: ["VRC7", "VRC6", "MMC5"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "The C programming language was created by this American computer scientist. ",
    correct_answer: "Dennis Ritchie",
    incorrect_answers: [
      "Tim Berners Lee",
      "al-Khw\u0101rizm\u012b",
      "Willis Ware",
    ],
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "boolean",
    difficulty: "hard",
    question:
      "In the &quot;To Love-Ru&quot; series, Peke is considered a female robot.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "hard",
    question: "Which day did World War I begin?",
    correct_answer: "July 28",
    incorrect_answers: ["January 28", "June 28", "April 28"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question: "Who was the first Chancellor of a united Germany in 1871? ",
    correct_answer: "Otto Von Bismark",
    incorrect_answers: ["Kaiser Wilhelm ", "Fredrick the 2nd", "Robert Koch"],
  },
];

const Trivia = () => {
  // const [data, setData] = useState([]);
  const [quiz, setQuiz] = useState({ question: "" });
  const [answers, setAnswers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEndVisible, setEndVisible] = useState(false);
  const [answerRight, setAnswerRight] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    // const i = random.int(0, 9);
    if (data.length > 0) getQuiz();
  }, []);

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
    console.log(i, data);
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
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <>
      <div className="trivia">
        <div className="score-header">
          <Row>
            <Col span={12} offset={6}>
              <h3>SCORE: {score}</h3>
            </Col>
          </Row>
        </div>

        <Row>
          <Col span={12} offset={6} className="quiz-container">
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
          <Button key={1} type="primary">
            Yes
          </Button>,
          <Button key={2}>No</Button>,
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
  // console.log(">>>", arr);
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

const Finish = ({ score }) => {
  return (
    <div>
      <h1>GAME OVER</h1>
      <p>Your score was {score}</p>
      <p>Do you wnat to save your score?</p>
      <Button>Yes</Button>
      <Button>No</Button>
    </div>
  );
};
