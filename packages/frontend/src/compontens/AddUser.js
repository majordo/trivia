import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useContext } from "react";
import { ScoreContext } from "./ScoreContext";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [score, setScore] = useContext(ScoreContext);
  const onFinish = (values) => {
    // console.log("Success:", values, score);return;
    axios
      .post("/user", { ...values, score })
      .then((res) => {
        // console.log("ok", res.data);
        message.success("User successfully created!");
        setScore(0);
        navigate("/leaderboard");
      })
      .catch((error) => {
        // console.log("error:", error.response.data, error.message);
        const { code } = error.response.data;
        message.error(
          "Creation failed!" + (code === 11000 ? " User already exists!" : "")
        );
      });
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="add-user-form">
      <h3>New user</h3>

      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
