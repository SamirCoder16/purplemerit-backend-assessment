import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="sidebar">
      <div className="menu">
        <h3>Admin Panel</h3>
        <p className="menu-item active">All Users</p>
      </div>

      <div className="profile">
        <div className="avatar">{user?.userName.charAt(0)}</div>
        <div>
          <p className="name">{user?.userName}</p>
          <p className="role">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
