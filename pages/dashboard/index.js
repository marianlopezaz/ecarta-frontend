import React, { useLayoutEffect } from "react";

// Import Dependencias
import { useSelector } from "react-redux";

// Import componentes
import Userdashboard from "../../components/layouts/dashboard/user_dashboard/user_dashboard";
import { Admindashboard } from "../../components/layouts/dashboard/admin_dashboard/admin_dashboard";

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const role = user.user.role;

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);

  return role === "admin" ? (
    <Admindashboard/>
  ) : (role === "user") ?(
    <Userdashboard/>
  ):(
    <div></div>
  );
};

export default Dashboard;
