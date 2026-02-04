import clsx from 'clsx';

const pinIcon = 'http://localhost:3845/assets/33e4ecf75ce926ab66ff9cf3bc3b540c9a1e0e40.svg';
const pinNotClickedIcon = 'http://localhost:3845/assets/b1f45d2cd7d1d4cb3fdfb952b7b6f8dc476a7efc.svg';
const pinClickedIcon = 'http://localhost:3845/assets/90e411bdf1e87778191fa8fb20eeb395d6e1b1f3.svg';
const categoryIcon = 'http://localhost:3845/assets/cf10a37442fd3adc95293ba8e2368aa1b20bcfa2.svg';

type ExperienceCardProps = {
  className?: string;
  state?: 'not_pinned' | 'pinned';
  title?: string;
  estimatedCost?: string;
  distance?: string;
  description?: string;
  onPin?: () => void;
  onViewDetails?: () => void;
};

function PinButton({
  isPinned,
  onClick,
}: {
  isPinned: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex-shrink-0 w-6 h-6 hover:opacity-70 transition-opacity"
      aria-label={isPinned ? 'Unpin' : 'Pin'}
    >
      <img alt="Pin" className="w-full h-full" src={isPinned ? pinClickedIcon : pinNotClickedIcon} />
    </button>
  );
}

export default function ExperienceCard({
  className,
  state = 'not_pinned',
  title = 'Culture Center',
  estimatedCost = 'Est. Cost: $0',
  distance = 'Distance from Lodge: 0mi',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  onPin,
  onViewDetails,
}: ExperienceCardProps) {
  const isPinned = state === 'pinned';

  return (
    <div
      className={clsx(
        'flex items-center justify-center px-5 py-6 rounded-lg',
        'bg-[#fbfbfe]',
        isPinned ? 'border-2 border-black' : 'border border-black',
        'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
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
          <div className="flex gap-4 items-center">
            <button
              className={clsx(
                'flex items-center justify-center w-10.5 h-9 rounded-[10px]',
                isPinned ? 'border-2 border-[#52c3bf]' : 'border-2 border-[#52c3bf]',
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
        <div className="flex flex-col gap-2 items-end h-full w-[158px]">
          <PinButton isPinned={isPinned} onClick={onPin} />
          <div className="flex-1 min-h-px w-full bg-[#333] rounded-sm" />
        </div>
      </div>
    </div>
  );
}
