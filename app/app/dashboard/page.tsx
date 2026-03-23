'use client';

import { useRouter } from 'next/navigation';
import { Plus, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReminderCard } from '@/components/reminder-card';
import { StatsBar } from '@/components/stats-bar';
import { EmptyState } from '@/components/empty-state';
import { SkeletonCard } from '@/components/ui/skeleton';
import { useReminders } from '@/hooks/use-reminders';
import { useStats } from '@/hooks/use-stats';
import { useUser } from '@/hooks/use-user';

export default function DashboardPage() {
  const router = useRouter();
  const { data: user } = useUser();
  const { data: reminders, isLoading: remindersLoading } = useReminders();
  const { data: stats } = useStats();

  const activeReminders = reminders?.filter((r) => !r.is_paused) || [];
  const pausedReminders = reminders?.filter((r) => r.is_paused) || [];

  // Get first name from email (max 15 chars)
  const getFirstName = (email: string) => {
    const name = email.split('@')[0];
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted.length > 15 ? formatted.substring(0, 15) : formatted;
  };

  if (remindersLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-3">
          <div className="h-10 w-96 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-64 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-premium p-6 space-y-3 h-32 animate-pulse">
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-8 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!reminders || reminders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-display-md">
            Welcome back, <span className="text-gradient">{user && getFirstName(user.email)}</span>
          </h1>
          <p className="text-muted-foreground">
            You're on track. Manage your reminders and build lasting habits today.
          </p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/reminders/new')}
          className="w-full sm:w-auto bg-gradient-premium hover:shadow-lg text-white font-semibold rounded-lg h-12 flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          New Reminder
        </Button>
      </div>

      {/* Stats Bar */}
      <StatsBar
        activeCount={activeReminders.length}
        pausedCount={pausedReminders.length}
        todaySent={stats?.todaysSent || 0}
      />

      {/* Active Reminders */}
      {activeReminders.length > 0 && (
        <div className="space-y-6 animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-success to-accent animate-pulse" />
              <h2 className="text-display-sm">
                Active Reminders
              </h2>
            </div>
            <span className="text-sm font-medium text-muted-foreground bg-secondary/50 rounded-full px-3 py-1">
              {activeReminders.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeReminders.map((reminder, idx) => (
              <div key={reminder.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in">
                <ReminderCard reminder={reminder} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paused Reminders */}
      {pausedReminders.length > 0 && (
        <div className="space-y-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              <h2 className="text-display-sm">
                Paused Reminders
              </h2>
            </div>
            <span className="text-sm font-medium text-muted-foreground bg-secondary/50 rounded-full px-3 py-1">
              {pausedReminders.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pausedReminders.map((reminder, idx) => (
              <div key={reminder.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in">
                <ReminderCard reminder={reminder} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
