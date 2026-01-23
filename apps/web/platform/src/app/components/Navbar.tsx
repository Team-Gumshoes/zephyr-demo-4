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
    <nav className="bg-white shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

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
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
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
