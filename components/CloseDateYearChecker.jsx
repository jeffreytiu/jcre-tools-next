import React from 'react';

export default function CloseDateYearChecker({ data }) {
  let yearCount = {};

  data.forEach((item) => {
    const year = item['Close Date'].split('/')[2];
    !yearCount[year] ? (yearCount[year] = 1) : (yearCount[year] += 1);
  });

  let maxYear = null;
  let maxYearCount = 0;
  for (const year in yearCount) {
    if (yearCount[year] > maxYearCount) {
      maxYear = year;
      maxYearCount = yearCount[year];
    }
  }

  return maxYear && maxYearCount > data.length / 2 ? <>{maxYear}</> : <></>;
}
