// js/bulkAudit.js
export function render(container) {
  container.innerHTML = `
    <div class="card bulk-audit-card">
      <h2>Bulk Fraud Audit</h2>
      <div class="upload-area" id="uploadArea">
        <p>Drag & drop CSV file here or <label for="csvInput" class="upload-label">browse</label></p>
        <input type="file" id="csvInput" accept=".csv" style="display:none;">
      </div>
      <button id="analyzeBtn" disabled>Analyze</button>
      <div id="auditResults"></div>
    </div>
  `;

  const uploadArea = container.querySelector('#uploadArea');
  const csvInput = container.querySelector('#csvInput');
  const analyzeBtn = container.querySelector('#analyzeBtn');
  let fileBuffer = null;

  uploadArea.addEventListener('click', () => csvInput.click());
  uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.classList.add('dragging');
  });
  uploadArea.addEventListener('dragleave', e => {
    e.preventDefault();
    uploadArea.classList.remove('dragging');
  });
  uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('dragging');
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });
  csvInput.addEventListener('change', e => {
    const file = e.target.files[0];
    handleFile(file);
  });

  function handleFile(file) {
    if (!file || file.type !== 'text/csv' || file.size > 5 * 1024 * 1024) {
      alert('Please upload a valid CSV file (max 5MB).');
      return;
    }
    fileBuffer = file;
    analyzeBtn.disabled = false;
    uploadArea.innerHTML = `<p>File ready: ${file.name}</p>`;
  }

  analyzeBtn.addEventListener('click', async () => {
    if (!fileBuffer) return;
    const formData = new FormData();
    formData.append('file', fileBuffer);
    const resultsDiv = container.querySelector('#auditResults');
    resultsDiv.innerHTML = '<div class="progress-circle"><div class="spinner"></div> Analyzing...</div>';
    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.s3Key) throw new Error('Upload failed');
      const fraudRes = await fetch('/api/fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3Key: uploadData.s3Key })
      });
      const fraudData = await fraudRes.json();
      if (!fraudRes.ok) throw new Error('Fraud analysis failed');
      // Render results
      resultsDiv.innerHTML = `
        <h3>Risk Score Distribution</h3>
        <div id="riskChart"></div>
        <h4>Top High-Risk Beneficiaries</h4>
        <table class="high-risk-table">
          <tr><th>Account</th><th>Mobile</th><th>Risk Score</th></tr>
          ${fraudData.topHighRisk.map(r => `<tr><td>${r.bankAccount}</td><td>${r.mobile}</td><td>${r.riskScore}</td></tr>`).join('')}
        </table>
        <div class="leakage-estimate">Estimated Financial Leakage: ₹${fraudData.financialLeakage}</div>
        <button id="downloadBtn">Download Results</button>
      `;
      // Chart rendering (simple bar)
      setTimeout(() => {
        const chart = document.getElementById('riskChart');
        chart.innerHTML = fraudData.riskDistribution.map((v, i) => `<div style="display:inline-block;width:18px;height:${v}px;background:#1E3A8A;margin:2px;border-radius:4px;"></div>`).join('');
      }, 100);
      // Download button
      document.getElementById('downloadBtn').onclick = () => {
        const blob = new Blob([fraudData.csvResults], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fraud_results.csv';
        a.click();
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      resultsDiv.innerHTML = `<span style="color:#DC2626">Error: ${err.message}</span>`;
    }
  });
}
