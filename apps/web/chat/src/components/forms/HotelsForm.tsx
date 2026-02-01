import HotelChip, { Hotel } from '../chips/HotelChip';

const hotels: Hotel[] = [
  {
    id: 1,
    name: 'The Grand Plaza',
    city: 'Los Angeles',
    rating: 4.8,
    reviewCount: 2847,
    totalCost: '$ 1,250',
    nightlyRate: '$ 250/night',
    discount: '15% off',
  },
  {
    id: 2,
    name: 'Coastal Inn',
    city: 'Los Angeles',
    rating: 4.5,
    reviewCount: 1523,
    totalCost: '$ 875',
    nightlyRate: '$ 175/night',
  },
  {
    id: 3,
    name: 'Downtown Suites',
    city: 'Los Angeles',
    rating: 4.2,
    reviewCount: 892,
    totalCost: '$ 650',
    nightlyRate: '$ 130/night',
    discount: '10% off',
  },
  {
    id: 4,
    name: 'Sunset Resort',
    city: 'Los Angeles',
    rating: 4.9,
    reviewCount: 3156,
    totalCost: '$ 1,800',
    nightlyRate: '$ 360/night',
  },
];

const HotelsForm = ({ active = false }: { active?: boolean }) => {
  return (
    <form className="w-full">
      <h2 className="text-xl font-bold mb-6">Available Hotels</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {hotels.map((hotel) => (
            <label key={hotel.id} className="cursor-pointer group">
              <input
                type="radio"
                name="hotel"
                value={hotel.id}
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
};

export default HotelsForm;
