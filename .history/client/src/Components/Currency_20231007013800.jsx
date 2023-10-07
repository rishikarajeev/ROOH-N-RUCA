import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p >
     {amount} {currencySymbol} 
    </p>
  );
};

export default CurrencyDisplay;
