import { Form, Modal, Button, Select } from "antd";
import _map from "lodash/map";
import "antd/es/form/style/css";
import "antd/es/modal/style/css";
import "antd/es/button/style/css";
import "antd/es/select/style/css";
import RegistartionForm from "./RegistartionForm";
import { STATUS_CONFIG } from "../constants";

const { Option } = Select;

const EditModal = ({
  isModalVisible,
  closeModal,
  onSubmitArea,
  registerVehicle,
  isVehicleUpdate,
  vehicle,
  editVehicleDetails,
  status,
}) => {
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

  const onSubmitAreaForm = ({ area }) => {
    onSubmitArea(area, vehicle.id);
    closeModal();
  };

  const onSubmitVehicleForm = (model, color) => {
    if (isVehicleUpdate) {
      editVehicleDetails(vehicle.id, model, color);
    } else {
      registerVehicle(model, color);
    }
    closeModal();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="Edit data"
      visible={isModalVisible}
      onCancel={closeModal}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        {...layout}
        form={form}
        name="edit-modal"
        onFinish={onSubmitAreaForm}
        hidden={!isVehicleUpdate}
      >
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true }]}
          initialValue={status}
        >
          <Select
            placeholder="Select an area type"
            allowClear
            defaultValue={status}
          >
            {_map(STATUS_CONFIG, (value, key) => (
              <Option value={key}>{value.text}</Option>
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
      <RegistartionForm
        onRegister={onSubmitVehicleForm}
        isVehicleUpdate={isVehicleUpdate}
        vehicle={vehicle}
      />
    </Modal>
  );
};

export default EditModal;
