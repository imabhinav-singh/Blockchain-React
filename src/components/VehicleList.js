import { useState } from "react";
import _join from "lodash/join";
import { List, Avatar, Button, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "antd/es/list/style/css";
import "antd/es/avatar/style/css";
import "antd/es/button/style/css";
import "antd/es/popover/style/css";
import EditModal from "./EditModal";
import { COLOR_CONFIG, MODEL_CONFIG, STATUS_CONFIG } from "../config";

const VehicleList = ({ data, editAreaDetails, status, editVehicleDetails }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicle, setVehicle] = useState({});

  const onEditClick = (vehicle) => {
    // console.log(vehicle);
    setVehicle(vehicle);
    setIsModalVisible(true);
  };

  return (
    <div className="vehicle-list">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onEditClick(item)}
              />,
            ]}
            style={{
              backgroundColor: `rgba(${_join(
                COLOR_CONFIG[item.color],
                ", "
              )}, 0.1)`,
              paddingLeft: "16px",
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  shape="square"
                  style={{
                    backgroundColor: item.color,
                    verticalAlign: "middle",
                    border: "1px solid black",
                  }}
                />
              }
              title={
                <Popover
                  content={
                    <>
                      <div className="d-flex" style={{ fontSize: "10px" }}>
                        <p className="mb-0" style={{ fontWeight: "bold" }}>
                          Public Key:{" "}
                        </p>
                        {item.publicKey}
                      </div>
                    </>
                  }
                  placement="top"
                  trigger="hover"
                >
                  {MODEL_CONFIG[item.model]}
                </Popover>
              }
            />
            <div className="px-3 status-div">{status}</div>
            <FontAwesomeIcon
              icon={STATUS_CONFIG[status].icon}
              className="ms-2"
              color={item.color}
            />
          </List.Item>
        )}
      />
      <EditModal
        isModalVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        onSubmitArea={editAreaDetails}
        editVehicleDetails={editVehicleDetails}
        status={status}
        vehicle={vehicle}
        isVehicleUpdate={true}
      />
    </div>
  );
};

export default VehicleList;
