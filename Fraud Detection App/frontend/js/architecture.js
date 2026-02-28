// js/architecture.js
export function render(container) {
  container.innerHTML = `<div class="card architecture-card">
    <h2>System Architecture</h2>
    <pre class="arch-diagram">
Frontend
   ↓
Node Backend
   ↓
AWS S3
   ↓
Lambda Fraud Engine
   ↓
Hybrid ML + Graph + Anomaly Detection
   ↓
Risk Score Output
    </pre>
    <div class="arch-explanation">
      <p><b>Frontend:</b> Secure government portal for fraud analytics and beneficiary checks.</p>
      <p><b>Node Backend:</b> Handles authentication, input validation, and routes all requests securely to AWS.</p>
      <p><b>AWS S3:</b> Stores uploaded CSVs for bulk audit and batch processing.</p>
      <p><b>Lambda Fraud Engine:</b> Executes ML, graph, and anomaly detection models for risk scoring.</p>
      <p><b>Hybrid ML + Graph + Anomaly Detection:</b> Combines multiple techniques to flag suspicious beneficiaries and estimate financial leakage.</p>
      <p><b>Risk Score Output:</b> Returns actionable insights for government decision-makers.</p>
    </div>
  </div>`;
}
