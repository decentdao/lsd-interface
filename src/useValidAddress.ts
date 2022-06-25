import { useState, useEffect } from 'react';
import { ethers, constants } from 'ethers';

const useValidAddress = (addressInput: string | undefined) => {
  const [validAddress, setValidAddress] = useState<boolean>();

  useEffect(() => {
    setValidAddress(undefined);

    if (addressInput === undefined) {
      setValidAddress(undefined);
      return;
    }

    if (addressInput.trim() === "") {
      return;
    }

    if (addressInput === constants.AddressZero) {
      setValidAddress(false);
      return;
    }

    if (ethers.utils.isAddress(addressInput)) {
      setValidAddress(true);
      return;
    }

    setValidAddress(false);
  }, [addressInput]);

  return validAddress
}

export default useValidAddress;
