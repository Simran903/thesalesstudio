'use server'

import { API_URL } from './api';
import { ApiResponse } from '@/types';

export const claimCoupon = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/coupons/claim`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error: ${response.status} - Too many requests. Please try again later.`,
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error claiming coupon:', error);
    return {
      success: false,
      message: 'Failed to connect to the server. Please try again later.',
    };
  }
};