import axios from "axios";
import { userModel } from "../db/index";

const mock_data = [
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

const triviaSession = new Map();

export default function (app) {
  app.use((req, res, next) => {
    const cookie = req.cookies.trivia;
    if (cookie === undefined) {
      // no: set a new cookie
      var randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie("trivia", randomNumber, {
        maxAge: 900000,
        httpOnly: true,
      });
      // console.log("cookie created successfully");
    } else {
      // console.log("cookie exists:", cookie);
    }
    next();
  });

  // app.get("/", (req, res) => {
  //   res.send("Hello World!!!!?");
  // });
  app.post("/check-response", async (req, res) => {
    try {
      const _data = triviaSession.get(req.cookies.trivia);
      // console.log("Cookies: ", req.body, req.cookies.trivia, _data);
      // console.log("check-response: ", _data);
      const { index, r } = req.body;
      // console.log(_data[index], r, _data[index].correct_answer === r);
      if (_data && _data[index].correct_answer === r)
        res.send({ correct: true, score: _data[index].score });
      else res.send({ correct: false, score: 0 });
    } catch (error) {
      console.log("err:", error);
      res.status(404).send(error);
    }
  });

  app.get("/trivia", async (req, res) => {
    try {
      // console.log("Cookies: ", req.cookies.trivia);

      // Cookies that have been signed
      // console.log("Signed Cookies: ", req.signedCookies);

      const _res = await axios.get("https://opentdb.com/api.php?amount=10", {
        timeout: 3000,
      });
      // const _res = { data: { results: mock_data } };
      // console.log(_res.data.results);

      const data = _res.data.results.map(
        (
          {
            category,
            type,
            difficulty,
            question,
            correct_answer,
            incorrect_answers,
          },
          index
        ) => {
          const answers = [...incorrect_answers, correct_answer];
          shuffleArray(answers);
          // console.log(">>>>", answers);
          return {
            index,
            category,
            type,
            difficulty,
            question,
            answers,
          };
        }
      );
      // console.log(">>>", data);
      const _data = _res.data.results.map(
        (
          {
            // category,
            // type,
            difficulty,
            // question,
            correct_answer,
            // incorrect_answers,
          },
          index
        ) => {
          let score = 0;
          switch (difficulty) {
            case "medium":
              score = 2;
              break;
            case "hard":
              score = 3;
              break;
            default:
              score = 1;
          }
          return {
            index,
            correct_answer,
            score,
          };
        }
      );
      triviaSession.set(req.cookies.trivia, _data);
      res.send(data);
    } catch (error) {
      // console.log("AXIOS TIMEOUT?", error);
      // if (error.code === "ECONNABORTED") res.send(mock_data);
      // else
      res.status(404).send(error.message);
    }
  });

  app.get("/leader-board", async (req, res) => {
    try {
      const list = await userModel
        .find({}, "username score creation")
        .sort({ score: -1 })
        .lean()
        .exec();
      // console.log(list);
      res.send(list);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  app.post("/user", async (req, res, next) => {
    try {
      const _u = await new userModel(req.body).save();
      res.send(_u);
    } catch (error) {
      res.status(404).send(error);
    }
  });
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
