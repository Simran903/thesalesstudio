import { CouponForm } from '@/components/CouponForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
title: 'Coupon Distribution System',
description: 'Round-Robin Coupon Distribution with Abuse Prevention',
};

export default function Home() {
return (
<div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
<main className="container mx-auto px-4 py-12">
  <div className="max-w-xl mx-auto">
    <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
      Coupon Distribution System
    </h1>
    <p className="text-gray-600 text-center mb-8">
      Claim your exclusive coupon below. Please note that you can only claim one coupon per hour.
    </p>
    
    <CouponForm />
    
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-purple-700 mb-3">
        How It Works
      </h2>
      <p className="text-gray-600 mb-2">
        Our system distributes coupons in a round-robin manner to ensure fair distribution.
      </p>
      <p className="text-gray-600">
        Each user can claim one coupon per hour to prevent abuse.
      </p>
    </div>
  </div>
</main>

<footer className="py-6 text-center text-gray-500 text-sm">
  <p>© {new Date().getFullYear()} Coupon Distribution System</p>
</footer>
</div>
);
}