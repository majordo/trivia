import { Spin } from "antd";
const Loading = ({ size = "default" }) => {
  return (
    <div className="loading">
      <Spin size={size} />
    </div>
  );
};

export default Loading;
