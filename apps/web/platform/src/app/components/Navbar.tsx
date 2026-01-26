import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from './Logo';

const navigation = [
  { name: 'Chat', href: '/chat' },
  { name: 'Itineraries', href: '/itineraries' },
  { name: 'Explore', href: '/explore' },
  { name: 'Login', href: '/login' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-black shadow-md text-[#002e9a]">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo width={125}/>
          </Link>

          <div className="flex space-x-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-[#002e9a] hover:bg-gray-100 hover:text-gray-900',
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
