import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { GoogleButton } from '@/components/ui/GoogleButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGlobalError('');

    // Name validation
    if (!name.trim()) {
      setNameError('Please enter your full name.');
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError('Please enter your email address.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address.');
        isValid = false;
      }
    }

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API Signup
    setTimeout(() => {
      try {
        login({
          id: `email-${Date.now()}`,
          name: name,
          email: email,
        });
        toast.success("Account created successfully!");
        navigate({ to: '/' });
      } catch (err: any) {
        setGlobalError('An error occurred. Please try again.');
        toast.error("Registration failed!");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-300">
          Join the cosmic community today.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <AuthInput
          id="signup-name"
          label="Full Name"
          type="text"
          icon={User}
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          autoComplete="name"
        />

        <AuthInput
          id="signup-email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
        />

        <AuthInput
          id="signup-password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="new-password"
        />

        <AuthInput
          id="signup-confirm-password"
          label="Confirm Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          autoComplete="new-password"
        />

        {globalError && (
          <div className="bg-red-50 border border-red-200/50 text-red-500 text-xs py-2.5 px-3 rounded-[10px] text-center font-medium animate-in fade-in zoom-in duration-200">
            {globalError}
          </div>
        )}

        <AuthButton loading={loading}>
          Sign Up
        </AuthButton>
      </form>

      <div className="relative">
        <GoogleButton onError={(err) => setGlobalError(err)} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-300">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
