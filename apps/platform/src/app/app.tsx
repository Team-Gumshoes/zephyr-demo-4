import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Profile = React.lazy(() => import('profile/Module'));
const Button = React.lazy(() => import('profile/Button'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <main className="m-5">
        <ul>
          <li>
            <Link to="/">Platform</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <Routes>
          <Route
            path="/"
            element={
              <div className="border border-red-500 bg-red-100 p-2 m-2">
                <div>
                  <p>This is the Platform (host) app.</p>
                  <p>The Remote button is being rendered: </p>
                </div>
                <Button />
              </div>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </React.Suspense>
  );
}

export default App;
