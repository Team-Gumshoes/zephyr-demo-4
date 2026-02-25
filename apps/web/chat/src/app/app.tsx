import { Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';
import ActivitiesPage from './ActivitiesPage';

function App() {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
      <Route path="activities" element={<ActivitiesPage />} />
    </Routes>
  );
}

export default App;
