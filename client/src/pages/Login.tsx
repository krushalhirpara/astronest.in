import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { GoogleButton } from '@/components/ui/GoogleButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGlobalError('');

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
      setPasswordError('Please enter your password.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API Login
    setTimeout(() => {
      try {
        login({
          id: `email-${Date.now()}`,
          name: email.split('@')[0],
          email: email,
        });
        toast.success("Logged in successfully!");
        navigate({ to: '/' });
      } catch (err: any) {
        setGlobalError('An error occurred during login. Please try again.');
        toast.error("Login failed!");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-300">
          Continue your cosmic journey.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          id="login-email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
        />

        <div className="space-y-1">
          <AuthInput
            id="login-password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            autoComplete="current-password"
          />
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between ml-1 text-xs text-gray-300">
          <label className="flex items-center gap-2 cursor-pointer select-none font-medium hover:text-[#8B2BE2] transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-purple-200 text-[#8B2BE2] focus:ring-[#8B2BE2]/20 accent-[#8B2BE2]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {globalError && (
          <div className="bg-red-50 border border-red-200/50 text-red-500 text-xs py-2.5 px-3 rounded-[10px] text-center font-medium animate-in fade-in zoom-in duration-200">
            {globalError}
          </div>
        )}

        <AuthButton loading={loading}>
          Log In
        </AuthButton>
      </form>

      <div className="relative">
        <GoogleButton onError={(err) => setGlobalError(err)} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-300">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-bold text-[#8B2BE2] hover:text-[#A855F7] hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
