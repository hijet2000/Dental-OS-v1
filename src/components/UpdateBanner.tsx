import React from 'react';

export const UpdateBanner = () => {
  // This is a placeholder for now.
  // In a real PWA, its visibility would be controlled by a service worker state.
  const isUpdateAvailable = false; 

  if (!isUpdateAvailable) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 p-3 text-center z-50">
      A new version is available! <button className="underline font-bold" onClick={() => window.location.reload()}>Update Now</button>
    </div>
  );
};
