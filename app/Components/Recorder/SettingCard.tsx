import React from 'react';

interface SettingCardProps {
  header: string;
  sub: string;
}

const SettingCard: React.FC<SettingCardProps> = ({ header, sub }) => {
  return (
    <div className="mr-4 max-w-sm rounded overflow-hidden shadow-lg bg-white my-2">
      <div className="px-6 py-4">
        <div className="font-bold text-gray-700 text-xl mb-2">{header}</div>
        <p className="text-gray-700 text-base">
          {sub}
        </p>
      </div>
    </div>
  );
}

export default SettingCard;
