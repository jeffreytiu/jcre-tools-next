import React from 'react';

export default function BuyerReportList({ data }) {
  const filteredData = data?.filter(
    (item) => item['Buyer Agent Mls Id'] === 'CCHANJE1'
  );

  const listItems = filteredData?.map((item) => {
    const closePrice = parseFloat(item['Close Price'].replace(/[^\d.-]/g, ''));
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
    <>
      <h2>HOME Sold to Buyer ({listItems.length})</h2>
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
        <tbody>{listItems}</tbody>
      </table>
    </>
  );
}
