import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "./shared/Button";
import { useParams, useNavigate } from "react-router-dom";
import { FaGun } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const ArmsReregisterCard = () => {
  const { handleWeaponFormSubmission } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    armsData(params.id);
  }, []);

  // form data being injected
  const [weaponFormData, setWeaponFormData] = useState({
    rank: "",
    name: "",
    couponNumber: "",
    weaponsType: "",
    weaponId: "",
    officerOnDuty: "",
    taken: false,
    notTaken: true
  });

  const armsData = async id => {
    try {
      const response = await axios.get(`/api/weapons/${id}`);
      if (response.status === 200) {
        const updatedFormData = {
          ...response.data,
          taken: false,
          notTaken: true
        };
        setWeaponFormData(updatedFormData);
      } else {
        // Handle the case when the visitor with the given ID is not found
        console.error("Weapons not found.");
      }
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  const handleFormClear = () => {
    setWeaponFormData(prev => ({
      ...prev,
      name: "",
      rank: "",
      couponNumber: "",
      weaponsType: "",
      weaponId: ""
    }));
  };

  return (
    <div className="flex  h-[100svh] flex-col items-center justify-center p-3">
      <h1 className="text-2xl pl-3 sm:pl-16 self-start text-mainThemeColor mb-12 flex items-center">
        <FaGun size={28} className="mr-4" />
        Weapons Information
      </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleWeaponFormSubmission(weaponFormData);
          navigate(-1);
        }}
        className="grid gap-y-5 gap-x-8 place-items-center grid-cols-1  sm:grid-cols-2 w-[100%]"
      >
        <div className="inputBox">
          <input
            type="text"
            id="name"
            onChange={e =>
              setWeaponFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            value={weaponFormData.name}
            name="name"
            required="required"
          />
          <span>Weapon's Bearers Name</span>
          <i />
        </div>

        <select
          type="text"
          id="rank"
          onChange={e =>
            setWeaponFormData(prev => ({
              ...prev,
              [e.target.name]: e.target.value
            }))}
          value={weaponFormData.rank}
          name="rank"
          required="required"
          className="w-[24em] py-4 border-none outline-none bg-[#aaaaaa50]"
        >
          <option value="">-- Select The Title of The Weapon Bearer --</option>
          <option value="Ato">Ato</option>
          <option value="Weyzro">Weyzro</option>
          <option value="Weyzerit">Weyzerit</option>
          <option value="Engineer">Engineer</option>
          <option value="Doctor">Doctor</option>
          <option value="Assistant Proffessor">Assistant Proffessor</option>
          <option value="Proffessor">Proffessor</option>
          <option value="Constable">Constable</option>
          <option value="Assistant Sergent">Assistant Sergent</option>
          <option value="Deputy Sergent">Deputy Sergent</option>
          <option value="Sergent">Sergent</option>
          <option value="Chief Sergent">Chief Sergent</option>
          <option value="Assistant Inspector">Assistant Inspector</option>
          <option value="Deputy Inspector">Deputy Inspector</option>
          <option value="Inspector">Inspector</option>
          <option value="Cheif Inspector">Cheif Inspector</option>
          <option value="Deputy Commander">Deputy Commander</option>
          <option value="Commander">Commander</option>
          <option value="Assistant Commissioner">Assistant Commissioner</option>
          <option value="Deputy Comissioner">Deputy Comissioner</option>
          <option value="Commissioner">Commissioner</option>
          <option value="Deputy Commissioner General">
            Deputy Commissioner General
          </option>
          <option value="Commissioner General">Commissioner General</option>
        </select>

        <div className="inputBox">
          <input
            type="number"
            id="coupon"
            min={0}
            onChange={e =>
              setWeaponFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            value={weaponFormData.couponNumber}
            name="couponNumber"
            required="required"
          />
          <span>Coupon Number</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="type"
            onChange={e =>
              setWeaponFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            value={weaponFormData.weaponsType}
            name="weaponsType"
            required="required"
          />
          <span>Weapon Type</span>
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="officer"
            disabled={true}
            value={weaponFormData.officerOnDuty}
          />
          {/* <span>Officer On Duty</span> */}
          <i />
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="id"
            value={weaponFormData.weaponId}
            onChange={e =>
              setWeaponFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
              }))}
            name="weaponId"
            required="required"
          />
          <span>Weapon ID</span>
          <i />
        </div>

        <div className="flex items-center ml-2 mt-6">
          <Button
            buttonContent="Update Data"
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

export default ArmsReregisterCard;
