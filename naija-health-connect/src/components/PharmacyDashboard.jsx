import React from "react";

export default function PharmacyDashboard({ appointments = [], onDispense = () => {} }) {
  const prescriptions = appointments.filter(a => a.prescription);

  return (
    <div>
      <h2>Pharmacy Dashboard</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {prescriptions.length === 0 ? (
          <div className="card empty">No prescriptions yet. Doctor must prescribe from Doctor Dashboard.</div>
        ) : (
          prescriptions.map(p => (
            <div key={p.id} className="card appointment-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.name} <small style={{ color: "var(--muted)", fontWeight: 500 }}>• {p.phone}</small></div>
                  <div style={{ color: "var(--muted)", marginTop: 6, fontSize: 13 }}>{new Date(p.createdAt).toLocaleString()}</div>
                  <div style={{ marginTop: 8 }}><strong>Diagnosis:</strong> <span style={{ color: "var(--muted)" }}>{p.diagnosis || "—"}</span></div>
                  <div style={{ marginTop: 6 }}><strong>Prescription:</strong> <span style={{ fontWeight: 700 }}>{p.prescription}</span></div>
                  {p.followUp && <div className="followup-tag" style={{ marginTop: 8 }}>Follow-up required</div>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  {p.prescriptionDispensed ? (
                    <div className="pill done-pill">Dispensed</div>
                  ) : (
                    <button className="primary-btn" onClick={() => onDispense(p.id)}>Mark Dispensed</button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
