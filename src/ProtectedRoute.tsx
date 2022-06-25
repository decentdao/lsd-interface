import { ReactNode } from "react";
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({
  isAllowed,
  redirectPath = '/',
  children,
}: {
  isAllowed: boolean,
  redirectPath?: string,
  children?: ReactNode,
}) {
  if (!isAllowed) {
    return (
      <Navigate to={redirectPath} replace />
    );
  }

  if (children) {
    return (
      <div>{children}</div>
    );
  }

  return (
    <Outlet />
  );
};

export default ProtectedRoute;
