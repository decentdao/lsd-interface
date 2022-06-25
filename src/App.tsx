import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Streams from './Streams';

function App() {
  return (
    <div className="container">
      <Header />
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
  );
}

export default App;
