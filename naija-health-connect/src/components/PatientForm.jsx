import React, { useState } from "react";

export default function PatientForm({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState(false);

  const [errors, setErrors] = useState({});

  const reset = () => {
    setName("");
    setPhone("");
    setAge("");
    setReason("");
    setDiagnosis("");
    setPrescription("");
    setFollowUp(false);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name required";
    if (!phone.trim()) e.phone = "Phone required";
    if (age && Number(age) <= 0) e.age = "Enter valid age";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const patient = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      age: age ? Number(age) : null,
      reason: reason.trim(),
      diagnosis: diagnosis.trim(),
      prescription: prescription.trim(),
      followUp: followUp,
      createdAt: new Date().toISOString(),
      status: "scheduled"
    };

    onAdd(patient);
    reset();
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3>Register Patient</h3>

      <label>
        Full name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Amina Yusuf" />
        {errors.name && <small className="error">{errors.name}</small>}
      </label>

      <label>
        Phone
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0803xxxxxxx" />
        {errors.phone && <small className="error">{errors.phone}</small>}
      </label>

      <label className="row">
        <span>
          Age
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Optional" />
          {errors.age && <small className="error">{errors.age}</small>}
        </span>

        <span>
          Reason
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for visit" />
        </span>
      </label>

      {/* <label>
        Diagnosis
        <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="Doctor's diagnosis" />
      </label>

      <label>
        Prescription
        <input value={prescription} onChange={(e) => setPrescription(e.target.value)} placeholder="Prescribed medication" />
      </label> */}

      <label className="followup-check">
        <input
          type="checkbox"
          checked={followUp}
          onChange={(e) => setFollowUp(e.target.checked)}
        />
        Requires Follow-up Call?
      </label>

      <button type="submit" className="primary-btn">Add & Schedule</button>
    </form>
  );
}
