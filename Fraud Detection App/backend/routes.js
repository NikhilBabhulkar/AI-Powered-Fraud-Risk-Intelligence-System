const express = require('express');
const multer = require('multer');
const upload = multer();

const awsService = require('./services/awsService');
const lambdaService = require('./services/lambdaService');
const loginController = require('./controllers/loginController');
const auth = require('./middleware/auth');

const router = express.Router();

/* ==========================
   SINGLE BENEFICIARY CHECK
========================== */

router.post('/single-check', async (req, res) => {
  try {
    const { bankAccount, mobile, age } = req.body;

    if (!bankAccount || !mobile || !age)
      return res.status(400).json({ error: 'Missing fields' });

    const bankDup = 1; // demo logic
    const mobileDup = 1;
    const ageAnomaly = age > 100 ? 1 : 0;

    const riskScore = await lambdaService.getRiskScore({
      bank_dup_count: bankDup,
      mobile_dup_count: mobileDup,
      age_anomaly: ageAnomaly
    });

    const riskLevel =
      riskScore > 70 ? 'High' :
      riskScore > 40 ? 'Medium' : 'Low';

    res.json({
      riskScore,
      riskLevel
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   BULK CSV UPLOAD
========================== */

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'No file uploaded' });

    const key = await awsService.uploadCSV(
      req.file.originalname,
      req.file.buffer
    );

    res.json({ s3Key: key });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   LOGIN
========================== */

router.post('/login', loginController.login);

/* ==========================
   FRAUD ANALYSIS
========================== */

router.post('/fraud', auth, async (req, res) => {
  // TODO: Implement batch fraud analysis logic
  res.json({
    riskDistribution: [40, 60, 80, 100, 60, 40],
    topHighRisk: [
      { bankAccount: '123456', mobile: '9876543210', riskScore: 98 },
      { bankAccount: '654321', mobile: '8765432109', riskScore: 95 }
    ],
    financialLeakage: '1,20,000',
    csvResults: 'account,mobile,riskScore\n123456,9876543210,98\n654321,8765432109,95'
  });
});

/* ==========================
   RESULTS
========================== */

router.get('/results', auth, async (req, res) => {
  // TODO: Implement evaluation summary logic
  res.json({
    highRiskPercent: 8.2,
    mediumRiskPercent: 22.5,
    lowRiskPercent: 69.3,
    histogram: [10, 30, 80, 120, 60, 20],
    total: 10000,
    financialLeakage: '1,20,000'
  });
});

module.exports = router;