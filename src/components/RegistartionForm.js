import _map from "lodash/map";
import _startCase from "lodash/startCase";
import { Form, Button, Select } from "antd";
import "antd/es/form/style/css";
import "antd/es/button/style/css";
import "antd/es/select/style/css";
import { COLOR_CONFIG, MODEL_CONFIG } from "../config";

const { Option } = Select;

const RegistartionForm = ({ onRegister, isVehicleUpdate, vehicle }) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const onFinish = ({ model, color }) => {
    onRegister(model, color);
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
