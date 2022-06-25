import { BigNumber } from "ethers";
import { ReactNode, useEffect, useState } from "react";
import { useEnsAddress, useToken } from "wagmi";
import { Button } from "../Button";
import { InputAddress, InputAmount, InputNumber } from "../Input";
import PageHeader from "../PageHeader";
import useValidAddress from "../useValidAddress";
import useAmount from "../useAmount";

function InputSection({
  title,
  children,
}: {
  title: string,
  children: ReactNode,
}) {
  return (
    <div className="mb-2">
      <div>{title}</div>
      {children}
    </div>
  )
}

type Recipient = {
  id: number;
  address?: string | null;
  amount?: BigNumber;
}

function Recipients({
  validToken,
  decimals,
  recipients,
  setRecipients,
}: {
  validToken: boolean,
  decimals: number,
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
    <div className="ml-2">
      {recipients.map((recipient, index) => {
        return (
          <RecipientSection
            key={recipient.id}
            validToken={validToken}
            decimals={decimals}
            setRecipients={setRecipients}
            index={index}
            remove={recipients.length > 1 ? removeRecipient : undefined}
          />
        );
      })}
      <Button onClick={() => addRecipient()}>add recipient</Button>
    </div>
  );
}

function RecipientSection({
  validToken,
  decimals,
  setRecipients,
  index,
  remove,
}: {
  validToken: boolean,
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
    <InputSection title={`Recipient ${index + 1}`}>
      {remove && (
        <div className="my-2 ml-2">
          <Button onClick={() => remove(index)}>
            remove recipient
          </Button>
        </div>
      )}
      <div className="ml-2">
        <InputSection title="Address:">
          <InputAddress
            value={addressInput}
            disabled={!validToken}
            onChange={setAddressInput}
          />
          {showAddressError && (
            <div className="-mt-4 text-red-500 text-sm">
              Not a valid address
            </div>
          )}
        </InputSection>
        <InputSection title="Amount:">
          <InputAmount
            value={amountInput}
            decimals={decimals}
            disabled={!validToken}
            onChange={setAmountInput}
          />
        </InputSection>
      </div>
    </InputSection>
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
  const [maturationTimestamp, setMaturationTimestamp] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([createRecipient("", BigNumber.from(0))]);

  const { data: tokenData, isError: tokenError } = useToken({ address: tokenAddress });
  const [decimals, setDecimals] = useState(0);
  useEffect(() => {
    if (tokenData === undefined) {
      setDecimals(0);
      return;
    }

    setDecimals(tokenData.decimals);
  }, [tokenData]);

  return (
    <div>
      <PageHeader>New Stream</PageHeader>
      <div>
        <InputSection title="Token address:">
          <InputAddress
            value={tokenAddress}
            disabled={false}
            onChange={setTokenAddress}
          />
          {tokenError && (
            <div className="-mt-4 text-red-500 text-sm">
              Not a valid token address
            </div>
          )}
        </InputSection>
        <InputSection title="Maturation timestamp:">
          <InputNumber
            value={maturationTimestamp}
            disabled={false}
            onChange={setMaturationTimestamp}
          />
        </InputSection>
        <InputSection title="Recipients">
          <Recipients
            validToken={tokenData !== undefined}
            decimals={decimals}
            recipients={recipients}
            setRecipients={setRecipients}
          />
        </InputSection>
      </div>
    </div>
  );
}

export default New;
