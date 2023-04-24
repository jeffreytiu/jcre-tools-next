import React, { useState } from 'react';

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

  // filter the data and create a list of sold properties
  const soldReportList = listData
    ?.filter((item) => item['List Agent Mls Id'] === 'CCHANJE1')
    .map((item) => {
      const closePrice = parseFloat(
        item['Close Price'].replace(/[^\d.-]/g, '')
      );
      const listPrice = parseFloat(item['List Price'].replace(/[^\d.-]/g, ''));
      const percentage = ((closePrice / listPrice) * 100).toFixed(1) + '%';
      return (
        <tr key={item.ID}>
          <td>{item.Address}</td>
          <td>{item['List Price']}</td>
          <td>{item['Close Price']}</td>
          <td>{percentage || 0}</td>
          <td>{item.DOM}</td>
        </tr>
      );
    });

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
        <div>
          <h2>HOME Sold to Buyer ({soldReportList.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>List Price</th>
                <th>Close Price</th>
                <th>Percentage</th>
                <th>DOM</th>
              </tr>
            </thead>
            <tbody>{soldReportList}</tbody>
          </table>
        </div>
      )}
    </main>
  );
}
