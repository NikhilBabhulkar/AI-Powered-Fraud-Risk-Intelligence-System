# AI-Based Fake Beneficiary Detection System for Government Welfare Schemes

## 1. Project Overview
A secure, cloud-native analytics platform to detect fake beneficiaries in government welfare schemes using AI, ML, and graph-based anomaly detection. Built for rapid deployment and hackathon demonstration.

## 2. Problem Statement
Government welfare schemes face financial leakage due to fraudulent or duplicate beneficiaries. Manual audits are slow and error-prone, risking public funds and trust.

## 3. Solution Architecture
- **Frontend:** Secure login, dashboard, file upload, analytics, and fraud visualization.
- **Backend:** Node.js REST API, AWS S3 for data storage, Lambda for fraud scoring, secure environment config.
- **AWS:** S3 for CSV storage/results, Lambda for ML/graph/anomaly detection.

**Workflow:**
1. Government uploads CSV →
2. Backend uploads to S3 →
3. Lambda processes ML + Graph + Anomaly detection →
4. Risk score generated →
5. Results stored in S3 →
6. Dashboard displays risk analytics

## 4. Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JS, Chart.js
- **Backend:** Node.js, Express.js, AWS SDK, dotenv, helmet, cors, multer
- **AWS:** S3, Lambda

## 5. Setup Instructions
1. Clone repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in AWS credentials and config.
3. Start server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in browser.

## 6. AWS Configuration Guide
- Create S3 bucket and Lambda fraud scoring endpoint.
- Set IAM permissions for S3 and Lambda.
- Update `.env` with keys, region, bucket, and Lambda URL.

## 7. How to Run Locally
- Start backend (`npm start`)
- Access frontend at `localhost:3000`
- Upload sample CSV and run analysis

## 8. Deployment Guide
- Deploy backend to AWS EC2/Elastic Beanstalk
- Use AWS Secrets Manager for credentials
- Configure S3 and Lambda endpoints
- Set up HTTPS and WAF for security

## 9. Security Considerations
- AWS keys never exposed to frontend
- All AWS calls via backend
- Helmet, CORS, rate limiting enabled
- Environment variable validation
- Use HTTPS in production

## 10. Hackathon Demo Script
1. Login as government official
2. Upload sample CSV
3. Click "Run Fraud Analysis"
4. View risk distribution chart, high-risk table, leakage estimate
5. Explain workflow and security

## 11. Future Improvements
- Add real authentication (OAuth2)
- Integrate advanced ML models
- Role-based access control
- Audit logs and notifications
- Multi-scheme support

---

**For any queries, contact Tech Warriors.**
