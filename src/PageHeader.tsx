import { ReactNode } from "react";

function PageHeader({ children }: { children: ReactNode }) {
  return (
    <div className="text-2xl font-bold">
      {children}
    </div>
  );
}

export default PageHeader;
