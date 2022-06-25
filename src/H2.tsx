import { ReactNode } from "react";

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-medium">
      {children}
    </h2>
  )
}

export default H2;
