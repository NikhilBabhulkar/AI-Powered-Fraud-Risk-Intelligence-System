// js/singleCheck.js
export function render(container) {
  container.innerHTML = `
    <div class="card single-check-card">
      <h2>Single Beneficiary Fraud Check</h2>
      <form id="singleForm">
        <input type="text" id="bank" placeholder="Bank Account" required>
        <input type="text" id="mobile" placeholder="Mobile" required>
        <input type="number" id="age" placeholder="Age" required>
        <button type="submit">Check Risk</button>
      </form>
      <div id="result"></div>
      <div id="explanationPanel" class="explanation-panel"></div>
      <div id="impactEstimate" class="impact-estimate"></div>
    </div>
    <script src="app.js"></script>
  `;

  // Attach form logic
  setTimeout(() => {
    const form = document.getElementById('singleForm');
    const resultDiv = document.getElementById('result');
    const explanationPanel = document.getElementById('explanationPanel');
    const impactEstimate = document.getElementById('impactEstimate');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        bankAccount: document.getElementById('bank').value,
        mobile: document.getElementById('mobile').value,
        age: Number(document.getElementById('age').value)
      };
      resultDiv.innerHTML = '<div class="progress-circle"><div class="spinner"></div></div>';
      explanationPanel.innerHTML = '';
      impactEstimate.innerHTML = '';
      try {
        const res = await fetch('/api/single-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        resultDiv.innerHTML = `
          <h3>Risk Score: <span class="risk-score">${result.riskScore.toFixed(2)}</span></h3>
          <h4 class="risk-level ${result.riskLevel.toLowerCase()}">${result.riskLevel}</h4>
        `;
        explanationPanel.innerHTML = `<strong>Explanation:</strong> This score is based on duplicate bank/mobile and age anomaly.`;
        let impact = 'Estimated financial impact: ₹';
        if (result.riskLevel === 'High') impact += '10,000+';
        else if (result.riskLevel === 'Medium') impact += '2,000+';
        else impact += '500+';
        impactEstimate.innerHTML = impact;
      } catch (err) {
        resultDiv.innerHTML = '<span style="color:#DC2626">Error checking risk.</span>';
      }
    });
  }, 100);
}
