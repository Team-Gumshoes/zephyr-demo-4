import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Profile = React.lazy(() => import('profile/Module'));
const Button = React.lazy(() => import('profile/Button'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the Platform. The Remote button is being consumed
              rendered: <Button />
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
