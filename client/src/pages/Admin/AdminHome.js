import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
            Welcome to the Blood Bank Management System Admin Dashboard. 
            Here you can manage donors, hospitals, and organizations efficiently. 
            Monitor blood inventory levels, track donations, and ensure 
            optimal blood distribution across all registered healthcare facilities.
          </p>
          <p>
            As an administrator, you have access to comprehensive reports on blood donations, 
            inventory status, and user management. Maintain system integrity by overseeing 
            all blood bank operations and ensuring compliance with healthcare standards.
            Use the navigation menu to access donor lists, hospital management, 
            and organization oversight tools.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
