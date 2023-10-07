import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p className='fs-4 fw-normal'>
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
