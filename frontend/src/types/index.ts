export interface Coupon {
  code: string;
  description: string;
  expiresAt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  coupon?: Coupon;
}