import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      toast.success("User deleted ✅");
      fetchUsers();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <p className="admin-subtitle">All users who have signed up on the platform</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: 24 }}>Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: 24 }}>No users found</td></tr>
            ) : (
              users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      background: u.role === "admin" ? "rgba(167,139,250,0.2)" : "rgba(52,211,153,0.2)",
                      color: u.role === "admin" ? "#a78bfa" : "#34d399",
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
