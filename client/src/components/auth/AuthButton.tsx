import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  loading = false,
  className,
  disabled,
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "w-full h-12 rounded-[14px]",
        "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
        "font-bold text-sm uppercase tracking-wider",
        "shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20",
        "hover:scale-[1.01] hover:brightness-105 active:scale-[0.99] transition-all duration-200",
        "flex items-center justify-center gap-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : (
        children
      )}
    </button>
  );
};
