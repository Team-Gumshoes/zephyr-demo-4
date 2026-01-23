import { Plane } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex align-middle items-center gap-2'>
      <Plane className="h-8 w-8 text-primary-600" />
      <span className="text-xl font-bold text-gray-900">AllorAI</span>
    </div>
  );
};

export default Logo;
