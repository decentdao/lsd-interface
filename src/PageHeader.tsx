import { ReactNode } from "react";

function PageHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b pb-4 mb-4 text-2xl">
      {children}
    </div>
  );
}

export default PageHeader;
