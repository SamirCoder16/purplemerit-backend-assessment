import { useGetAllUserforAdmin } from "../hooks/useGetAllUserforAdmin.js";
import { useUpdateStatusToActive, useUpdateStatusToInActive } from "../hooks/useUpdateStatus.js";
import Loader from "./Loader.jsx";

const UsersTable = () => {
  const { data, isLoading } = useGetAllUserforAdmin(1, 10);


  const deActivateUser = useUpdateStatusToInActive();
  const ActivateUser = useUpdateStatusToActive();

  const handleDeActivateUser = (userId) => {
    deActivateUser.mutate(userId);
  }
  const handleActivateUser = (userId) => {
    ActivateUser.mutate(userId);
  }
  
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.users.map((u, i) => (
            <tr key={i}>
              <td>{u.email}</td>
              <td>{u.userName}</td>
              <td>{u.role}</td>
              <td>
                <span className={`status ${u.status.toLowerCase()}`}>
                  {u.status}
                </span>
              </td>
              <td>
                {u.status === "active" ? (
                  <button className="danger active:scale-95"
                  onClick={() => handleDeActivateUser(u._id)}
                  >Deactivate</button>
                ) : (
                  <button className="success"
                  onClick={() => handleActivateUser(u._id)}
                  >Activate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
