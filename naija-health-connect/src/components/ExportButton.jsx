import React from "react";

export default function ExportButton({ appointments = [] }) {
  const exportAll = () => {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const rows = appointments.map(a => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd">${a.name}</td>
        <td style="padding:8px;border:1px solid #ddd">${a.phone}</td>
        <td style="padding:8px;border:1px solid #ddd">${a.diagnosis || ""}</td>
        <td style="padding:8px;border:1px solid #ddd">${a.prescription || ""}</td>
        <td style="padding:8px;border:1px solid #ddd">${a.followUp ? "Yes" : "No"}</td>
        <td style="padding:8px;border:1px solid #ddd">${new Date(a.createdAt).toLocaleString()}</td>
      </tr>
    `).join("");
    const html = `
      <html>
        <head><title>Clinic Export</title></head>
        <body style="font-family:Arial;padding:20px">
          <h2>Clinic Appointments Export</h2>
          <table style="border-collapse:collapse;width:100%;margin-top:12px">
            <thead>
              <tr>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Name</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Phone</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Diagnosis</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Prescription</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Follow-up</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left">Created</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <script>window.print();window.onafterprint = ()=>window.close();</script>
        </body>
      </html>
    `;
    w.document.write(html);
    w.document.close();
  };

  return <button className="primary-btn" onClick={exportAll}>Export All (Print/PDF)</button>;
}
