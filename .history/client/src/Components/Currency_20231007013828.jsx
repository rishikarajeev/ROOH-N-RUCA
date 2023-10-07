import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p className='fs- fw-normal'>
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
