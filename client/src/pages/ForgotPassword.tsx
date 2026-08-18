import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Mail } from 'lucide-react';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    setEmailError('');
    setSuccessMessage('');

    if (!email) {
      setEmailError('Please enter your email address.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate Reset Email sending
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('A password reset link has been sent to your email address.');
      toast.success('Reset link sent successfully!');
      setEmail('');
    }, 1200);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight mb-2">
          Forgot Password?
        </h1>
        <p className="text-sm text-[#7B8194]">
          Enter your email and we'll help you get back into your account.
        </p>
      </div>

      {successMessage ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200/50 text-green-700 text-sm py-4 px-4 rounded-[14px] text-center font-medium animate-in fade-in zoom-in duration-300">
            {successMessage}
          </div>
          <Link
            to="/login"
            className="block text-center text-sm font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <AuthInput
            id="forgot-email"
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            autoComplete="email"
          />

          <AuthButton loading={loading}>
            Send Reset Link
          </AuthButton>
        </form>
      )}

      {!successMessage && (
        <div className="mt-8 text-center">
          <p className="text-sm text-[#7B8194]">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
