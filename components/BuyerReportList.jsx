import React from 'react';
import CloseDateYearChecker from './CloseDateYearChecker';

export default function BuyerReportList({ data }) {
  const filteredData = data?.filter(
    (item) => item['Buyer Agent Mls Id'] === 'CCHANJE1'
  );

  const processedData = filteredData?.map((item) => {
    const closePrice = parseFloat(item['Close Price'].replace(/[^\d.-]/g, ''));
    const listPrice = parseFloat(item['List Price'].replace(/[^\d.-]/g, ''));
    const percentage = ((closePrice / listPrice) * 100).toFixed(1) + '%';

    return {
      id: item.ID,
      address: item.Address,
      listPrice: listPrice,
      closePrice: closePrice,
      percentage: percentage || 0,
      dom: item.DOM,
    };
  });

  processedData.sort((a, b) => {
    // Sort by percentage, descending
    const percentageDiff = parseFloat(b.percentage) - parseFloat(a.percentage);
    if (percentageDiff !== 0) {
      return percentageDiff;
    }

    // If percentage is the same, sort by DOM, ascending
    return parseFloat(a.dom) - parseFloat(b.dom);
  });

  const listItems = processedData?.map((item) => {
    return (
      <tr key={item.id} className="even:bg-reportGreen odd:bg-white">
        <td className="border-r border-r-slate-300">{item.address}</td>
        <td className="border-r border-r-slate-300 text-center">
          {item.listPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          })}
        </td>
        <td className="border-r border-r-slate-300 text-center">
          {item.closePrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          })}
        </td>
        <td className="border-r border-r-slate-300 text-center">
          {item.percentage}
        </td>
        <td className="text-center">{item.dom}</td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="text-3xl text-titleGreen">
        HOME <span className="text-titleBlue">Sold to Buyer</span> (
        {listItems.length}) <CloseDateYearChecker data={data} />
      </h2>
      <table className="mb-4 mt-8 w-full max-w-screen-xl" cellPadding={6}>
        <thead>
          <tr className="border-t-2 border-b-2 border-t-titleGreen border-b-slate-400">
            <th className="w-4/12 border-r border-r-slate-300">Address</th>
            <th className="w-2/12 border-r border-r-slate-300">List Price</th>
            <th className="w-2/12 border-r border-r-slate-300">Close Price</th>
            <th className="w-2/12 border-r border-r-slate-300">Percentage</th>
            <th className="w-2/12">DOM</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </>
  );
}
