import UsersTable from "../components/UserTable";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h2>All Users</h2>
        <UsersTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
