import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p className='fs-6 fw-bold'>
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
