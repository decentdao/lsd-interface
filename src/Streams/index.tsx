import { Routes, Route, Navigate } from 'react-router-dom';
import New from './New';

function Streams() {
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate
            to="./.."
            replace={true}
          />
        }
      />
      <Route
        path="new"
        element={<New />}
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
