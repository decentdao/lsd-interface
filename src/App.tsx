import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Streams from './Streams';

function App() {
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
            element={<Streams />}
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
