import React from 'react';

const CurrencyDisplay = ({ amount, currencySymbol }) => {
  return (
    <p>
      {currencySymbol} {amount}
    </p>
  );
};

export default CurrencyDisplay;
