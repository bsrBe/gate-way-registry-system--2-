import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // sidebar collapse controller
  const [collapse, setCollapse] = useState(false);
  // form and database states
  const [visitorsData, setVisitorsData] = useState([]);
  const [weaponsData, setWeaponsData] = useState([]);
  const [weaponsControllerData, setWeaponsControllerData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [user, setUser] = useState([]);
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
    fetchUsersData();
    fetchWeaponsControllerData();
  }, []);

  // ====== Users CURD Operation =========

  // GET data of users
  const fetchUsersData = async () => {
    try {
      const response = await axios.get("/api/users/list");
      setUser(response.data);
    } catch (error) {
      console.log("Errror fetching users Data", error);
    }
  };

  const deleteUser = async id => {
    try {
      if (window.confirm("Are you Sure You To Delete This Item??")) {
        await axios.delete(`/api/users/list/${id}`);
        fetchUsersData();
        toast.info(`Deleted User Data`);
      }
    } catch (error) {
      console.log("Error Deleting User Data", error);
    }
  };

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

  // EDIT one Visitor Data
  const editVisitorData = async (id, editData) => {
    try {
      await axios.patch(`/api/visitors/${id}`, editData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchVisitorsData();
      toast.info(`Edited Visitor Data of item ${editData.name}`);
    } catch (error) {
      console.error("Error Editing visitors data:", error);
      toast.error(`Error Editing Data of ${editData.name}`);
    }
  };

  // DELETE one Visitor Data
  const deleteVisitorData = async id => {
    try {
      if (window.confirm("Are you Sure You To Delete This Item??")) {
        await axios.delete(`/api/visitors/${id}`);
        fetchVisitorsData();
        toast.info(`deleted Visitor Data`);
      }
    } catch (error) {
      console.error("Error posting visitors data:", error);
      toast.error("Error deleting Data");
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
      fetchWeaponsControllerData()
      console.log(`Updated status of item id ${itemId}`);
      toast.info("Updated status of item id ");
    } catch (error) {
      console.error("Error updating weapon status:", error);
      toast.error("Error updating weapon status:");
      // Handle errors or display a toast message if needed
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
      toast.info(`Edited Weapons and ${editData.name}`);
    } catch (error) {
      console.error("Error Editing weapons data:", error);
      toast.error(`Error Editing Data of ${editData.name}`);
    }
  };

  // DELETE one Weapons Data
  const deleteWeaponsData = async id => {
    try {
      if (window.confirm("Are you Sure You To Delete This Item??")) {
        await axios.delete(`/api/weapons/${id}`);
        fetchWeaponsData();
        toast.info(`deleted Weapons Data`);
      }
    } catch (error) {
      console.error("Error posting weapon data:", error);
      toast.error("Error deleting Data");
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

  // DELETE one Vehicles Data
  const deleteVehicleData = async id => {
    try {
      if (window.confirm("Are you Sure You To Delete This Item??")) {
        await axios.delete(`/api/vehicles/${id}`);
        fetchVehiclesData();
        toast.info(`deleted Vehicles Data`);
      }
    } catch (error) {
      console.error("Error posting Vehicle data:", error);
      toast.error("Error deleting Data");
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
        user,
        visitorsData,
        weaponsData,
        weaponsControllerData,
        updateWeaponStatus,
        vehicleData,
        deleteVisitorData,
        deleteWeaponsData,
        deleteVehicleData,
        deleteUser,
        editVisitorData,
        editWeaponsData,
        editVehiclesData,
        fetchWeaponsControllerData,
        fetchUsersData,
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
