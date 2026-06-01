import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const isDev = process.env.NODE_ENV !== 'production';
const corsOriginEnv = process.env.CORS_ORIGIN || process.env.FRONTEND_URL;
app.use(cors({
  origin: isDev
    // in development reflect the request origin (allows Vite auto ports)
    ? true
    // in production use the configured origin or FRONTEND_URL
    : (corsOriginEnv || 'http://localhost:5173'),
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/forms', formRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Taj Skyview Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📊 Google Sheets configured: ${process.env.GOOGLE_SHEET_ID ? '✓' : '✗'}`);
  console.log(`📈 Environment: ${process.env.NODE_ENV}`);
  
  if (!process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID === 'your_sheet_id_here') {
    console.warn('⚠️  WARNING: GOOGLE_SHEET_ID not configured! Update backend/.env with your Google Sheet ID');
    console.warn('   Visit: http://localhost:' + PORT + '/api/forms/sheets/setup to setup headers once configured');
  }
});

export default app;
