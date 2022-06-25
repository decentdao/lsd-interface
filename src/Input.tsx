function Input({
  value,
  type,
  min,
  disabled,
  onChange,
  onKeyDown,
}: {
  value: string,
  type: string,
  min: string | number | undefined,
  disabled: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined,
}) {
  return (
    <div className="mb-4">
      <input
        type={type}
        min={min}
        className={`w-full border rounded py-1 px-2 shadow-inner ${disabled ? "disabled" : ""}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onWheel={e => (e.target as HTMLInputElement).blur()}
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
      />
    </div>
  );
}

function InputAddress({
  value,
  disabled,
  onChange,
}: {
  value: string,
  disabled: boolean,
  onChange: (newValue: string) => void,
}) {
  return (
    <Input
      value={value}
      type="text"
      min={undefined}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      onKeyDown={undefined}
    />
  );
}

function InputAmount({
  value,
  decimals,
  disabled,
  onChange,
}: {
  value: string,
  decimals: number | undefined,
  disabled: boolean,
  onChange: (newValue: string) => void,
}) {
  const format = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [beforeDot, afterDot] = e.target.value.split(".");

    if (!decimals || !afterDot) {
      onChange(beforeDot);
      return;
    }

    onChange(`${beforeDot}.${afterDot.substring(0, decimals)}`)
  }

  const stripChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return ['e', '+', '-'].includes(e.key) && e.preventDefault()
  }

  return (
    <Input
      value={value}
      type="number"
      min={0}
      disabled={disabled}
      onChange={format}
      onKeyDown={stripChars}
    />
  );
}

function InputNumber({
  value,
  disabled,
  onChange,
}: {
  value: string,
  disabled: boolean,
  onChange: (newValue: string) => void,
}) {
  const stripChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return ['e', '+', '-', '.'].includes(e.key) && e.preventDefault()
  }

  return (
    <Input
      value={value}
      type="number"
      min={0}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      onKeyDown={stripChars}
    />
  );
}

export {
  InputAddress,
  InputAmount,
  InputNumber,
};
