const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* SIGNUP */
app.post("/api/signup", async (req, res) => {
  const { name, phone, age, city, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name,phone,age,city,email,password) VALUES ($1,$2,$3,$4,$5,$6)",
    [name, phone, age, city, email, hashed]
  );

  res.json({ message: "Signup success" });
});

/* LOGIN */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.json({ message: "Wrong email" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.json({ message: "Wrong password" });

  res.json({ message: "Login success" });
});

/* READ */
app.get("/api/users", async (req, res) => {
  const result = await pool.query(
    "SELECT id,name,phone,age,city,email FROM users ORDER BY id"
  );
  res.json(result.rows);
});

/* UPDATE */
app.put("/api/users/:id", async (req, res) => {
  const { name, phone, age, city, email } = req.body;

  await pool.query(
    "UPDATE users SET name=$1,phone=$2,age=$3,city=$4,email=$5 WHERE id=$6",
    [name, phone, age, city, email, req.params.id]
  );

  res.json({ message: "Updated" });
});

/* DELETE */
app.delete("/api/users/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
