import { List, Avatar, Spin } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { useLeaders } from "../hooks/leaders";

const LeaderBoard = () => {
  // const [data, setData] = useState([]);
  const { data, loading } = useLeaders();


  return (
    <div className="leader-board">
      <h1>Leader Board</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                }
                title={item.username}
                description={
                  <span>
                    Score: <b>{item.score}</b> on{" "}
                    {moment(item.creation).format("DD/MM/YYYY HH:mm:ss")}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default LeaderBoard;
