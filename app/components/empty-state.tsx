'use client';

import { useRouter } from 'next/navigation';
import { Plus, Sparkles, Zap, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SUGGESTED_HABITS = [
  { emoji: '💧', title: 'Hydration', interval: 60 },
  { emoji: '🧘', title: 'Wellness Break', interval: 120 },
  { emoji: '🤸', title: 'Stretching', interval: 90 },
  { emoji: '📝', title: 'Mindfulness', interval: 45 },
];

export function EmptyState() {
  const router = useRouter();

  const handleCreateReminder = () => {
    router.push('/dashboard/reminders/new');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="max-w-3xl mx-auto text-center px-4">
        {/* Illustration */}
        <div className="mb-8 sm:mb-12 space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl w-32 h-32" />
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-premium shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h2 className="text-display-md">
              Ready to Build <span className="text-gradient">Better Habits?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Create your first AI-powered reminder and let RemindWell help you stay consistent with your wellness goals
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <Button
          onClick={handleCreateReminder}
          className="bg-gradient-premium hover:shadow-lg text-white font-semibold rounded-lg h-12 px-8 flex items-center gap-2 mx-auto mb-12 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create Your First Reminder
        </Button>

        {/* Suggested Habits */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-border/60" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Habits to Get Started
            </p>
            <div className="h-px w-12 bg-border/60" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SUGGESTED_HABITS.map((habit, idx) => (
              <Card
                key={habit.title}
                onClick={handleCreateReminder}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="cursor-pointer card-premium-hover p-5 sm:p-6 text-center group space-y-3 animate-fade-in"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative text-4xl group-hover:scale-125 transition-transform origin-center">
                    {habit.emoji}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {habit.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Every {habit.interval} min
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features highlight */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <p className="text-xs uppercase font-semibold text-muted-foreground mb-4 tracking-wider">What You'll Get</p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">AI Messages</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex p-2.5 rounded-lg bg-accent/10 text-accent">
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">Telegram Alerts</p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex p-2.5 rounded-lg bg-success/10 text-success">
                <Zap className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">Smart Scheduling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
