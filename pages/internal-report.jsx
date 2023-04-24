import React, { useState } from 'react';
import SoldReportList from '../components/SoldReportList';
import BuyerReportList from '../components/BuyerReportList';
import TotalReportList from '../components/TotalReportList';
import PrintComponent from '../components/PrintComponent';

export default function InternalReport() {
  const [listData, setListData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const fileData = JSON.parse(event.target?.result);
        setListData(fileData);
      }
    };

    reader.readAsText(file);
  };

  return (
    <main className={`container mx-auto p-4`}>
      <h1 className="text-3xl font-bold">Internal Report</h1>
      <br />
      <div className="">
        <label htmlFor="data-list-upload">Please upload MLS data list</label>
        <br />
        <input
          type="file"
          id="data-list-upload"
          accept=".json"
          onChange={handleFileUpload}
        />
      </div>
      <br />
      {listData && (
        <PrintComponent title="Sold Report">
          <SoldReportList data={listData} />
        </PrintComponent>
      )}
      {listData && (
        <PrintComponent title="Buyer Report">
          <BuyerReportList data={listData} />
        </PrintComponent>
      )}
      {listData && (
        <PrintComponent title="Total Report">
          <TotalReportList data={listData} />
        </PrintComponent>
      )}
    </main>
  );
}
