import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";

/**
 * DoctorDashboard
 * - lists appointments
 * - provides a panel to edit diagnosis / prescription / follow-up on selected patient
 */
export default function DoctorDashboard({ appointments = [], onSave = () => {}, onAddHistory = () => {}, onToggle = () => {}, onDelete = () => {}, doctorSession }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = appointments.find(a => a.id === selectedId);

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState(false);

  const openForEdit = (appt) => {
    setSelectedId(appt.id);
    setDiagnosis(appt.diagnosis || "");
    setPrescription(appt.prescription || "");
    setFollowUp(Boolean(appt.followUp));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = () => {
    if (!selected) return;
    onSave(selected.id, { diagnosis: diagnosis.trim(), prescription: prescription.trim(), followUp });
    // add a history note automatically
    onAddHistory(selected.id, `Doctor updated diagnosis/prescription`, doctorSession?.name || "doctor");
    alert("Saved.");
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16, alignItems: "start" }}>
        <div>
          {appointments.length === 0 ? (
            <div className="card empty">No appointments yet.</div>
          ) : (
            appointments.map(a => (
              <div key={a.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{a.name} <span style={{ color: "var(--muted)", fontWeight: 500 }}>• {a.phone}</span></div>
                    <div style={{ color: "var(--muted)", marginTop: 4 }}>{a.reason}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="small" onClick={() => openForEdit(a)}>Edit Medical</button>
                    <button className="small" onClick={() => onToggle(a.id)}>{a.status === "completed" ? "Mark Undone" : "Mark Done"}</button>
                    <button className="small danger-btn" onClick={() => onDelete(a.id)}>Cancel</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="card">
          <h3>Medical Editor</h3>
          {selected ? (
            <>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 800 }}>{selected.name}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{selected.phone} • {selected.age ? selected.age+" yrs": "—"}</div>
              </div>

              <label>
                Diagnosis
                <input placeholder="Enter diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
              </label>

              <label>
                Prescription
                <input placeholder="Enter prescription (medication instructions)" value={prescription} onChange={(e) => setPrescription(e.target.value)} />
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <input type="checkbox" checked={followUp} onChange={(e) => setFollowUp(e.target.checked)} />
                Requires follow-up
              </label>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="primary-btn" onClick={save}>Save to Patient</button>
                <button className="small" onClick={() => {
                  // quick add note
                  onAddHistory(selected.id, "Doctor left a quick note", doctorSession?.name || "doctor");
                }}>Add Quick Note</button>
              </div>

              <div style={{ marginTop: 12 }}>
                <h4>History</h4>
                {(!selected.history || selected.history.length === 0) ? <div className="empty">No history</div> :
                  (selected.history.map(h => (
                    <div key={h.id} className="timeline-item" style={{ marginBottom: 8 }}>
                      <div className="t-meta">{new Date(h.date).toLocaleString()} — <strong>{h.by}</strong></div>
                      <div className="t-note">{h.note}</div>
                    </div>
                  )))
                }
              </div>
            </>
          ) : (
            <div className="empty">Select a patient from the list to edit medical records.</div>
          )}
        </aside>
      </div>
    </div>
  );
}
