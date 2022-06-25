import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Streams from './Streams';

function App() {
  return (
    <div className="container min-h-screen flex flex-col pb-8">
      <Header />
      <Routes>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="streams/*"
          element={
            <div className="mt-16">
              <Streams />
            </div>
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
  );
}

export default App;
