import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Table.css";

export default function Table() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    phone: "",
    age: "",
    city: "",
    email: ""
  });

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    loadUsers();
  };

  const openEdit = (row) => {
    setEditUser(row);
    setShow(true);
  };

  const updateUser = async () => {
    await axios.put(
      `http://localhost:5000/api/users/${editUser.id}`,
      editUser
    );
    setShow(false);
    loadUsers();
  };

  const columns = [
    { name: "Name", selector: row => row.name, width: "180px" },
    { name: "Phone", selector: row => row.phone, width: "150px" },
    { name: "Age", selector: row => row.age, width: "80px", center: true },
    { name: "City", selector: row => row.city, width: "180px" },
    { name: "Email", selector: row => row.email, width: "300px" },
    {
      name: "Action",
      grow: 1,              // 🔥 removes right-side gap
      center: true,
      cell: row => (
        <div className="action-btns">
          <button className="icon-btn edit" onClick={() => openEdit(row)}>
            <FaEdit />
          </button>
          <button
            className="icon-btn delete"
            onClick={() => deleteUser(row.id)}
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-page">
      <h2 className="table-title">User Data Table</h2>

      <div className="table-card">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          striped
          highlightOnHover

          /* ✅ SCROLLING */
          responsive
          fixedHeader
          fixedHeaderScrollHeight="420px"

          subHeader
          subHeaderComponent={
            <input
              className="search-box"
              placeholder="Filter in records..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          }
        />
      </div>

      {/* ===== EDIT MODAL ===== */}
      {show && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Edit User</h3>

            {["name", "phone", "age", "city", "email"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.toUpperCase()}</label>
                <input
                  value={editUser[field]}
                  onChange={e =>
                    setEditUser({ ...editUser, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="modal-actions">
              <button className="btn-primary" onClick={updateUser}>
                Update
              </button>
              <button className="btn-secondary" onClick={() => setShow(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
