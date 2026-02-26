import { useNavigate } from 'react-router-dom';
import ActivitiesForm from '../components/forms/ActivitiesForm';
import { useTripStore } from '../store/useTripStore';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { activityOptions, travelTips, tripData, togglePin } = useTripStore();

  return (
    <div className="max-w-7xl mx-auto">
      <ActivitiesForm
        {...tripData}
        activityOptions={activityOptions}
        travelTips={travelTips}
        togglePin={togglePin}
        onReviewAndSave={() => navigate('/chat/itineraries')}
        onModifyDetails={() => navigate('/landing')}
      />
    </div>
  );
};

export default ActivitiesPage;
