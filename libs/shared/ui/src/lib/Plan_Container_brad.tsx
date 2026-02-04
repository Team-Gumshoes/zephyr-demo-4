import clsx from 'clsx';

const shareIcon = 'http://localhost:3845/assets/33e4ecf75ce926ab66ff9cf3bc3b540c9a1e0e40.svg';
const listIcon = 'http://localhost:3845/assets/edd826ed5d264c0cc76b67702610d5d4c87e74a8.svg';
const deleteIcon = 'http://localhost:3845/assets/2e969f7d990bd4f888ad2f05a857e20fed20f1e7.svg';
const editIcon = 'http://localhost:3845/assets/e9e68ba644b77318feb468411c46b2b770f2c144.svg';

type PlanContainerProps = {
  className?: string;
  tripName?: string;
  startDate?: string;
  endDate?: string;
  lastUpdated?: string;
  imageUrl?: string;
  onEdit?: () => void;
  onShare?: () => void;
  onViewList?: () => void;
  onDelete?: () => void;
};

function IconButton({
  icon,
  onClick,
  label,
}: {
  icon: string;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center w-9 h-9 rounded-[20px]',
        'bg-[#002e9a] hover:opacity-80 transition-opacity cursor-pointer'
      )}
      aria-label={label}
    >
      <img alt={label} className="w-6 h-6" src={icon} />
    </button>
  );
}

export default function PlanContainer({
  className,
  tripName = 'Trip Name',
  startDate = 'MM/DD/YYYY',
  endDate = 'MM/DD/YYYY',
  lastUpdated = 'MM/DD/YYYY',
  imageUrl,
  onEdit,
  onShare,
  onViewList,
  onDelete,
}: PlanContainerProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-6 items-start overflow-hidden pb-6 rounded-xl',
        'bg-[#fbfbfe] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'w-[370px]',
        className
      )}
    >
      {/* Image Placeholder */}
      <div className="h-52 shrink-0 w-full bg-[#333]" />

      {/* Content Section */}
      <div className="flex flex-col gap-5.5 items-start px-6 w-full">
        {/* Trip Title */}
        <h2 className="text-2xl font-semibold leading-[28.8px] tracking-[-1px] text-black w-full">
          {tripName}
        </h2>

        {/* Date Information */}
        <div className="flex flex-col gap-4 items-start w-full text-[#666]">
          <p className="text-base font-medium leading-6">
            {startDate} - {endDate}
          </p>
          <p className="text-base font-medium leading-6">
            Last Updated On: {lastUpdated}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-end justify-end w-full">
          <IconButton icon={editIcon} onClick={onEdit} label="Edit" />
          <IconButton icon={shareIcon} onClick={onShare} label="Share" />
          <IconButton icon={listIcon} onClick={onViewList} label="View List" />
          <IconButton icon={deleteIcon} onClick={onDelete} label="Delete" />
        </div>
      </div>
    </div>
  );
}
