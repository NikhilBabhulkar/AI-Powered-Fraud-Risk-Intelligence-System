document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('singleForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/single-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bank_account: document.getElementById('bank').value,
          mobile: document.getElementById('mobile').value,
          age: Number(document.getElementById('age').value),
          scheme: document.getElementById('scheme').value // <-- Added scheme field
        })
      });

      const result = await res.json();

      if (!res.ok || result.risk_score === undefined) {
        throw new Error(result.error || 'Server error');
      }

      resultDiv.innerHTML = `
        <h3>Risk Score: ${Number(result.risk_score).toFixed(2)}</h3>
        <h4>Risk Level: ${result.risk_level}</h4>
        <p>${result.explanation || ''}</p>
      `;

    } catch (err) {
      resultDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  });

});