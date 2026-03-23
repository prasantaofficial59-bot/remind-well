'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, BellRing, LayoutDashboard, Bell, Settings as SettingsIcon, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MobileNav } from './mobile-nav';
import { useUser } from '@/hooks/use-user';
import { useUserStore } from '@/lib/stores/user-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useUser();
  const { clearUser } = useUserStore();
  const { reset: resetUIStore } = useUIStore();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    queryClient.clear();
    resetUIStore();
    router.push('/');
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const navLinks = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/reminders/new',
      label: 'New Reminder',
      icon: Bell,
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 rounded-lg bg-gradient-premium flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all">
                  ✓
                </div>
                <span className="text-lg font-bold text-gradient hidden sm:inline">RemindWell</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden relative z-50 p-2 rounded-lg hover:bg-secondary/60 transition-all active:scale-95"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileNavOpen(true);
                }}
                aria-label="Open navigation menu"
                aria-expanded={mobileNavOpen}
              >
                <Menu className="h-5 w-5 text-foreground" />
              </button>

              {/* User Dropdown (Desktop) */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden lg:flex relative h-10 w-10 rounded-full p-0 hover:bg-secondary/50"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-premium text-white font-semibold text-sm">
                          {getInitials(user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mx-2 sm:mx-0 rounded-xl border-border">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-premium text-white font-semibold text-sm">
                          {getInitials(user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate break-all">
                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Premium Plan
                        </p>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-border/40" />

                    {/* Settings Link */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/settings"
                        className="cursor-pointer flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-all"
                      >
                        <SettingsIcon className="h-4 w-4" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-border/40" />

                    {/* Sign Out */}
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-destructive font-medium py-2.5 px-3 rounded-lg hover:bg-destructive/10 transition-all flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
