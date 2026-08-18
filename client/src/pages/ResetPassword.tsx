import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Lock } from 'lucide-react';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    // Password validation
    if (!password) {
      setPasswordError('Please enter a password.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      isValid = false;
    }

    // Confirm Password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate Password Reset Update
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success('Password updated successfully!');
      
      // Auto redirect to login page after 2 seconds
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight mb-2">
          Create New Password
        </h1>
        <p className="text-sm text-[#7B8194]">
          Choose a strong password for your AstroNest account.
        </p>
      </div>

      {success ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200/50 text-green-700 text-sm py-4 px-4 rounded-[14px] text-center font-medium animate-in fade-in zoom-in duration-300">
            Your password has been reset successfully! Redirecting you to the login page...
          </div>
          <Link
            to="/login"
            className="block text-center text-sm font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <AuthInput
            id="reset-password"
            label="New Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            autoComplete="new-password"
          />

          <AuthInput
            id="reset-confirm-password"
            label="Confirm New Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            autoComplete="new-password"
          />

          <AuthButton loading={loading}>
            Update Password
          </AuthButton>
        </form>
      )}

      {!success && (
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="font-bold text-sm text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Back to Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
