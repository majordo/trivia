import { useState, useEffect } from "react";
import axios from "axios";

// let quiz = null;
// let data = null;
let session = null;

class Session {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }
  // get index() {
  //   return this.index;
  // }

  getQuiz() {
    // console.log("getQuiz i:", this.index, this.data.length);
    if (this.index === this.data.length) return null;
    const q = this.data[this.index];
    this.index++;
    return q;
  }
}

export function useTrivia() {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios
      .get("/trivia")
      .then((resp) => {
        // console.log("RESP:", resp.data);
        session = new Session(resp.data);
        setLoading(false);
        // setData(resp.data);
        setQuiz(session.getQuiz());
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  }, []);

  const next = () => {
    const q = session.getQuiz();
    if (q) setQuiz(q);
    else setDone(true);
  };

  const checkResponse = async (index, r) => {
    // console.log("checkResponse:", index, r);

    try {
      const res = await axios.post("/check-response", { index, r });
      return res;
    } catch (error) {
      console.error(error);
      return false;
    }
    // axios
    //   .post("/check-response", { index, r })
    //   .then((resp) => {
    //     console.log("check-response:", resp.data);
    //     return resp.data;
    //   })
    //   .catch((err) => {
    //     // Handle Error Here
    //     console.error(err);
    //   });
  };

  return {
    quiz,
    loading,
    next,
    checkResponse,
    done,
  };
}
