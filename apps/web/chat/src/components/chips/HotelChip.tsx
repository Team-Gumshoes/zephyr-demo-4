export type Hotel = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  totalCost: string;
  nightlyRate: string;
  discount?: string;
  logo?: string;
};

const HotelChip = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="bg-[rgba(251,251,254,0.75)] border border-black flex items-center gap-8 p-6 rounded-[20px] w-full">
      {/* Hotel Price */}
      <div className="flex flex-col items-start min-w-[100px]">
        {hotel.discount && (
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-[#F5A623]" />
            <span className="font-semibold text-[#050315] text-base leading-6">
              {hotel.discount}
            </span>
          </div>
        )}
        <span className="font-semibold text-[#050315] text-base leading-6">
          {hotel.totalCost}
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {hotel.nightlyRate}
        </span>
      </div>

      {/* Hotel Name and City */}
      <div className="flex flex-col items-start">
        <span className="font-semibold text-[#050315] text-base leading-6">
          {hotel.name}
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {hotel.city}
        </span>
      </div>

      {/* Ratings */}
      <div className="flex flex-col items-start">
        <span className="font-semibold text-[#050315] text-base leading-6">
          {hotel.rating} Rating
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {hotel.reviewCount.toLocaleString()} reviews
        </span>
      </div>

      {/* Hotel Logo */}
      <div className="size-8 flex items-center justify-center ml-auto">
        {hotel.logo ? (
          <img
            src={hotel.logo}
            alt={hotel.name}
            className="size-full object-contain"
          />
        ) : (
          <div className="size-full bg-gray-300 rounded" />
        )}
      </div>
    </div>
  );
};

export default HotelChip;
