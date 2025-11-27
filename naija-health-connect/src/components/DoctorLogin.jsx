import React, { useState } from "react";

export default function DoctorLogin({ onLogin, doctorSession, onLogout }) {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo: secret must be "doctor" to succeed
    if (secret.trim() === "doctor" && name.trim()) {
      onLogin({ name: name.trim(), role: "doctor" });
      setName("");
      setSecret("");
    } else {
      alert("Invalid credentials for demo. Use secret: doctor");
    }
  };

  return (
    <div className="card">
      {!doctorSession ? (
        <form onSubmit={handleLogin} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Doctor name</label>
            <input placeholder="Dr. Ade" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ width: 220 }}>
            <label style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Secret (demo)</label>
            <input placeholder="secret" value={secret} onChange={(e) => setSecret(e.target.value)} />
          </div>
          <div>
            <button className="primary-btn" type="submit">Login</button>
          </div>
        </form>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            Logged in as <strong>{doctorSession.name}</strong> (Doctor)
            <div style={{ color: "var(--muted)", marginTop: 6 }}>You can add history notes and export records.</div>
          </div>
          <div>
            <button className="small" onClick={onLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
