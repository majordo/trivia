import React, { useState, createContext } from "react";

const ScoreContext = createContext();

function ScoreProvider(props) {
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {props.children}
    </ScoreContext.Provider>
  );
}

export { ScoreContext, ScoreProvider };
