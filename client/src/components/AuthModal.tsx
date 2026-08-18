import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, handleGoogleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setIsLoading(false);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setIsLoading(true);
    // Dummy Email logic
    setTimeout(() => {
      login({
        id: `email-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
      });
      toast.success("Welcome back!");
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] bg-[#0F0F1F] border-white/10 text-white rounded-[2rem] p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center font-heading">
              Continue with AstroNest
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Login to access premium astrology features
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 rounded-xl focus:border-purple-500 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Password</Label>
              <Input
                id="pass"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 rounded-xl focus:border-purple-500 h-12"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all rounded-xl font-bold"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </Button>
          </form>

          <div className="mt-8">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
