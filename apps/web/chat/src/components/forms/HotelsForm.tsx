import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import HotelChip, { Hotel } from '../chips/HotelChip';

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Hôtel Le Marais',
    city: 'Paris',
    rating: 4.8,
    reviewCount: 2847,
    totalCost: '$ 1,750',
    nightlyRate: '$ 250/night',
    discount: '15% off',
  },
  {
    id: 2,
    name: 'Château Saint-Germain',
    city: 'Paris',
    rating: 4.5,
    reviewCount: 1523,
    totalCost: '$ 1,225',
    nightlyRate: '$ 175/night',
  },
  {
    id: 3,
    name: 'Hôtel Montmartre',
    city: 'Paris',
    rating: 4.2,
    reviewCount: 892,
    totalCost: '$ 910',
    nightlyRate: '$ 130/night',
    discount: '10% off',
  },
  {
    id: 4,
    name: 'The Ritz Paris',
    city: 'Paris',
    rating: 4.9,
    reviewCount: 3156,
    totalCost: '$ 2,520',
    nightlyRate: '$ 360/night',
  },
];

export type HotelsFormData = {
  selectedHotelId: number;
};

type HotelsFormProps = {
  active?: boolean;
  onSubmit?: (data: HotelsFormData) => void;
  onValidationError?: (error: string) => void;
};

export type HotelsFormRef = {
  submit: () => boolean;
};

const HotelsForm = forwardRef<HotelsFormRef, HotelsFormProps>(
  ({ active = true, onSubmit, onValidationError }, ref) => {
    const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const validateForm = () => {
      if (!selectedHotelId) {
        if (onValidationError) {
          onValidationError('Please select a hotel before continuing.');
        }
        return false;
      }
      if (onValidationError) {
        onValidationError('');
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        const isValid = validateForm();
        if (isValid) {
          formRef.current?.requestSubmit();
        }
        return isValid;
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (onSubmit && selectedHotelId) {
        onSubmit({ selectedHotelId });
      }
    };

    return (
      <form ref={formRef} onSubmit={handleSubmit} className="w-full">
        <h2 className="text-xl font-bold mb-6">Available Hotels</h2>
        <div className="w-full space-y-3 text-sm">
          <div className="flex flex-col gap-3">
            {hotels.map((hotel) => (
              <label key={hotel.id} className="cursor-pointer group">
                <input
                  type="radio"
                  name="hotel"
                  value={hotel.id}
                  checked={selectedHotelId === hotel.id}
                  onChange={(e) => setSelectedHotelId(Number(e.target.value))}
                  className="sr-only peer"
                />
                <div className="peer-checked:ring-2 peer-checked:ring-[#3358ae] peer-checked:ring-offset-2 rounded-[20px] transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
                  <HotelChip hotel={hotel} />
                </div>
              </label>
            ))}
          </div>
        </div>
      </form>
    );
  },
);

HotelsForm.displayName = 'HotelsForm';

export default HotelsForm;
