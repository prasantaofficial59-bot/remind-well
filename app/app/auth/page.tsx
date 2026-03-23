'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        // Sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          setMessage('Account created! Please check your email to verify your account.');
          setEmail('');
          setPassword('');
          // Switch to sign in mode after 3 seconds
          setTimeout(() => {
            setIsSignUp(false);
            setMessage('');
          }, 3000);
        }
      } else {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;

        if (data?.user) {
          router.push('/dashboard');
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12">
      {/* Background Elements */}
      <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background: 'linear-gradient(135deg, rgb(107, 114, 207), rgb(84, 194, 206))'}} />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15" style={{background: 'linear-gradient(135deg, rgb(84, 194, 206), rgb(99, 230, 226))'}} />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="card-premium p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-premium text-white shadow-lg">
              <span className="text-2xl font-bold">✓</span>
            </div>
            <h1 className="text-3xl font-bold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp
                ? 'Start building healthier habits with AI-powered reminders'
                : 'Sign in to manage your reminders'
              }
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <Alert className="bg-destructive/10 text-destructive border-destructive/20">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="bg-success/10 text-success border-success/20">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-lg bg-secondary/40 border-border hover:border-border/60 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={isSignUp ? 'At least 6 characters' : 'Your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
                className="h-12 rounded-lg bg-secondary/40 border-border hover:border-border/60 focus:border-primary transition-colors"
              />
              {isSignUp && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  Minimum 6 characters required for security
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-premium hover:shadow-lg text-white font-semibold rounded-lg transition-all active:scale-95"
            >
              {isLoading
                ? (isSignUp ? 'Creating account...' : 'Signing in...')
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">
                {isSignUp ? 'or sign in if you have an account' : 'or create an account'}
              </span>
            </div>
          </div>

          {/* Toggle Sign Up/In */}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setMessage('');
            }}
            disabled={isLoading}
            className="w-full py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"
            }
          </button>

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed pt-4 border-t border-border/40">
            By continuing, you agree to receive reminder notifications via Telegram and accept our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
