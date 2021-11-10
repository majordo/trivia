import React from "react";
import { Layout } from "antd";
import Trivia from "./compontens/Trivia2";
import "./App.less";
import { Routes, Route } from "react-router-dom";
import SideMenu from "./compontens/SideMenu";
import LeaderBoard from "./compontens/LeaderBoard";
import AddUser from "./compontens/AddUser";
import RegisterScore from "./compontens/RegisterScore";
import { ScoreProvider } from "./compontens/ScoreContext";
const { Sider, Content } = Layout;

// const App = () => (
//   <div className="App">
//     <Trivia />
//   </div>
// );

const App = () => {
  return (
    <ScoreProvider>
      <Layout className="App">
        <Sider>
          <SideMenu />
        </Sider>
        <Content>
          {/* <Trivia /> */}

          <Routes>
            <Route path="/" element={<Trivia />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/user" element={<AddUser />} />
            <Route path="/register-score" element={<RegisterScore />} />
          </Routes>
        </Content>
      </Layout>
    </ScoreProvider>
  );
};

export default App;
