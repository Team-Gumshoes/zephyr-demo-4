import clsx from 'clsx';

const categoryIcon = 'http://localhost:3845/assets/cf10a37442fd3adc95293ba8e2368aa1b20bcfa2.svg';
const experienceImage = 'http://localhost:3845/assets/535ec78372cc4d599c21afa7484521415f24ecd9.png';

type ExperienceCardReviewProps = {
  className?: string;
  title?: string;
  estimatedCost?: string;
  distance?: string;
  description?: string;
  onViewDetails?: () => void;
};

export default function ExperienceCardReview({
  className,
  title = 'Concert',
  estimatedCost = 'Est. Cost: $600',
  distance = 'Distance from Lodge: 3mi',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  onViewDetails,
}: ExperienceCardReviewProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center px-5 py-6 rounded-lg',
        'bg-[#fbfbfe] border border-black border-solid',
        'w-[505px]',
        className
      )}
    >
      <div className="flex flex-1 items-end justify-between w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-4 items-start w-[279px]">
          {/* Header and Details */}
          <div className="flex flex-col gap-3 items-start w-full">
            <h2 className="text-2xl font-semibold leading-[28.8px] tracking-[-1px] text-black h-7 w-full">
              {title}
            </h2>
            <div className="flex gap-6 items-center text-xs font-semibold leading-4 text-black tracking-[0.18px] w-full">
              <p>{estimatedCost}</p>
              <p>{distance}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-normal leading-4 text-black tracking-[0.18px] h-12 w-full whitespace-pre-wrap">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 items-center">
            <button
              className={clsx(
                'flex items-center justify-center w-10.5 h-9 rounded-[10px]',
                'border-2 border-[#52c3bf]',
                'bg-[#fbfbfe] cursor-pointer hover:opacity-80 transition-opacity'
              )}
              aria-label="Category"
            >
              <img alt="Category" className="w-4.5 h-4.5" src={categoryIcon} />
            </button>
            <button
              onClick={onViewDetails}
              className={clsx(
                'flex items-center justify-center h-9 px-3 py-1.5 rounded-full',
                'bg-[#002e9a] text-white',
                'text-sm font-semibold leading-[21px] tracking-[0.07px] text-center',
                'cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap',
                'w-[112px]'
              )}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-2 items-end justify-end h-[139px] w-[158px]">
          <img
            alt={title}
            src={experienceImage}
            className="w-[158px] h-[140px] rounded-lg object-cover flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
