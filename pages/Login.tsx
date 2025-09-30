import React, { useState, useRef, useEffect } from 'react';
// FIX: Changed quotes on import to fix module resolution error.
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../constants';

const Login = () => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setError(''); // Clear error on new input
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      const fullPin = pin.join('');
      const user = login(fullPin);
      if (user) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid PIN. Please try again.');
        setPin(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
  }, [pin, login, navigate, from]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary">{APP_NAME}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Enter your 4-digit PIN</p>
        </div>
        <div className="flex justify-center space-x-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              // FIX: Corrected ref callback to have a void return type to match expected Ref type.
              ref={el => { inputRefs.current[index] = el; }}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-20 text-center text-4xl font-bold bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          ))}
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;