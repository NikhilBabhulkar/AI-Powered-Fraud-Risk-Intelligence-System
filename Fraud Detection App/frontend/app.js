document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('singleForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      bankAccount: document.getElementById('bank').value,
      mobile: document.getElementById('mobile').value,
      age: Number(document.getElementById('age').value)
    };

    try {
      const res = await fetch('http://localhost:5000/api/single-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      resultDiv.innerHTML = `
        <h3>Risk Score: ${result.riskScore.toFixed(2)}</h3>
        <h4>Risk Level: ${result.riskLevel}</h4>
      `;

    } catch (err) {
      resultDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  });

});