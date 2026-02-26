import { useNavigate } from 'react-router-dom';
import ActivitiesForm from '../components/forms/ActivitiesForm';
import { useTripStore } from '../store/useTripStore';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { activityOptions, tripData, togglePin } = useTripStore();

  return (
    <div className="max-w-7xl mx-auto">
      <ActivitiesForm
        {...tripData}
        activityOptions={activityOptions}
        togglePin={togglePin}
        onReviewAndSave={() => navigate('/itineraries')}
        onModifyDetails={() => navigate('/landing')}
      />
    </div>
  );
};

export default ActivitiesPage;
