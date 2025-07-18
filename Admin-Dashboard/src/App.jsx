import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Logo from '/logo.png'
import {
  LoginCard,
  PrivateRoute,
  RegisterCard,
  SearchCard,
  ArmSearchCard,
  Spinner,
  VehicleSearchCard
} from "./components";

const About = lazy(() => import("./page/About"));
const ArmsReport = lazy(() => import("./page/ArmsReport"));
const ArmsController = lazy(() => import("./page/ArmsController"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Home = lazy(() => import("./page/Home"));
const EditArms = lazy(() => import("./page/EditArms"));
const EditVehicles = lazy(() => import("./page/EditVehicles"));
const EditVisitors = lazy(() => import("./page/EditVisitors"));
const NotFound = lazy(() => import("./page/NotFound"));
const Profile = lazy(() => import("./page/Profile"));
const RegisteredArmsList = lazy(() => import("./page/RegisteredArmsList"));
const RegisteredVehiclesList = lazy(() =>
  import("./page/RegisteredVehiclesList")
);
const Search = lazy(() => import("./page/Search"));
const Settings = lazy(() => import("./page/Settings"));
const UserManagement = lazy(() => import("./page/UserManagement"));
const VehiclesReport = lazy(() => import("./page/VehiclesReport"));
const VistorsReport = lazy(() => import("./page/VistorsReport"));
const Welcome = lazy(() => import("./page/Welcome"));
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <ToastContainer position="top-right" autoClose={2000} />
        <Suspense
          fallback={
            <div className="w-full bg-mainThemeColor h-[100svh] flex flex-col items-center justify-center">
              <img src={Logo} className="mb-4"/>
              <h1 className="mb-6 text-xl text-white">Loading...</h1>
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Welcome />}>
              <Route path="/" element={<LoginCard />} />
              <Route path="/register" element={<RegisterCard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/about" element={<About />} />
              <Route path="/armscontroller" element={<ArmsController />} />
              <Route path="/armsreport" element={<ArmsReport />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/editarms/:id" element={<EditArms />} />
              <Route path="/editvisitors/:id" element={<EditVisitors />} />
              <Route path="/editvehicles/:id" element={<EditVehicles />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/registeredarmslist"
                element={<RegisteredArmsList />}
              />
              <Route
                path="/registeredvehicleslist"
                element={<RegisteredVehiclesList />}
              />
              <Route path="/search" element={<Search />}>
                <Route path="/search/" element={<SearchCard />} />
                <Route path="/search/visitors" element={<ArmSearchCard />} />
                <Route
                  path="/search/vehicles"
                  element={<VehicleSearchCard />}
                />
              </Route>
              <Route path="/setting" element={<Settings />} />
              <Route path="/usermange" element={<UserManagement />} />
              <Route path="/vehiclesreport" element={<VehiclesReport />} />
              <Route path="/visitorsreport" element={<VistorsReport />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
