import { useState, useEffect } from 'react';
import { BigNumber, utils } from 'ethers';

const useAmount = (amountInput: string, decimals: number | undefined) => {
  const [tokenAmount, setTokenAmount] = useState<BigNumber>();

  useEffect(() => {
    setTokenAmount(undefined);

    if (!decimals || amountInput.trim() === "") {
      return;
    }

    setTokenAmount(utils.parseUnits(amountInput, decimals));
  }, [amountInput, decimals]);

  return tokenAmount;
}

export default useAmount;
