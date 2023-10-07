import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p className=''>
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
