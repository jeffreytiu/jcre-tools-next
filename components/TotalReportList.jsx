import React, { useState, useEffect } from 'react';
import CloseDateYearChecker from './CloseDateYearChecker';

export default function TotalReportList({ data }) {
  const [grandTotal, setGrandTotal] = useState(0);
  const countBySubdivision = {};

  data.forEach((item) => {
    const subdivision = item.Subdivision;
    const isSold = item['List Agent Mls Id'] === 'CCHANJE1';
    const isBuyer = item['Buyer Agent Mls Id'] === 'CCHANJE1';

    if (isSold && isBuyer) {
      countBySubdivision[subdivision] = {
        buy: countBySubdivision[subdivision]?.buy ?? 0,
        sold: countBySubdivision[subdivision]?.sold ?? 0,
        both: (countBySubdivision[subdivision]?.both ?? 0) + 1,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 2,
      };
    } else if (isSold) {
      countBySubdivision[subdivision] = {
        buy: countBySubdivision[subdivision]?.buy ?? 0,
        sold: (countBySubdivision[subdivision]?.sold ?? 0) + 1,
        both: countBySubdivision[subdivision]?.both ?? 0,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 1,
      };
    } else if (isBuyer) {
      countBySubdivision[subdivision] = {
        buy: (countBySubdivision[subdivision]?.buy ?? 0) + 1,
        sold: countBySubdivision[subdivision]?.sold ?? 0,
        both: countBySubdivision[subdivision]?.both ?? 0,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 1,
      };
    }
  });

  useEffect(() => {
    let total = 0;
    Object.values(countBySubdivision).forEach(({ total: count }) => {
      total += count;
    });
    setGrandTotal(total);
  }, [countBySubdivision]);

  const tableRows = Object.entries(countBySubdivision).map(
    ([subdivision, { sold = 0, buy = 0, both = 0, total = 0 }]) => (
      <tr key={subdivision} className="even:bg-reportGreen odd:bg-white">
        <td className="border-r border-r-slate-300">{subdivision}</td>
        <td className="border-r border-r-slate-300 text-center">{sold}</td>
        <td className="border-r border-r-slate-300 text-center">{buy}</td>
        <td className="border-r border-r-slate-300 text-center">{both}</td>
        <td className="text-center">{total}</td>
      </tr>
    )
  );

  return (
    <>
      <h2 className="text-3xl text-titleGreen">
        <CloseDateYearChecker data={data} /> Community Sales Report (
        {grandTotal})
      </h2>
      <table className="mb-4 mt-8 w-full max-w-screen-xl" cellPadding={6}>
        <thead>
          <tr className="border-t-2 border-b-2 border-t-titleGreen border-b-slate-400">
            <th className="w-4/12 border-r border-r-slate-300">Community</th>
            <th className="w-2/12 border-r border-r-slate-300">SOLD</th>
            <th className="w-2/12 border-r border-r-slate-300">BUYER</th>
            <th className="w-2/12 border-r border-r-slate-300">BOTH</th>
            <th className="w-2/12">TOTAL</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
