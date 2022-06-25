import { Routes, Route, Navigate } from 'react-router-dom';
import { useAccount } from "wagmi";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Home from './Home';
import Streams from './Streams';

function App() {
  const { data } = useAccount();

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="streams/*"
            element={
              <ProtectedRoute
                isAllowed={!!data}
                redirectPath="/"
              >
                <Streams />
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
      </div>
    </div>
  );
}

export default App;
