import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuSetting, setMenuSetting] = useState({ currentMenu: ["/"] });

  useEffect(() => {
    setMenuSetting({ currentMenu: [location.pathname] });
  }, [location]);

  const handleClick = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <h1>SIDE MENU</h1>
      <Menu
        onClick={handleClick}
        selectedKeys={menuSetting.currentMenu}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="/">Quiz</Menu.Item>
        <Menu.Item key="/leaderboard">Leaders board</Menu.Item>
        {/* <Menu.Item key="/register-score">Add user</Menu.Item> */}
      </Menu>
    </>
  );
};

export default SideMenu;
