// js/overview.js
export function render(container) {
  container.innerHTML = `
    <section class="hero">
      <h1>AI-Based Fake Beneficiary Detection System for Government Welfare Schemes</h1>
      <p class="subtitle">Safeguarding public funds with advanced ML, graph analytics, and anomaly detection.</p>
      <button class="cta" onclick="window.location.href='singleCheck.html'">Start Single Check</button>
    </section>
    <section class="problem">
      <h2>Problem Statement</h2>
      <p>Financial leakage and fake beneficiaries undermine social justice and DBT transparency in welfare schemes.</p>
    </section>
    <section class="why">
      <h2>Why This Matters</h2>
      <ul>
        <li>Protects government funds</li>
        <li>Ensures social justice</li>
        <li>Improves DBT transparency</li>
      </ul>
    </section>
    <section class="how">
      <h2>How It Works</h2>
      <p>Combines machine learning, graph analytics, and anomaly detection to flag suspicious beneficiaries.</p>
    </section>
    <section class="architecture">
      <h2>Architecture Diagram</h2>
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
    </section>
  `;
}
