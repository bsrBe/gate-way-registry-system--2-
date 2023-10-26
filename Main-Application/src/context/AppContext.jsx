import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { userInfo } = useSelector(state => state.auth);
  // userInfo && console.log(userInfo.name);
  // sidebar collapse controller
  const [collapse, setCollapse] = useState(false);
  // form and database states
  const [visitorsData, setVisitorsData] = useState([]);
  const [weaponsData, setWeaponsData] = useState([]);
  const [weaponsControllerData, setWeaponsControllerData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  // form and database states

  // user-interface Functions
  const handleSidebarCollapse = () => {
    setCollapse(prev => !prev);
  };
  // user-interface Functions

  // /api Fetch <GET,POST,PATCH,DELETE> Functions

  // running the GET request functions
  useEffect(() => {
    fetchWeaponsData();
    fetchVisitorsData();
    fetchVehiclesData();
    fetchWeaponsControllerData();
  }, []);

  //======== Visitors CURD Operation ===============

  // GET data for visitors
  const fetchVisitorsData = async () => {
    try {
      const response = await axios.get("/api/visitors");
      setVisitorsData(response.data);
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  // POST visitors data
  const handleFormSubmission = async formData => {
    if (userInfo && userInfo.name) {
      formData.officerOnDuty = userInfo.name;
    }

    try {
      const response = await axios.post("/api/visitors", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success(`${formData.name} succesfuly is registerd`);
      fetchVisitorsData();
    } catch (error) {
      console.error("Error posting visitor data:", error);
      toast.error(`Error posting visitor data, ${formData._id}`);
    }
  };

  // EDIT one Visitor Data
  const editVisitorData = async (id, editData) => {
    try {
      await axios.patch(`/api/visitors/${id}`, editData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchVisitorsData();
      toast.info(`Edited item id ${id} and ${editData.name}`);
    } catch (error) {
      console.error("Error Editing visitors data:", error);
      toast.error(`Error Editing Data of ${editData.name}`);
    }
  };

  // ========= Weapons CURD Operations ==========

  // GET data for weapons
  const fetchWeaponsData = async () => {
    try {
      const response = await axios.get("/api/weapons");
      setWeaponsData(response.data);
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  // GET data for not-taken weapons
  const fetchWeaponsControllerData = async () => {
    try {
      const response = await axios.get("/api/weapons/weaponcontroller");
      setWeaponsControllerData(response.data);
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  // Updating the Taken no-Taken Status
  const updateWeaponStatus = async (itemId, updatedData) => {
    try {
      await axios.patch(`/api/weapons/${itemId}`, updatedData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchWeaponsControllerData();
      toast.info(`Updated status of firearms Data with id ${itemId}`);
      console.log(`Updated status of firearms Data id ${itemId}`);
    } catch (error) {
      console.error("Error updating weapon status:", error);
      toast.error("Error updating weapon status:");
      // Handle errors or display a toast message if needed
    }
  };

  // POST Weapons Data
  const handleWeaponFormSubmission = async weaponFormData => {
    // Ensure that userInfo is available and has the necessary data
    if (userInfo && userInfo.name) {
      weaponFormData.officerOnDuty = userInfo.name;
    }

    try {
      const response = await axios.post("/api/weapons", weaponFormData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success(`${weaponFormData.name} succesfuly is registerd`);
      fetchWeaponsData();
    } catch (error) {
      console.error("Error posting weapon data:", error);
      toast.error("Error posting weapon data");
    }
  };

  // EDIT one weapons Data
  const editWeaponsData = async (id, editData) => {
    try {
      await axios.patch(`/api/weapons/${id}`, editData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchWeaponsData();
      toast.info(`Edited item id ${id} and ${editData.name}`);
    } catch (error) {
      console.error("Error Editing weapons data:", error);
      toast.error(`Error Editing Data of ${editData.name}`);
    }
  };

  // ======= Vehicle CURD Operations ============

  // Get all data for Vehicles
  const fetchVehiclesData = async () => {
    try {
      const response = await axios.get("/api/vehicles");
      setVehicleData(response.data);
    } catch (error) {
      console.error("Error fetching weapons data:", error);
    }
  };

  // POST vehicles data
  const handleVehicleFromSubmission = async vehiclesFromData => {
    if (userInfo && userInfo.name) {
      vehiclesFromData.officerOnDuty = userInfo.name;
    }

    try {
      const response = await axios.post("/api/vehicles", vehiclesFromData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success(`${vehiclesFromData.vehicleOwner} succesfuly is registerd`);
      fetchVehiclesData();
    } catch (error) {
      console.error("Error posting vehicles data:", error);
      toast.error("Error posting vehicles data");
    }
  };

  // EDIT one weapons Data
  const editVehiclesData = async (id, editData) => {
    try {
      await axios.patch(`/api/vehicles/${id}`, editData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchVehiclesData();
      toast.info(`Edited item id ${id} and ${editData.vehicleOwner}`);
    } catch (error) {
      console.error("Error Editing Vehicles data:", error);
      toast.error(`Error Editing Data of ${editData.vehicleOwner}`);
    }
  };
  // /api Fetch <GET,POST,PATCH,DELETE> Functions

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
        handleSidebarCollapse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
