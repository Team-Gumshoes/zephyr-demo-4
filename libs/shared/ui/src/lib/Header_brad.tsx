import clsx from 'clsx';

const imgVector = 'http://localhost:3845/assets/65bb71526413015a703084a212ee4ac5a10898d1.svg';
const imgVector1 = 'http://localhost:3845/assets/bd5482b2e37e8c89060abec6fd8ff8f3269d7a17.svg';
const imgVector2 = 'http://localhost:3845/assets/de4a6479a0bd495a8ca4e38a08766c361fe44765.svg';

type NavigationMenuProps = {
  className?: string;
  property1?: 'Logged Out' | 'Logged in';
};

function NavigationMenu({ className, property1 = 'Logged Out' }: NavigationMenuProps) {
  return (
    <div className={clsx('flex items-center justify-end gap-2', className)}>
      <button className="px-4 py-2 text-sm font-semibold text-black rounded-lg hover:bg-gray-100 transition-colors">
        Login
      </button>
    </div>
  );
}

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={clsx(
        'flex items-center justify-between px-11 py-[18px] w-full',
        'bg-[#fbfbfe] border-b-2 border-black',
        className
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Logo Icon */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <img alt="AllorAI Logo" className="w-full h-full" src={imgVector} />
          <img alt="AllorAI Accent 1" className="absolute bottom-0 left-2 w-12 h-8" src={imgVector1} />
          <img alt="AllorAI Accent 2" className="absolute bottom-2 right-0 w-10 h-9" src={imgVector2} />
        </div>
        {/* Logo Text */}
        <span className="text-2xl font-bold text-black font-sans">AllorAI</span>
      </div>

      {/* Navigation Section */}
      <NavigationMenu className="flex-shrink-0" />
    </header>
  );
}
