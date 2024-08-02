import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";
import { MoreOutlined, LinkOutlined } from "@ant-design/icons";
import "./RightHeader.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { logout } from "../../../Shared/api";

const RightHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      icon: <i className="bi bi-bell" style={{ fontSize: "1rem" }}></i>,
      label: "Notifikacije",
      key: "0",
    },
    {
      icon: <i className="bi bi-plus-lg" style={{ fontSize: "1rem" }}></i>,
      label: "Dodaj knjigu",
      key: "1",
    },
    {
      icon: <LinkOutlined style={{ fontSize: "1rem" }} />,
      label: "Biblioteka",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      icon: (
        <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
      ),
      label: "Profile",
      key: "3",
    },
  ];

  const handleResize = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="right-header">
      <div className="header-function-btns" onClick={() => logout()}>
        <i className="bi bi-box-arrow-right"></i>
      </div>
      <div className="divider"></div>
      <div className="header-function-btns">
        <i className="bi bi-bell"></i>
      </div>
      <div className="divider"></div>
      <div className="header-function-btns">
        <i className="bi bi-plus-lg"></i>
      </div>

      <div className="company">Biblioteka</div>
      <div className="profile-img">
        <i className="bi bi-person-circle"></i>
      </div>

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(flag) => setDropdownVisible(flag)}
      >
        <p onClick={(e) => e.preventDefault()}>
          <MoreOutlined className="dots" />
        </p>
      </Dropdown>
    </div>
  );
};

export default RightHeader;
