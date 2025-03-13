import express from 'express';
import { getNextCoupon, addCoupon } from '../controllers/couponController';
import { ensureClientId } from '../middleware/cookieMiddleware';

const router = express.Router();

// Apply clientId middleware to ensure all requests have a clientId cookie
router.use(ensureClientId);

// Route to get next coupon in round-robin fashion
router.get('/claim', getNextCoupon);

// Admin route to add new coupons (for testing)
router.post('/add', addCoupon);

export default router;