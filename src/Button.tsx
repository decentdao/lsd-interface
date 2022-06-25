import { ReactNode } from "react";

function Button({
  children,
  ...rest
}: {
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="border-2 border-black rounded-lg py-2 px-4" {...rest}>
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  ...rest
}: {
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="bg-black text-white rounded-lg py-2 px-4" {...rest}>
      {children}
    </button>
  );
}

export { Button, SecondaryButton} ;
