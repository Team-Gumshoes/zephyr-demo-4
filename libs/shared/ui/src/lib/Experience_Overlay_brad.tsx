import clsx from 'clsx';

const closeIcon = 'http://localhost:3845/assets/8d1e769d310e35bac4805866732fe9fe31d0aa8c.svg';
const locationIcon = 'http://localhost:3845/assets/59950499a0c969cf954d0d74306d22eac618aefd.svg';

type LocationOverlayProps = {
  className?: string;
  title?: string;
  location?: string;
  estimatedCost?: string;
  description?: string;
  address?: string;
  website?: string;
  phone?: string;
  onClose?: () => void;
  images?: string[];
};

export default function LocationOverlay({
  className,
  title = 'Concert',
  location = 'Los Angeles, CA',
  estimatedCost = 'Est. Cost: $0',
  description = 'Lorem ipsum dolor sit amet. Sed rerum labore aut cupiditate excepturi aut cumque dolorem qui maxime quae vel nulla quam et sapiente perferendis.',
  address = '12345 Goofy Ln\nLos Angeles, CA 12456',
  website = 'www.website.com',
  phone = '888-888-8888',
  onClose,
  images = [null, null, null],
}: LocationOverlayProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-6 items-start justify-center px-12 py-16 rounded-xl',
        'bg-[#fbfbfe] w-[800px]',
        className
      )}
    >
      {/* Header with Title and Close Button */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-5xl font-semibold leading-[48px] tracking-[-1.5px]">{title}</h1>
        <button
          onClick={onClose}
          className="cursor-pointer flex-shrink-0 w-16 h-16 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <img alt="Close" className="w-full h-full" src={closeIcon} />
        </button>
      </div>

      {/* Location and Cost Info */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center justify-center px-3 py-1.5 rounded-[10px] border-2 border-[#52c3bf] bg-white flex-shrink-0 w-10 h-8">
          <img alt="Location" className="w-4 h-4" src={locationIcon} />
        </div>
        <h2 className="text-xl font-semibold leading-6 whitespace-nowrap">{location}</h2>
        <h2 className="text-xl font-semibold leading-6 whitespace-nowrap">{estimatedCost}</h2>
      </div>

      {/* Description */}
      <p className="text-base font-normal leading-6 w-full text-black">
        {description}
      </p>

      {/* Images Gallery */}
      <div className="flex flex-wrap gap-6 w-full">
        <div className="bg-[#333] h-[147px] rounded-xl w-[218px] flex-shrink-0" />
        <div className="bg-[#333] h-[147px] rounded-xl w-[217px] flex-shrink-0" />
        <div className="bg-[#333] h-[147px] rounded-xl w-[218px] flex-shrink-0" />
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap gap-11 items-start w-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-6">Address</h3>
          <p className="text-base font-medium leading-6 whitespace-pre-line">{address}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-6">Website</h3>
          <p className="text-base font-medium leading-6">{website}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-6">Phone</h3>
          <p className="text-base font-medium leading-6">{phone}</p>
        </div>
      </div>
    </div>
  );
}
