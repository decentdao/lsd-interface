import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import New from './New';
import List from './List';
import { useAccount } from "wagmi";

function Streams() {
  const { data } = useAccount();

  return (
    <Routes>
      <Route
        index
        element={<List />}
      />
      <Route
        path="new"
        element={
          <ProtectedRoute
            isAllowed={!!data}
            redirectPath="/"
          >
            <New />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to="."
            replace={true}
          />
        }
      />
    </Routes>
  )
}

export default Streams;
