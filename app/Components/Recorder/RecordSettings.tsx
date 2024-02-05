import React from 'react'
import SettingCard from './SettingCard'

function RecordSettings() {
    const settings = [
        { header: "Template", sub: "Consult 1" },
        { header: "Audio Quality", sub: "High" },
        // Add more settings as needed
    ];

  return (
    <div className="flex flex-wrap">
      {settings.map((setting, index) => (
        <SettingCard key={index} header={setting.header} sub={setting.sub} />
      ))}
    </div>
  );
}


export default RecordSettings