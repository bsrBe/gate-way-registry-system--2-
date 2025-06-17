import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { userInfo } = useSelector(state => state.auth);

  const [collapse, setCollapse] = useState(false);
  const [visitorsData, setVisitorsData] = useState([]);
  const [weaponsData, setWeaponsData] = useState([]);
  const [weaponsControllerData, setWeaponsControllerData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  const handleSidebarCollapse = () => {
    setCollapse(prev => !prev);
  };

  // On component mount, fetch data
  useEffect(() => {
    fetchWeaponsData();
    fetchVisitorsData();
    fetchVehiclesData();
    fetchWeaponsControllerData();
  }, []);

  // ============ Visitors ============

  const fetchVisitorsData = async () => {
    try {
      const response = await axios.get("https://grs-gbeb.onrender.com/api/visitors", {
        withCredentials: true,
      });
      setVisitorsData(response.data);
    } catch (error) {
      console.error("Error fetching visitors data:", error);
    }
  };

  const handleFormSubmission = async formData => {
    if (userInfo?.name) {
      formData.officerOnDuty = userInfo.name;
    }

    try {
      await axios.post("https://grs-gbeb.onrender.com/api/visitors", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(`${formData.name} successfully registered`);
      fetchVisitorsData();
    } catch (error) {
      console.error("Error posting visitor data:", error);
      toast.error(`Error posting visitor data`);
    }
  };

  const editVisitorData = async (id, editData) => {
    try {
      await axios.patch(`https://grs-gbeb.onrender.com/api/visitors/${id}`, editData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchVisitorsData();
      toast.info(`Edited visitor: ${editData.name}`);
    } catch (error) {
      console.error("Error editing visitor data:", error);
      toast.error(`Error editing visitor: ${editData.name}`);
    }
  };

  // ============ Weapons ============

  const fetchWeaponsData = async () => {
    try {
      const response = await axios.get("https://grs-gbeb.onrender.com/api/weapons", {
        withCredentials: true,
      });
      setWeaponsData(response.data);
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  const fetchWeaponsControllerData = async () => {
    try {
      const response = await axios.get("https://grs-gbeb.onrender.com/api/weapons/weaponcontroller", {
        withCredentials: true,
      });
      setWeaponsControllerData(response.data);
    } catch (error) {
      console.error("Error fetching weapon controller data:", error);
    }
  };

  const updateWeaponStatus = async (itemId, updatedData) => {
    try {
      await axios.patch(`https://grs-gbeb.onrender.com/api/weapons/${itemId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchWeaponsControllerData();
      toast.info(`Updated weapon status for ID ${itemId}`);
    } catch (error) {
      console.error("Error updating weapon status:", error);
      toast.error("Error updating weapon status");
    }
  };

  const handleWeaponFormSubmission = async weaponFormData => {
    if (userInfo?.name) {
      weaponFormData.officerOnDuty = userInfo.name;
    }

    try {
      await axios.post("https://grs-gbeb.onrender.com/api/weapons", weaponFormData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(`${weaponFormData.name} successfully registered`);
      fetchWeaponsData();
    } catch (error) {
      console.error("Error posting weapon data:", error);
      toast.error("Error posting weapon data");
    }
  };

  const editWeaponsData = async (id, editData) => {
    try {
      await axios.patch(`https://grs-gbeb.onrender.com/api/weapons/${id}`, editData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchWeaponsData();
      toast.info(`Edited weapon: ${editData.name}`);
    } catch (error) {
      console.error("Error editing weapon data:", error);
      toast.error(`Error editing weapon: ${editData.name}`);
    }
  };

  // ============ Vehicles ============

  const fetchVehiclesData = async () => {
    try {
      const response = await axios.get("https://grs-gbeb.onrender.com/api/vehicles", {
        withCredentials: true,
      });
      setVehicleData(response.data);
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    }
  };

  const handleVehicleFromSubmission = async vehiclesFromData => {
    if (userInfo?.name) {
      vehiclesFromData.officerOnDuty = userInfo.name;
    }

    try {
      await axios.post("https://grs-gbeb.onrender.com/api/vehicles", vehiclesFromData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(`${vehiclesFromData.vehicleOwner} successfully registered`);
      fetchVehiclesData();
    } catch (error) {
      console.error("Error posting vehicle data:", error);
      toast.error("Error posting vehicle data");
    }
  };

  const editVehiclesData = async (id, editData) => {
    try {
      await axios.patch(`https://grs-gbeb.onrender.com/api/vehicles/${id}`, editData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchVehiclesData();
      toast.info(`Edited vehicle: ${editData.vehicleOwner}`);
    } catch (error) {
      console.error("Error editing vehicle data:", error);
      toast.error(`Error editing vehicle: ${editData.vehicleOwner}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        collapse,
        visitorsData,
        weaponsData,
        weaponsControllerData,
        vehicleData,
        updateWeaponStatus,
        handleFormSubmission,
        handleWeaponFormSubmission,
        handleVehicleFromSubmission,
        editVisitorData,
        editWeaponsData,
        editVehiclesData,
        fetchWeaponsControllerData,
        fetchVisitorsData,
        fetchWeaponsData,
        fetchVehiclesData,
        handleSidebarCollapse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
