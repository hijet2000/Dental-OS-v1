import React from 'react';

interface ToggleProps {
  label: React.ReactNode;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange, description }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="flex-grow flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
        {description && <span className="text-sm text-gray-500 dark:text-gray-400">{description}</span>}
      </span>
      <button
        type="button"
        className={`${
          enabled ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-gray-700'
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary`}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
      >
        <span
          aria-hidden="true"
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </button>
    </div>
  );
};
