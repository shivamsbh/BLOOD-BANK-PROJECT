import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Helper function to check if menu item is active
  const isActive = (path) => location.pathname === path;

  // Menu items configuration
  const menuItems = {
    organisation: [
      {
        path: "/",
        icon: "fa-solid fa-warehouse",
        label: "Inventory",
      },
      {
        path: "/donor",
        icon: "fa-solid fa-hand-holding-medical",
        label: "Donors",
      },
      {
        path: "/hospital",
        icon: "fa-solid fa-hospital",
        label: "Hospitals",
      },
      {
        path: "/analytics",
        icon: "fa-solid fa-chart-line",
        label: "Analytics",
      },
    ],
    admin: [
      {
        path: "/admin",
        icon: "fa-solid fa-user-shield",
        label: "Dashboard",
      },
      {
        path: "/donor-list",
        icon: "fa-solid fa-users",
        label: "Donor List",
      },
      {
        path: "/hospital-list",
        icon: "fa-solid fa-hospital",
        label: "Hospital List",
      },
      {
        path: "/org-list",
        icon: "fa-solid fa-building",
        label: "Organisation List",
      },
    ],
    donor: [
      {
        path: "/organisation",
        icon: "fa-solid fa-building-ngo",
        label: "Organisations",
      },
      {
        path: "/donation",
        icon: "fa-solid fa-hand-holding-heart",
        label: "My Donations",
      },
    ],
    hospital: [
      {
        path: "/organisation",
        icon: "fa-solid fa-building-ngo",
        label: "Organisations",
      },
      {
        path: "/consumer",
        icon: "fa-solid fa-clipboard-list",
        label: "Blood Requests",
      },
    ],
  };

  const currentUserMenuItems = menuItems[user?.role] || [];

  return (
    <div className="sidebar">
      <div className="menu">
        {currentUserMenuItems.map((item) => (
          <div
            key={item.path}
            className={`menu-item ${isActive(item.path) ? "active" : ""}`}
          >
            <i className={item.icon}></i>
            <Link to={item.path}>{item.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
