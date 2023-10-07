import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p className='fs-'>
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
