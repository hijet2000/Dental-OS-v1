import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, id, className, children, ...props }) => {
  const baseClasses = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md";

  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>}
      <select id={id} className={`${baseClasses} ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
};
