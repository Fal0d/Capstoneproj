import React, { useState } from "react";
import { roles } from "../data/roles";

export default function AuthPanel({ session, onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reception");
  const [showPassword, setShowPassword] = useState(false); // NEW STATE

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedUser = roles.find(
      u => u.role === role && u.username === username && u.password === password
    );

    if (matchedUser) {
      onLogin({ name: matchedUser.username, role: matchedUser.role });
      setUsername("");
      setPassword("");
      setShowPassword(false);
    } else {
      alert("Invalid credentials for selected role.");
    }
  };

  if (session) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          Logged in as <strong>{session.name}</strong>{" "}
          <span className="pill" style={{ marginLeft: 8 }}>{session.role.toUpperCase()}</span>
        </div>
        <div>
          <button className="small" onClick={() => onLogout()}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ minWidth: 120 }}>
        <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          <option value="reception">Reception</option>
          <option value="doctor">Doctor</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
      </div>

      <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Username</label>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div style={{ width: 180, position: "relative" }}>
        <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Password</label>
        <input
          type={showPassword ? "text" : "password"} // toggle type
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ paddingRight: 40 }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#007bff",
            fontSize: 14,
            userSelect: "none"
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <div>
        <button className="primary-btn" type="submit">Login</button>
      </div>
    </form>
  );
}
