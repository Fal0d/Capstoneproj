import React, { useState } from "react";

export default function AppointmentCard({ appt, onToggle, onDelete, onAddHistory, onMarkDispensed, doctorSession }) {
  const [note, setNote] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const date = new Date(appt.createdAt).toLocaleString();

  const handleAddNote = () => {
    if (!note.trim()) return;
    onAddHistory(appt.id, note.trim(), doctorSession ? doctorSession.name : "staff");
    setNote("");
    setShowTimeline(true);
  };

  return (
    <div className={`card appointment-card ${appt.status === "completed" ? "done" : ""}`}>
      <div className="left">
        <div className="name">{appt.name}</div>
        <div className="meta">{appt.phone} • {appt.age ? appt.age + " yrs" : "—"}</div>
        <div className="reason">{appt.reason || "General Consultation"}</div>

        {/* Read-only medical info (only visible if doctor has filled) */}
        <div className="medical-info">
          {appt.diagnosis && <p><strong>Diagnosis:</strong> {appt.diagnosis}</p>}
          {appt.prescription && <p><strong>Prescription:</strong> {appt.prescription} {appt.prescriptionDispensed ? <span className="dispensed">(Dispensed)</span> : ""}</p>}
          {appt.followUp && <p className="followup-tag">⚠️ Follow-up required</p>}
        </div>

        <div className="history-toggle" style={{ marginTop: 8 }}>
          <button className="small" onClick={() => setShowTimeline(s => !s)}>{showTimeline ? "Hide history" : "View history / Add note"}</button>
        </div>

        {showTimeline && (
          <div className="timeline">
            <div className="timeline-list">
              {(appt.history || []).length === 0 ? <div className="empty">No history yet</div> : (
                (appt.history || []).map(h => (
                  <div key={h.id} className="timeline-item">
                    <div className="t-meta">{new Date(h.date).toLocaleString()} — <strong>{h.by}</strong></div>
                    <div className="t-note">{h.note}</div>
                  </div>
                ))
              )}
            </div>

            <div className="add-note">
              <input placeholder="Add history note (reception or doctor)..." value={note} onChange={(e) => setNote(e.target.value)} />
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button className="small primary-btn" onClick={handleAddNote}>Add Note</button>
                <button className="small" onClick={() => setNote("")}>Clear</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="right">
        <div className="time">{date}</div>

        <div className="actions">
          <button className="small done-btn" onClick={() => onToggle(appt.id)}>{appt.status === "completed" ? "Mark Undone" : "Mark Done"}</button>
          <button className="small danger-btn" onClick={() => onDelete(appt.id)}>Cancel</button>
          {/* Pharmacist-only mark dispense lives in pharmacy dashboard; keep here as info only */}
        </div>
      </div>
    </div>
  );
}
