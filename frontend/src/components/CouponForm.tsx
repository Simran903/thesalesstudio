'use client'

import React, { useState } from 'react';
import { CouponCard } from './ui/CouponCard';
import { StatusMessage } from './ui/StatusMessage';
import { Coupon } from '@/types';
import { claimCoupon } from '@/lib/actions';

export function CouponForm() {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClaimCoupon = async () => {
    setIsLoading(true);
    setMessage(null);
    setCoupon(null);
    
    try {
      const response = await claimCoupon();
      
      if (response.success && response.coupon) {
        setCoupon(response.coupon);
        setMessageType('success');
      } else {
        setMessageType('error');
      }
      
      setMessage(response.message);
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      {message && <StatusMessage message={message} type={messageType} />}
      
      <div className="text-center">
        <button
          onClick={handleClaimCoupon}
          disabled={isLoading}
          className={`
            px-6 py-3 rounded-lg text-white font-medium 
            ${isLoading 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'}
            transition duration-200
          `}
        >
          {isLoading ? 'Processing...' : 'Claim Your Coupon'}
        </button>
      </div>
      
      {coupon && (
        <div className="mt-8">
          <CouponCard coupon={coupon} />
        </div>
      )}
    </div>
  );
}