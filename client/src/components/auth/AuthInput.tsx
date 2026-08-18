import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface AuthInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, className, type = 'text', id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    
    // Toggle password visibility
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="space-y-1.5 w-full text-left">
        <Label 
          htmlFor={id} 
          className="text-xs font-semibold text-gray-200 tracking-wide uppercase ml-1"
        >
          {label}
        </Label>
        
        <div className="relative">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
          )}
          
          <input
            id={id}
            type={inputType}
            ref={ref}
            className={cn(
              "w-full bg-black/40 border border-white/15",
              "text-white placeholder:text-gray-500",
              "text-sm font-medium",
              "h-12 px-4 rounded-[14px]",
              Icon ? "pl-12" : "pl-4",
              isPassword ? "pr-12" : "pr-4",
              "focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20",
              "transition-all duration-200 shadow-sm",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-white transition-colors p-1 rounded-md focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-xs font-medium text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
