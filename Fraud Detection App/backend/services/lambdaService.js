const axios = require('axios');

exports.getRiskScore = async (features) => {

  const response = await axios.post(
    process.env.LAMBDA_API_URL,
    features,
    { headers: { 'Content-Type': 'application/json' } }
  );

  return response.data.risk_score;
};