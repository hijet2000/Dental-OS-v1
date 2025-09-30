import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';

export const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div>
        {/* Placeholder for breadcrumbs or page title */}
      </div>
      <div className="flex items-center">
        {currentUser && (
          <>
            <div className="text-right mr-4">
              <div className="font-semibold text-gray-800 dark:text-gray-100">{currentUser.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{currentUser.roles.join(' / ')}</div>
            </div>
            <Button onClick={logout} variant="secondary" size-sm="true">
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
