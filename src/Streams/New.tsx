import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useBlockNumber, useEnsAddress, useProvider, useToken } from "wagmi";
import { Button, SecondaryButton } from "../Button";
import { InputAddress, InputAmount, InputNumber } from "../Input";
import PageHeader from "../PageHeader";
import useValidAddress from "../useValidAddress";
import useAmount from "../useAmount";

type Recipient = {
  id: number;
  address?: string | null;
  amount?: BigNumber;
}


function RecipientSection({
  validToken,
  symbol,
  decimals,
  setRecipients,
  index,
  remove,
}: {
  validToken: boolean,
  symbol?: string,
  decimals: number,
  setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>,
  index: number,
  remove?: ((index: number) => void),
}) {
  const [addressInput, setAddressInput] = useState("");
  const { data: address } = useEnsAddress({ name: addressInput });
  const validAddress = useValidAddress(addressInput);
  const [showAddressError, setShowAddressError] = useState(false);
  useEffect(() => {
    setShowAddressError(
      validAddress === false &&
      (address === null || address === undefined)
    );
  }, [address, validAddress]);

  const [amountInput, setAmountInput] = useState("");
  const amount = useAmount(amountInput, decimals);

  useEffect(() => {
    setRecipients(recipients => {
      const newRecipients = recipients.map((recipient, rIndex) => {
        if (rIndex !== index) {
          return recipient;
        }

        return {
          id: recipient.id,
          address,
          amount: amount ? BigNumber.from(amount) : amount
        };
      });

      return newRecipients;
    });
  }, [address, addressInput, amount, index, setRecipients]);

  return (
    <div className="border-t-2 border-black p-6 -mb-3">
      <div>
        <div className="flex justify-between items-end">
          <div>{`Recipient ${index + 1}`}</div>
          {remove && (
            <div className="my-2">
              <Button onClick={() => remove(index)}>
                Remove recipient
              </Button>
            </div>
          )}
        </div>
        <div>
          <div>
            <InputAddress
              value={addressInput}
              placeholder="Address"
              disabled={!validToken}
              onChange={setAddressInput}
            />
            {showAddressError && (
              <div className="-mt-6 mb-1 text-red-500 text-sm">
                Not a valid address
              </div>
            )}
          </div>
          <div>
            <div>Amount</div>
            <InputAmount
              value={amountInput}
              placeholder={symbol}
              decimals={decimals}
              disabled={!validToken}
              onChange={setAmountInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Recipients({
  validToken,
  decimals,
  symbol,
  recipients,
  setRecipients,
}: {
  validToken: boolean,
  decimals: number,
  symbol?: string,
  recipients: Recipient[],
  setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>
}) {
  const removeRecipient = (index: number) => {
    setRecipients(recipients => {
      const recipientsCopy = [...recipients];
      recipientsCopy.splice(index, 1);
      return recipientsCopy;
    });
  }

  const addRecipient = () => {
    setRecipients(recipients => {
      return [...recipients, createRecipient("", BigNumber.from(0))];
    });
  };

  return (
    <div>
      {recipients.map((recipient, index) => {
        return (
          <RecipientSection
            key={recipient.id}
            validToken={validToken}
            decimals={decimals}
            symbol={symbol}
            setRecipients={setRecipients}
            index={index}
            remove={recipients.length > 1 ? removeRecipient : undefined}
          />
        );
      })}
      <div className="px-6 pb-6">
        <button onClick={() => addRecipient()}>+ Add recipient</button>
      </div>
    </div>
  );
}

const createRecipient = (address: string, amount: BigNumber) => {
  return {
    id: Date.now(),
    address,
    amount,
  }
}

function New() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [maturationTimestampInput, setMaturationTimestampInput] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([createRecipient("", BigNumber.from(0))]);

  const provider = useProvider();
  const { data: currentBlockNumber } = useBlockNumber({ watch: true });
  const [currentBlockTimestamp, setCurrentBlockTimestamp] = useState<number>();
  useEffect(() => {
    if (currentBlockNumber === undefined) {
      setCurrentBlockTimestamp(undefined);
      return;
    }

    provider.getBlock(currentBlockNumber)
      .then(block => setCurrentBlockTimestamp(block.timestamp))
      .catch(console.error);
  }, [currentBlockNumber, provider]);

  const [maturationTimestamp, setMaturationTimestamp] = useState<number>();
  useEffect(() => {
    if (
      currentBlockTimestamp === undefined ||
      maturationTimestampInput === ""
    ) {
      setMaturationTimestamp(undefined);
      return;
    }

    const convertedMaturationTimestamp = Number(maturationTimestampInput);

    if (convertedMaturationTimestamp < currentBlockTimestamp) {
      setMaturationTimestamp(undefined);
      return;
    }

    setMaturationTimestamp(convertedMaturationTimestamp);
  }, [currentBlockTimestamp, maturationTimestampInput]);

  const { data: tokenData, isError: tokenError } = useToken({ address: tokenAddress });
  const [decimals, setDecimals] = useState(0);
  useEffect(() => {
    if (tokenData === undefined) {
      setDecimals(0);
      return;
    }

    setDecimals(tokenData.decimals);
  }, [tokenData]);

  const [symbol, setSymbol] = useState<string>();
  useEffect(() => {
    if (tokenData === undefined) {
      setSymbol(undefined);
      return;
    }

    setSymbol(tokenData.symbol);
  }, [tokenData]);

  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (
      tokenData === undefined ||
      maturationTimestamp === undefined
    ) {
      setValid(false);
      return;
    }

    setValid(true);
  }, [maturationTimestamp, tokenData]);

  return (
    <div className="border-2 border-black rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
      <div className="border-b-2 border-black p-6">
        <PageHeader>New Stream</PageHeader>
      </div>
      <div className="p-6 -mb-3">
        <div>
          <div>Token address</div>
          <InputAddress
            value={tokenAddress}
            disabled={false}
            onChange={setTokenAddress}
          />
          {tokenError && (
            <div className="-mt-6 mb-1 text-red-500 text-sm">
              Not a valid token address
            </div>
          )}
        </div>
        <div>
          <div>Maturation UNIX timestamp</div>
          <InputNumber
            value={maturationTimestampInput}
            disabled={false}
            onChange={setMaturationTimestampInput}
          />
        </div>
      </div>
      <div className="border-b-2 border-black">
        <Recipients
          validToken={tokenData !== undefined}
          decimals={decimals}
          symbol={symbol}
          recipients={recipients}
          setRecipients={setRecipients}
        />
      </div>
      <div className="p-6 flex justify-between">
        <Link to="..">
          <Button>Cancel</Button>
        </Link>
        <SecondaryButton disabled={!valid}>
          Confirm
        </SecondaryButton>
      </div>
    </div>
  );
}

export default New;
