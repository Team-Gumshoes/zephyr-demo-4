import clsx from 'clsx';

const shareMaskIcon = 'http://localhost:3845/assets/33e4ecf75ce926ab66ff9cf3bc3b540c9a1e0e40.svg';
const editIconHovered = 'http://localhost:3845/assets/fe44ac8dcf6ef4f7556ee1c39e8728e721da01ed.svg';
const editIconDefault = 'http://localhost:3845/assets/d4ea2f51923f80f4e87ae1ab7e369cdc7cf084df.svg';

type EditIconProps = {
  className?: string;
  state?: 'default' | 'hovered';
};

export default function EditIcon({ className, state = 'default' }: EditIconProps) {
  const isHovered = state === 'hovered';

  return (
    <div className={clsx('relative w-6 h-6', className)}>
      <img
        alt="Edit"
        className="w-full h-full"
        src={isHovered ? editIconHovered : editIconDefault}
      />
    </div>
  );
}
