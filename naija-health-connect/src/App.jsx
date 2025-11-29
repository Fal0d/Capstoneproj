import React from "react";
import PatientForm from "./components/PatientForm";
import AppointmentCard from "./components/AppointmentCard";
import ThemeToggle from "./components/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import PharmacyDashboard from "./components/PharmacyDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AuthPanel from "./components/AuthPanel";
import ExportButton from "./components/ExportButton";

export default function App() {
  const [appointments, setAppointments] = useLocalStorage("nhc_appts", []);
  const [view, setView] = useLocalStorage("nhc_view", "reception");
  const [session, setSession] = useLocalStorage("nhc_session", null);

  const addPatient = (patient) => {
    setAppointments(prev => [{ ...patient, history: patient.history || [] }, ...prev]);
    setView("reception");
  };

  const toggleComplete = (id) => {
    setAppointments(prev =>
      prev.map(p => p.id === id ? { ...p, status: p.status === "completed" ? "scheduled" : "completed" } : p)
    );
  };

  const deleteAppt = (id) => setAppointments(prev => prev.filter(p => p.id !== id));

  const addHistory = (id, note, by = "staff") => {
    setAppointments(prev =>
      prev.map(p => p.id === id
        ? { ...p, history: [{ id: Date.now(), note, by, date: new Date().toISOString() }, ...(p.history || [])] }
        : p
      )
    );
  };

  const doctorSave = (id, { diagnosis, prescription, followUp }) => {
    setAppointments(prev =>
      prev.map(p => p.id === id ? { ...p, diagnosis, prescription, followUp } : p)
    );
  };

  const markDispensed = (id) => {
    setAppointments(prev =>
      prev.map(p => p.id === id ? { ...p, prescriptionDispensed: true } : p)
    );
  };

  const handleLogin = (user) => {
    setSession(user);
    if (user.role === "doctor") setView("doctor");
    else if (user.role === "pharmacist") setView("pharmacy");
    else setView("reception");
  };

  const handleLogout = () => {
    setSession(null);
    setView("reception");
  };

  return (
    <div className="app-container">
      <header className="topbar">
        <div className="brand">
          <div className="logo">🩺</div>
          <div>
            <h1>NaijaHealth Connect</h1>
            <p className="tagline">Lightweight patient registry & clinic workflow manager</p>
          </div>
        </div>
        <div className="controls">
          <ThemeToggle />
        </div>
      </header>

      <div style={{ marginBottom: 12 }}>
        <AuthPanel session={session} onLogin={handleLogin} onLogout={handleLogout} />
      </div>

      <main className="grid">
        {session?.role === "reception" && view === "reception" && (
          <>
            <section className="left-col">
              <PatientForm onAdd={addPatient} />
              <div className="card stats">
                <h3>Clinic Quick Stats</h3>
                <div className="stat-row">
                  <div className="stat"><div className="num">{appointments.length}</div><div className="label">Total</div></div>
                  <div className="stat"><div className="num">{appointments.filter(a => a.status==="completed").length}</div><div className="label">Completed</div></div>
                  <div className="stat"><div className="num">{appointments.filter(a => a.status!=="completed").length}</div><div className="label">Pending</div></div>
                </div>
                <ExportButton appointments={appointments} />
              </div>
            </section>

            <section className="right-col">
              <h2>Appointments</h2>
              {appointments.length === 0 ? <div className="card empty">No appointments yet.</div>
                : appointments.map(a => (
                  <AppointmentCard key={a.id} appt={a} onToggle={toggleComplete} onDelete={deleteAppt} onAddHistory={addHistory} />
                ))
              }
            </section>
          </>
        )}

        {session?.role === "doctor" && view === "doctor" && (
          <DoctorDashboard appointments={appointments} onSave={doctorSave} onAddHistory={addHistory} onToggle={toggleComplete} onDelete={deleteAppt} />
        )}

        {session?.role === "pharmacist" && view === "pharmacy" && (
          <PharmacyDashboard appointments={appointments} onDispense={markDispensed} />
        )}
      </main>

      <footer className="footer card">
        <small>Built for clinic workflows in Nigeria • Data stores locally in your browser</small>
      </footer>
    </div>
  );
}