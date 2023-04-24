import React from 'react';

export default function TotalReportList({ data }) {
  const countBySubdivision = {};

  data.forEach((item) => {
    const subdivision = item.Subdivision;
    const isSold = item['List Agent Mls Id'] === 'CCHANJE1';
    const isBuyer = item['Buyer Agent Mls Id'] === 'CCHANJE1';

    if (isSold && isBuyer) {
      countBySubdivision[subdivision] = {
        both: (countBySubdivision[subdivision]?.both ?? 0) + 1,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 2,
      };
    } else if (isSold) {
      countBySubdivision[subdivision] = {
        sold: (countBySubdivision[subdivision]?.sold ?? 0) + 1,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 1,
      };
    } else if (isBuyer) {
      countBySubdivision[subdivision] = {
        buyer: (countBySubdivision[subdivision]?.buyer ?? 0) + 1,
        total: (countBySubdivision[subdivision]?.total ?? 0) + 1,
      };
    }
  });

  const tableRows = Object.entries(countBySubdivision).map(
    ([subdivision, { sold = 0, buy = 0, both = 0, total = 0 }]) => (
      <tr key={subdivision}>
        <td>{subdivision}</td>
        <td>{sold}</td>
        <td>{buy}</td>
        <td>{both}</td>
        <td>{total}</td>
      </tr>
    )
  );

  return (
    <>
      <h2>Community Sales Report</h2>
      <table>
        <thead>
          <tr>
            <th>Community</th>
            <th>SOLD</th>
            <th>BUYER</th>
            <th>BOTH</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
