import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout'
import '../styles.css';
import TripPlannerPage from './features/trip-planner/TripPlannerPage'

// const Profile = React.lazy(() => import('profile/Module'));
// const Button = React.lazy(() => import('profile/Button'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/trip-planner" replace />} />
          <Route path="trip-planner" element={<TripPlannerPage />} />
          {/* <Route path="flights" element={<FlightsPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="transport" element={<TransportPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
