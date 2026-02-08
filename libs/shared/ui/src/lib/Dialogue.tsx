import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

type DialogueProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
};

export const Dialogue = ({
  children,
  isOpen,
  onClose,
  title,
  className = '',
}: PropsWithChildren<DialogueProps>) => {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content
          className={clsx(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6',
            className,
          )}
        >
          {title && (
            <div className="flex items-center justify-between mb-4">
              <DialogPrimitive.Title className="text-xl font-bold text-gray-900">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-500" />
              </DialogPrimitive.Close>
            </div>
          )}
          {!title && (
            <DialogPrimitive.Close className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-500" />
            </DialogPrimitive.Close>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialogue;
