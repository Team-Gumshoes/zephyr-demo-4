import { Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';
import ActivitiesPage from './ActivitiesPage';
import ItinerariesPage from './ItinerariesPage';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

function App() {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="itineraries" element={<ItinerariesPage />} />
    </Routes>
  );
}

export default App;
