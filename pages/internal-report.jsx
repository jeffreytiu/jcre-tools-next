import React, { useState, useRef } from 'react';
import SoldReportList from '../components/SoldReportList';
import BuyerReportList from '../components/BuyerReportList';
import TotalReportList from '../components/TotalReportList';

export default function InternalReport() {
  const [listData, setListData] = useState(null);
  const soldReportRef = useRef(null);
  const buyerReportRef = useRef(null);
  const totalReportRef = useRef(null);

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

  const handlePrintSoldReport = () => {
    window.print();
  };

  const handlePrintBuyerReport = () => {
    window.print();
  };

  const handlePrintTotalReport = () => {
    window.print();
  };

  return (
    <main className={`container mx-auto p-4`}>
      <h1>Internal Report</h1>
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
        <div ref={soldReportRef}>
          <SoldReportList data={listData} />
          <button onClick={handlePrintSoldReport}>Print Sold Report</button>
        </div>
      )}
      {listData && (
        <div ref={buyerReportRef}>
          <BuyerReportList data={listData} />
          <button onClick={handlePrintBuyerReport}>Print Buyer Report</button>
        </div>
      )}
      {listData && (
        <div ref={totalReportRef}>
          <TotalReportList data={listData} />
          <button onClick={handlePrintTotalReport}>Print Total Report</button>
        </div>
      )}
    </main>
  );
}
