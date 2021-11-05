import React from "react";
import { Layout } from "antd";
import Trivia from "./compontens/Trivia";
import "./App.less";

const { Header, Footer, Sider, Content } = Layout;

// const App = () => (
//   <div className="App">
//     <Trivia />
//   </div>
// );

const App = () => {
  return (
    <Layout className="App">
      <Sider>Sider</Sider>
      <Content>
        <Trivia />
      </Content>
    </Layout>
  );
};

export default App;
