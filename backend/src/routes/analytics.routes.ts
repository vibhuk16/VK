import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';

const router = Router();

// Record endpoints
router.post('/session', analyticsController.recordSession);
router.post('/event', analyticsController.recordEvent);

// Retrieval endpoints
router.get('/data', analyticsController.getAnalytics);
router.get('/daily-stats', analyticsController.getDailyStats);

export default router; 