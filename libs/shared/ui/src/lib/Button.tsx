import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-[#002E9A] text-white hover:bg-[#002480] active:bg-[#001c60] focus:ring-[#002E9A] disabled:hover:bg-[#002E9A]',
    secondary:
      'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 focus:ring-teal-500 disabled:hover:bg-teal-600',
    outline:
      'bg-transparent border-2 border-[#002E9A] text-[#002E9A] hover:bg-[#002E9A] hover:text-white active:bg-[#001c60] active:border-[#001c60] focus:ring-[#002E9A] disabled:hover:bg-transparent disabled:hover:text-[#002E9A]',
    link: 'bg-transparent text-[#002E9A] underline-offset-4 hover:underline hover:text-[#002480] active:text-[#001c60] focus:ring-[#002E9A] focus:ring-offset-0 disabled:hover:no-underline rounded-none',
  };

  const sizes = {
    small: 'px-3 py-0.5 text-xs',
    medium: 'px-4 py-1 text-sm',
    large: 'px-6 py-2 text-base',
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

/*
export default function ButtonDemo() {
  const variants = ['primary', 'secondary', 'outline', 'link'];
  const sizes = ['small', 'medium', 'large'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component</h1>
        
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Variants</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Combinations</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Variant</th>
                  {sizes.map((size) => (
                    <th key={size} className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant} className="border-t border-gray-100">
                    <td className="px-4 py-4 text-sm text-gray-600 font-medium">
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </td>
                    {sizes.map((size) => (
                      <td key={`${variant}-${size}`} className="px-4 py-4 text-center">
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Disabled States</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} disabled>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">With Custom Classes</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
            <Button className="shadow-lg">With Shadow</Button>
            <Button variant="secondary" className="uppercase tracking-wider">
              Uppercase
            </Button>
            <Button variant="outline" className="border-dashed">
              Dashed Border
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Interactive (try hover, focus, active)</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
            <Button onClick={() => alert('Primary clicked!')}>
              Click Me
            </Button>
            <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
              Click Me
            </Button>
            <Button variant="outline" onClick={() => alert('Outline clicked!')}>
              Click Me
            </Button>
            <Button variant="link" onClick={() => alert('Link clicked!')}>
              Click Me
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
*/
