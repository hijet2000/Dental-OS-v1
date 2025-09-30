import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastIcons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
};

const toastColors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
}

// FIX: Use ReturnType<typeof setTimeout> for better portability between environments.
let toastTimeout: ReturnType<typeof setTimeout>;

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    toastTimeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(toastTimeout);
    };
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-5 right-5 max-w-sm w-full p-4 rounded-md border shadow-lg z-50 ${toastColors[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{toastIcons[type]}</div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex rounded-md p-1.5 text-current focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};