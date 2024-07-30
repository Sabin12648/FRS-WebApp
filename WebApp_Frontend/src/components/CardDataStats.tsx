import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: number | ReactNode;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
      

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-lg font-medium">{title}</span>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          
        </div>
      </div>
      <div className="flex flex-row-reverse">
        {children}
      </div>
    </div>
  );
};

export default CardDataStats;
