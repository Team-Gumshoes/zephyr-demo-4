import clsx from 'clsx';

const hotelLogoIcon = 'http://localhost:3845/assets/265f6e13bfb9809d94f15e2b96fd385f0bcb3a06.svg';

type HotelOptionProps = {
  className?: string;
  discount?: string;
  cost?: string;
  nightlyRate?: string;
  hotelName?: string;
  city?: string;
  rating?: string;
  reviews?: string;
};

function HotelPrice({
  discount = '$ disc%',
  cost = '$ X,XXX',
  nightlyRate = '$ /nt',
}: {
  discount?: string;
  cost?: string;
  nightlyRate?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="h-6 font-semibold text-base leading-6 text-[#050315] whitespace-nowrap">
        {discount}
      </div>
      <div className="h-6 font-semibold text-base leading-6 text-[#050315] whitespace-nowrap">
        {cost}
      </div>
      <div className="h-6 font-normal text-base leading-6 text-[#050315] whitespace-nowrap">
        {nightlyRate}
      </div>
    </div>
  );
}

function HotelInfo({
  hotelName = 'Hotel Name',
  city = 'City',
}: {
  hotelName?: string;
  city?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="h-6 font-semibold text-base leading-6 text-[#050315] whitespace-nowrap">
        {hotelName}
      </div>
      <div className="h-6 font-normal text-base leading-6 text-[#050315] whitespace-nowrap">
        {city}
      </div>
    </div>
  );
}

function HotelRatings({
  rating = 'X.X Rating',
  reviews = 'X,XXX reviews',
}: {
  rating?: string;
  reviews?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="h-6 font-semibold text-base leading-6 text-[#050315] whitespace-nowrap">
        {rating}
      </div>
      <div className="h-6 font-normal text-base leading-6 text-[#050315] whitespace-nowrap">
        {reviews}
      </div>
    </div>
  );
}

function HotelLogo() {
  return (
    <div className="flex items-center justify-center w-8 h-8 border-2 border-[#050315] rounded flex-shrink-0">
      <img alt="Hotel" src={hotelLogoIcon} className="w-5 h-5" />
    </div>
  );
}

export default function HotelOption({
  className,
  discount = '$ disc%',
  cost = '$ X,XXX',
  nightlyRate = '$ /nt',
  hotelName = 'Hotel Name',
  city = 'City',
  rating = 'X.X Rating',
  reviews = 'X,XXX reviews',
}: HotelOptionProps) {
  return (
    <div
      className={clsx(
        'flex gap-12 items-center p-6 rounded-[20px]',
        'bg-[rgba(251,251,254,0.75)] border border-black border-solid',
        className
      )}
    >
      <HotelPrice discount={discount} cost={cost} nightlyRate={nightlyRate} />
      <HotelInfo hotelName={hotelName} city={city} />
      <HotelRatings rating={rating} reviews={reviews} />
      <HotelLogo />
    </div>
  );
}
