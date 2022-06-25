import { ReactNode } from "react";

function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-4xl font-bold">
      {children}
    </h1>
  )
}

export default H1;
