import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from '../models/Coupon';
import connectDB from '../config/db';

dotenv.config();

connectDB();

// Sample coupons for testing
const coupons = [
  {
    code: 'SPRING25',
    description: '25% off Spring Collection',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    code: 'SUMMER10',
    description: '10% off Summer Collection',
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
  },
  {
    code: 'FREESHIP',
    description: 'Free Shipping on orders over $50',
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
  },
  {
    code: 'WELCOME15',
    description: '15% off your first purchase',
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
  },
  {
    code: 'FLASH50',
    description: '50% off Flash Sale Items',
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  }
];

const seedCoupons = async () => {
  try {
    // Clear existing coupons
    await Coupon.deleteMany({});
    console.log('Existing coupons cleared');
    
    // Insert new coupons
    await Coupon.insertMany(coupons);
    console.log('Sample coupons added successfully');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding coupons:', error);
    process.exit(1);
  }
};

seedCoupons();