// js/evaluation.js
export function render(container) {
  container.innerHTML = `<div class="card evaluation-card">
    <h2>Evaluation & Insights</h2>
    <div id="evalSummary"></div>
    <div id="evalChart"></div>
    <div id="evalText"></div>
  </div>`;

  // Fetch evaluation data
  setTimeout(async () => {
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      document.getElementById('evalSummary').innerHTML = `
        <h3>Risk Distribution Summary</h3>
        <ul>
          <li>High Risk: <span style="color:#DC2626">${data.highRiskPercent}%</span></li>
          <li>Medium Risk: <span style="color:#FACC15">${data.mediumRiskPercent}%</span></li>
          <li>Low Risk: <span style="color:#16A34A">${data.lowRiskPercent}%</span></li>
        </ul>
      `;
      // Histogram
      document.getElementById('evalChart').innerHTML = `<h4>Fraud Probability Histogram</h4><div style="display:flex;align-items:flex-end;height:120px;">
        ${data.histogram.map(v => `<div style="width:18px;height:${v}px;background:#312E81;margin:2px;border-radius:4px;"></div>`).join('')}
      </div>`;
      // Summary text
      document.getElementById('evalText').innerHTML = `<p>Out of ${data.total} beneficiaries, <b>${data.highRiskPercent}%</b> are flagged as high risk, potentially saving <b>₹${data.financialLeakage}</b> annually.</p>`;
    } catch (err) {
      document.getElementById('evalSummary').innerHTML = `<span style="color:#DC2626">Error loading insights.</span>`;
    }
  }, 100);
}
