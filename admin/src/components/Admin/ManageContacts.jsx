import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      toast.success("Message deleted successfully 🚀");
      fetchMessages();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Manage Contact Messages</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Sent At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{msg.createdAt?.slice(0, 10)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(msg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;