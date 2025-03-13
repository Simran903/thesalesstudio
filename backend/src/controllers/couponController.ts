import { Request, Response } from 'express';
import Coupon from '../models/Coupon';
import CouponClaim from '../models/CouponClaim';
import mongoose, { Document } from 'mongoose';
import { ICoupon } from '../models/Coupon';
import { ICouponClaim } from '../models/CouponClaim';

export const getNextCoupon = async (req: Request, res: Response): Promise<void> => {
  const clientId = req.cookies.clientId || '';
  const ipAddress = req.ip || req.socket.remoteAddress || '';
  
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const ipClaim = await CouponClaim.findOne({
      ipAddress,
      claimedAt: { $gte: oneHourAgo }
    });
    
    const clientClaim = await CouponClaim.findOne({
      clientId,
      claimedAt: { $gte: oneHourAgo }
    });
    
    if (ipClaim || clientClaim) {
      const claim = ipClaim || clientClaim;
      if (claim) {
        const remainingTime = calculateRemainingTime(claim);
        
        res.status(429).json({
          success: false,
          message: `You can claim another coupon in ${remainingTime.minutes} minutes and ${remainingTime.seconds} seconds.`
        });
        return;
      }
    }
    
    // Get all active coupons
    const activeCoupons = await Coupon.find({ 
      isActive: true,
      expiresAt: { $gt: new Date() }
    });
    
    if (activeCoupons.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No coupons available at the moment.'
      });
      return;
    }
    
    const lastClaim = await CouponClaim.findOne()
      .sort({ claimedAt: -1 })
      .populate('couponId');
    
    let nextCoupon: Document & ICoupon;
    
    if (!lastClaim) {
      nextCoupon = activeCoupons[0];
    } else {
      const lastCouponId = lastClaim.couponId instanceof mongoose.Types.ObjectId 
        ? lastClaim.couponId.toString() 
        : (lastClaim.couponId as any)._id.toString();
        
      const lastIndex = activeCoupons.findIndex(
        coupon => coupon._id.toString() === lastCouponId
      );
      
      const nextIndex = (lastIndex + 1) % activeCoupons.length;
      nextCoupon = activeCoupons[nextIndex];
    }
    
    const newClaim = new CouponClaim({
      couponId: nextCoupon._id,
      ipAddress,
      clientId,
      claimedAt: new Date()
    });
    
    await newClaim.save();
    
    res.status(200).json({
      success: true,
      message: 'Coupon claimed successfully!',
      coupon: {
        code: nextCoupon.code,
        description: nextCoupon.description,
        expiresAt: nextCoupon.expiresAt
      }
    });
    
  } catch (error) {
    console.error('Error claiming coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

const calculateRemainingTime = (claim: Document & ICouponClaim) => {
  const claimTime = new Date(claim.claimedAt).getTime();
  const currentTime = Date.now();
  const restrictionTimeMs = 60 * 60 * 1000;
  
  const timePassedMs = currentTime - claimTime;
  const remainingTimeMs = restrictionTimeMs - timePassedMs;
  
  const minutes = Math.floor(remainingTimeMs / (60 * 1000));
  const seconds = Math.floor((remainingTimeMs % (60 * 1000)) / 1000);
  
  return { minutes, seconds };
};

// Admin endpoint to add new coupons (for testing purposes)
export const addCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, description, expiresAt } = req.body;
    
    const newCoupon = new Coupon({
      code,
      description,
      expiresAt: new Date(expiresAt)
    });
    
    await newCoupon.save();
    
    res.status(201).json({
      success: true,
      message: 'Coupon added successfully',
      coupon: newCoupon
    });
  } catch (error) {
    console.error('Error adding coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};