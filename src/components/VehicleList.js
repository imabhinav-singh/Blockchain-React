import { useState } from "react";
import _join from "lodash/join";
import { List, Avatar, Button, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosSpeedometer } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import "antd/es/list/style/css";
import "antd/es/avatar/style/css";
import "antd/es/button/style/css";
import "antd/es/popover/style/css";
import EditModal from "./EditModal";
import { COLOR_CONFIG, MODEL_CONFIG, LOCATION_CONFIG } from "../config";
import VehicleDetailIcon from "./VehicleDetailsIcon";

const VehicleList = ({ data, editAreaDetails, status, editVehicleDetails }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicle, setVehicle] = useState({});

  const getPopoverContent = (publicKey) => (
    <>
      <div className="d-flex" style={{ fontSize: "10px" }}>
        <p className="mb-0" style={{ fontWeight: "bold" }}>
          Public Key:{" "}
        </p>
        {publicKey}
      </div>
    </>
  );

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
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
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
                  content={getPopoverContent(item.publicKey)}
                  placement="top"
                  trigger="hover"
                >
                  {MODEL_CONFIG[item.model]}
                </Popover>
              }
            />
            <VehicleDetailIcon
              icon={<BsFillPersonFill />}
              text={item.passengerCapacity}
              popoverText={`Passenger Capacity: ${item.passengerCapacity}`}
            />
            <VehicleDetailIcon
              icon={<IoIosSpeedometer />}
              text={item.distanceCovered}
              popoverText={`Distance covered: ${item.distanceCovered} kms`}
            />
            <VehicleDetailIcon
              icon={<HiLocationMarker />}
              text={LOCATION_CONFIG[item.location]}
              popoverText={`Location: ${LOCATION_CONFIG[item.location]}`}
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
