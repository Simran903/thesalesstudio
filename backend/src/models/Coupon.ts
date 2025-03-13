import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description: string;
  isActive: boolean;
  expiresAt: Date;
}

const CouponSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);