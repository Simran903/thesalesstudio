import React from 'react';

interface StatusMessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function StatusMessage({ message, type }: StatusMessageProps) {
  const baseClasses = "p-4 rounded-md mb-6 text-center";
  
  const typeClasses = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200"
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
}