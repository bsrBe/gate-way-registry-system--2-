import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Button from "./shared/Button";
import { useParams, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const VehiclesReregisterCard = () => {
  const { handleVehicleFromSubmission } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    vehicleData(params.id);
  }, []);

  const [vehiclesFromData, setVehicleFromData] = useState({
    licensePlateNumber: "",
    RegionalCode:"",
    vehicleOwner: "",
    idnumber: "",
    vehicleType: "",
    destinationOffice: "",
    officerOnDuty: ""
  });

  const vehicleData = async id => {
    try {
      const response = await axios.get(`/api/vehicles/${id}`);
      if (response.status === 200) {
        setVehicleFromData({ ...response.data });
      } else {
        // Handle the case when the vehicle with the given ID is not found
        console.error("Vehicles not found.");
      }
    } catch (error) {
      console.error("Error fetching Vehicles data:", error);
    }
  };

  const handleFormClear = () => {
    setVehicleFromData(prev => ({
      ...prev,
      licensePlateNumber: "",
      RegionalCode:"",
      vehicleOwner: "",
      idnumber: "",
      vehicleType: "",
      destinationOffice: ""
    }));
  };

  return (
    <div className="flex  h-[100svh] flex-col items-center justify-center p-3">
      <h1 className="text-2xl pl-3 sm:pl-16 self-start text-mainThemeColor mb-12 flex items-center">
        <FaCar size={28} className="mr-2" />
        Vehicles Infromation
      </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleVehicleFromSubmission(vehiclesFromData);
          navigate(-1);
        }}
        className="grid gap-y-5 gap-x-8 place-items-center grid-cols-1  sm:grid-cols-2 w-[100%]"
      >
        <div className="inputBox">
          <input
            type="text"
            required={true}
            id="name"
            value={vehiclesFromData.vehicleOwner}
            onChange={e =>
              setVehicleFromData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            name="vehicleOwner"
          />
          <span>Vehicles Owner Name</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="id-no"
            required={true}
            label="Enter Identification Card Number"
            onChange={e =>
              setVehicleFromData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            value={vehiclesFromData.idnumber}
            name="idnumber"
            min={0}
          />
          <span>Id Number</span>
          <i />
        </div>

        <select
          id="office"
          required={true}
          onChange={e => {
            setVehicleFromData(prev => ({
              ...prev,
              [e.target.name]: e.target.value
            }));
          }}
          value={vehiclesFromData.destinationOffice}
          name="destinationOffice"
          label="Vistors Destination Office"
          className="w-[24em] py-4 border-none outline-none bg-[#aaaaaa50]"
        >
          <option value="">--Select Destination Office--</option>
          <option value="Crime Prevention Department">
            Crime Prevention Department
          </option>
          <option value="Crime Investigation Department">
            Crime Investigation Department
          </option>
          <option value="Adminstration Development">
            Adminstration Development
          </option>
          <option value="Ethiopian Police University">
            Ethiopian Police University
          </option>
          <option value="Ethiopian Fedral Police General Secretary">
            Ethiopian Fedral Police General Secretary
          </option>
          <option value="Central Police Intelligence">
            Central Police Intelligence
          </option>
          <option value="Main Logistics Department">
            Main Logistics Department
          </option>
          <option value="Central Audit Department">
            Central Audit Department
          </option>
          <option value="Planning And Budget Directory">
            Planning And Budget Directory
          </option>
          <option value="Law And Human Rights Directory">
            Law And Human Rights Directory
          </option>
        </select>

        <div className="inputBox flex items-center">
          <select
            id="region"
            required={true}
            onChange={e => {
              setVehicleFromData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }));
            }}
            value={vehiclesFromData.RegionalCode}
            name="RegionalCode"
            className="w-[9.5em] py-4 border-none z-[99] outline-none bg-[#aaaaaa50]"
          >
            <option value="">Regional Code</option>
            <option value="ET">ET</option>
            <option value="AA">AA</option>
            <option value="AF">AF</option>
            <option value="AM">AM</option>
            <option value="BG">BG</option>
            <option value="DR">DR</option>
            <option value="GM">GM</option>
            <option value="HR">HR</option>
            <option value="OR">OR</option>
            <option value="SM">SM</option>
            <option value="CD">CD</option>
            <option value="AU">AU</option>
            <option value="UN">UN</option>
          </select>
          {/* <div className="inputBox"> */}
          <input
            required={true}
            type="number"
            id="city"
            min={0}
            name="licensePlateNumber"
            label="City/Zone"
            placeholder="License Plate Number"
            value={vehiclesFromData.licensePlateNumber}
            onChange={e =>
              setVehicleFromData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
          />
          {/* <span>License Plate Number</span> */}
          <i />
          {/* </div> */}
        </div>

        <div className="inputBox">
          <input
            type="text"
            disabled={true}
            value={vehiclesFromData.officerOnDuty}
            id="officerOnDuty"
          />
          <i />
        </div>

        <div className="inputBox">
          <input
            required={true}
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={vehiclesFromData.vehicleType}
            onChange={e =>
              setVehicleFromData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
          />
          <span>Vehicle Type</span>
          <i />
        </div>

        <div className="flex items-center ml-2 mt-6">
          <Button
            buttonContent="Update"
            width="12em"
            mr="1.2em"
            py=".75em"
            px="1em"
          />
          <Button
            buttonContent="Clear Form"
            width="12em"
            py=".75em"
            px="1em"
            bg="#ff000090"
            handleFormClear={handleFormClear}
          />
        </div>
      </form>
    </div>
  );
};

export default VehiclesReregisterCard;
