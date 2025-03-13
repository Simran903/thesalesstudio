import mongoose, { Document, Schema } from 'mongoose';

export interface ICouponClaim extends Document {
  couponId: mongoose.Types.ObjectId | { _id: mongoose.Types.ObjectId };
  ipAddress: string;
  clientId: string;
  claimedAt: Date;
}

const CouponClaimSchema: Schema = new Schema({
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  ipAddress: { type: String, required: true },
  clientId: { type: String, required: true },
  claimedAt: { type: Date, default: Date.now },
});

CouponClaimSchema.index({ ipAddress: 1, claimedAt: 1 });
CouponClaimSchema.index({ clientId: 1, claimedAt: 1 });

export default mongoose.model<ICouponClaim>('CouponClaim', CouponClaimSchema);