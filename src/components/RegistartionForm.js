import _map from "lodash/map";
import _startCase from "lodash/startCase";
import _isFinite from "lodash/isFinite";
import { Form, Button, Select, Input } from "antd";
import "antd/es/form/style/css";
import "antd/es/button/style/css";
import "antd/es/select/style/css";
import "antd/es/input/style/css";
import { COLOR_CONFIG, LOCATION_CONFIG, MODEL_CONFIG } from "../config";

const { Option } = Select;

const RegistartionForm = ({ onRegister, isVehicleUpdate, vehicle }) => {
  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 12,
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const onFinish = ({
    model,
    color,
    passengerCapacity,
    distanceCovered,
    location,
  }) => {
    onRegister({ model, color, passengerCapacity, distanceCovered, location });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true }]}
        initialValue={isVehicleUpdate ? vehicle.model : null}
      >
        <Select
          placeholder="Select a model"
          allowClear
          defaultValue={isVehicleUpdate ? vehicle.model : null}
        >
          {_map(MODEL_CONFIG, (value, key) => (
            <Option value={key}>{value}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true }]}
        initialValue={isVehicleUpdate ? vehicle.color : null}
      >
        <Select
          placeholder="Select a color"
          allowClear
          defaultValue={isVehicleUpdate ? vehicle.color : null}
        >
          {_map(COLOR_CONFIG, (value, key) => (
            <Option value={key}>{_startCase(key)}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Passenger Capacity"
        name="passengerCapacity"
        rules={[
          {
            required: true,
            message: "Please enter a number",
            validator: (_, value) =>
              !isNaN(value)
                ? Promise.resolve()
                : Promise.reject(new Error("Please enter a number")),
          },
        ]}
        initialValue={isVehicleUpdate ? vehicle.passengerCapacity : null}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="Distance Covered (kms)"
        name="distanceCovered"
        rules={[
          {
            required: true,
            message: "Please enter a number",
            validator: (_, value) =>
              !isNaN(value)
                ? Promise.resolve()
                : Promise.reject(new Error("Please enter a number")),
          },
        ]}
        initialValue={isVehicleUpdate ? vehicle.distanceCovered : null}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true }]}
        initialValue={isVehicleUpdate ? vehicle.location : null}
      >
        <Select
          placeholder="Select a location"
          allowClear
          defaultValue={isVehicleUpdate ? vehicle.location : null}
        >
          {_map(LOCATION_CONFIG, (value, key) => (
            <Option value={key}>{value}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistartionForm;
