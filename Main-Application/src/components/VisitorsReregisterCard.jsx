import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "./shared/Button";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import AppContext from "../context/AppContext";

const VisitorsReregisterCard = () => {
  const { handleFormSubmission } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    visitorData(params.id);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    city: "",
    subCity: "",
    district: "",
    phoneNumber: "",
    destinationOffice: "",
    officerOnDuty: ""
  });

  const visitorData = async id => {
    try {
      const response = await axios.get(`/api/visitors/${id}`);
      if (response.status === 200) {
        setFormData({ ...response.data });
      } else {
        // Handle the case when the visitor with the given ID is not found
        console.error("Visitor not found.");
      }
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  const handleFormClear = () => {
    setFormData(prev => ({
      ...prev,
      name: "",
      idNumber: "",
      city: "",
      subCity: "",
      district: "",
      phoneNumber: "",
      destinationOffice: ""
    }));
  };

  return (
    <div className="flex  h-[100svh] flex-col items-center justify-center p-3">
      <h1 className="text-2xl pl-3 sm:pl-16 self-start text-mainThemeColor mb-12 flex items-center">
        <FaUserCircle size={28} className="mr-2" />
        Visitor Infromation
      </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleFormSubmission(formData);
          navigate(-1);
        }}
        className="grid gap-y-5 gap-x-8 place-items-center grid-cols-1  sm:grid-cols-2 w-[100%]"
      >
        <div className="inputBox">
          <input
            type="text"
            required={true}
            label="Enter Visitors Full Name"
            id="name"
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            name="name"
          />
          <span>Visitor Name</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="id-no"
            required={true}
            label="Enter Identification Card Number"
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            value={formData.idNumber}
            name="idNumber"
            min={0}
          />
          <span>Id Number</span>
          <i />
        </div>

        <select
          id="office"
          required={true}
          onChange={e => {
            setFormData(prev => ({
              ...prev,
              [e.target.name]: e.target.value
            }));
          }}
          value={formData.destinationOffice}
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

        <div className="inputBox">
          <input
            required={true}
            type="text"
            id="city"
            name="city"
            label="City/Zone"
            value={formData.city}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
          />
          <span>City</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            required={true}
            type="text"
            id="Subcity"
            name="subCity"
            label="SubCity"
            value={formData.subCity}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
          />
          <span>SubCity</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            required={true}
            type="number"
            id="District"
            name="district"
            label="District"
            value={formData.district}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            min={0}
          />
          <span>District</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            disabled={true}
            value={formData.officerOnDuty}
            id="officerOnDuty"
          />
          {/* <span>OfficerOnDuty</span> */}
          <i />
        </div>

        <div className="inputBox">
          <input
            required={true}
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            style={{
              color: "#000"
            }}
            id="phone"
            min={0}
          />
          <span>Phone Number</span>
          <i />
        </div>
        <div className="flex items-center ml-16 mt-6">
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

export default VisitorsReregisterCard;
