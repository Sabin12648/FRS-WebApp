// Spinner.tsx
import React from 'react';

const CardSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default CardSpinner;
