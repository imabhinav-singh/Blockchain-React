import { useEffect, useState } from "react";
import { Divider, Button, notification } from "antd";
import "antd/es/divider/style/css";
import "antd/es/button/style/css";
import "antd/es/notification/style/css";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import VehicleList from "./components/VehicleList";
import VehicleData from "./contracts/VehicleData.json";
import "./index.css";
import EditModal from "./components/EditModal";
import { STATUS_CONFIG } from "./config";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [vehicleCount, setVehicleCount] = useState(0);
  const [vehicleData, setVehicleData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [status, setStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [web3Provider, setWeb3Provider] = useState({});

  const showErrorNotification = (message) =>
    notification.error({
      message: message,
      placement: "bottom",
    });

  const registerVehicle = async (args) => {
    setLoading(true);
    try {
      const msghash = web3Provider.utils.sha3(
        JSON.stringify({ model: args.model, color: args.color })
      );
      const result = await web3Provider.eth.sign(msghash, account);
      vehicleData.methods
        .registerVehicle(
          account,
          args.color,
          args.model,
          args.passengerCapacity,
          args.distanceCovered,
          args.location,
          msghash,
          result
        )
        .send({ from: account })
        .on("receipt", (receipt) => {
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        })
        .on("error", (error) => {
          showErrorNotification(error.message);
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        });
    } catch (error) {
      showErrorNotification(error.message);
      fetchVehicleDetails(vehicleData);
      setLoading(false);
    }
  };

  const editAreaDetails = async (area, id) => {
    setLoading(true);
    try {
      const msghash = web3Provider.utils.sha3(area);
      const result = await web3Provider.eth.sign(msghash, account);
      vehicleData.methods
        .changeStatus(area, msghash, result, id)
        .send({ from: account })
        .on("receipt", (error, receipt) => {
          console.log(error, receipt);
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        })
        .on("error", (error) => {
          showErrorNotification(error.message);
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        });
    } catch (error) {
      showErrorNotification(error.message);
      fetchVehicleDetails(vehicleData);
      setLoading(false);
    }
  };

  const editVehicleDetails = async (id, args) => {
    setLoading(true);
    try {
      const msghash = web3Provider.utils.sha3(
        JSON.stringify({ model: args.model, color: args.color })
      );
      const result = await web3Provider.eth.sign(msghash, account);
      vehicleData.methods
        .editVehicle(
          id,
          args.color,
          args.model,
          args.passengerCapacity,
          args.distanceCovered,
          args.location,
          msghash,
          result
        )
        .send({ from: account })
        .on("receipt", (receipt) => {
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        })
        .on("error", (error) => {
          showErrorNotification(error.message);
          fetchVehicleDetails(vehicleData);
          setLoading(false);
        });
    } catch (error) {
      showErrorNotification(error.message);
      fetchVehicleDetails(vehicleData);
      setLoading(false);
    }
  };

  const fetchVehicleDetails = async (_vehicleData) => {
    try {
      const _vehicleCount = await _vehicleData.methods.vehicleCount().call();
      const _status = await _vehicleData.methods.status().call();
      setVehicleCount(_vehicleCount);
      setStatus(_status);
      console.log(_status);

      const _vehicles = [];
      for (let i = 1; i <= _vehicleCount; i++) {
        const _vehicle = await _vehicleData.methods.vehicles(i).call();
        _vehicles.push(_vehicle);
      }
      setVehicles(_vehicles);
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  useEffect(() => {
    async function load() {
      setLoading(true);

      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3Provider(web3);
      console.log(web3.eth.accounts.wallet);
      const accounts = await web3.eth.requestAccounts();
      console.log(web3, accounts);
      setAccount(accounts[0]);

      const _vehicleData = new web3.eth.Contract(
        VehicleData.abi,
        VehicleData.networks[5777].address
      );
      setVehicleData(_vehicleData);

      console.log(_vehicleData);
      await fetchVehicleDetails(_vehicleData);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <>
      <div className="d-flex flex-column relative">
        <Header account={account} status={status} loading={loading} />
        <div className="container-fluid">
          <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column">
            {loading ? (
              <Loader />
            ) : (
              <div className="d-flex align-items-center flex-column mt-4">
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                  Add New
                </Button>
                <Divider>Vehicle List</Divider>
                <VehicleList
                  data={vehicles}
                  editAreaDetails={editAreaDetails}
                  editVehicleDetails={editVehicleDetails}
                  status={status}
                />
              </div>
            )}
          </div>
          <EditModal
            isModalVisible={isModalVisible}
            registerVehicle={registerVehicle}
            closeModal={() => setIsModalVisible(false)}
            onSubmitArea={editAreaDetails}
            status={status}
            isVehicleUpdate={false}
          />
        </div>
        {status ? (
          <video
            src={STATUS_CONFIG[status].video}
            autoPlay
            loop
            muted
            className="video-status"
          />
        ) : null}
      </div>
    </>
  );
};

export default App;
