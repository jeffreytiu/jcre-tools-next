import React from 'react';
import { useReactToPrint } from 'react-to-print';

export default function PrintComponent({ title, children }) {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printStyle = {
    padding: '2rem',
  };

  return (
    <>
      <div style={printStyle} ref={componentRef}>
        {children}

        <button className="btn" onClick={handlePrint}>
          Print {title}
        </button>
      </div>
    </>
  );
}
