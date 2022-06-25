import { ReactNode } from "react";

function Button({
  children,
  ...rest
}: {
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="border rounded py-1 px-2" {...rest}>
      {children}
    </button>
  );
}

export default Button;
