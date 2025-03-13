import React from 'react';
import { Coupon } from '@/types';

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const expiryDate = new Date(coupon.expiresAt).toLocaleDateString();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto">
      <div className="border-b-2 border-dashed border-purple-300 pb-4 mb-4">
        <h3 className="text-2xl font-bold text-purple-600">{coupon.code}</h3>
      </div>
      <p className="text-gray-700 mb-4">{coupon.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Valid until: {expiryDate}</span>
        <div className="text-purple-600 font-medium">
          <button 
            onClick={() => navigator.clipboard.writeText(coupon.code)}
            className="hover:text-purple-800 focus:outline-none"
          >
            Copy code
          </button>
        </div>
      </div>
    </div>
  );
}