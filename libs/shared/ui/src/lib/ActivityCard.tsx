import clsx from 'clsx';
import { Pin, Landmark } from 'lucide-react';
import { Button } from './Button';

type ActivityCardProps = {
  title: string;
  description: string;
  estimatedCost: string;
  distance: string;
  imageUrl?: string;
  pinned?: boolean;
  onPin?: () => void;
  onViewDetails?: () => void;
  className?: string;
};

export const ActivityCard = ({
  title,
  description,
  estimatedCost,
  distance,
  imageUrl,
  pinned = false,
  onPin,
  onViewDetails,
  className = '',
}: ActivityCardProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-lg border border-black/50 bg-[#fbfbfe] px-5 py-6 shadow-md',
        className,
      )}
    >
      <div className="flex flex-1 items-end justify-between">
        {/* Left section */}
        <div className="flex max-w-[279px] shrink-0 flex-col gap-4 me-[15px]">
          {/* Header and details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold leading-[28.8px] tracking-[-1px] text-black">
              {title}
            </h3>
            <div className="flex gap-6 text-xs font-semibold leading-4 tracking-wide text-black">
              <span>Est. Cost: {estimatedCost}</span>
              <span>Distance from Lodge: {distance}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-normal leading-4 tracking-wide text-black line-clamp-3">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex min-h-[32px] items-center justify-center rounded-[10px] border-2 border-[#52c3bf] bg-[#fbfbfe] p-1.5">
              <Landmark size={18} className="text-black" />
            </div>
            {onViewDetails && (
              <Button size="medium" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end gap-2 self-stretch">
          <button
            onClick={onPin}
            className={clsx(
              'cursor-pointer p-0 border-none bg-transparent',
              pinned ? 'text-[#002E9A]' : 'text-black',
            )}
          >
            <Pin size={24} fill={pinned ? 'currentColor' : 'none'} />
          </button>
          <div className="flex-1 w-[158px] min-h-[1px] overflow-hidden rounded-sm bg-[#333]">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
