'use client';

import { Activity, Pause, Send, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsBarProps {
  activeCount: number;
  pausedCount: number;
  todaySent: number;
}

export function StatsBar({ activeCount, pausedCount, todaySent }: StatsBarProps) {
  const stats = [
    {
      label: 'Active',
      value: activeCount,
      icon: Activity,
      gradient: 'from-primary to-accent',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Paused',
      value: pausedCount,
      icon: Pause,
      gradient: 'from-muted-foreground to-muted-foreground/60',
      iconBg: 'bg-muted/60',
      iconColor: 'text-muted-foreground/60',
    },
    {
      label: 'Sent Today',
      value: todaySent,
      icon: Send,
      gradient: 'from-success to-accent',
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="card-premium-hover p-6 group relative overflow-hidden"
          >
            {/* Gradient accent background */}
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity",
              `bg-gradient-to-br ${stat.gradient}`
            )} />

            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {stat.label}
                </p>
                <p className={cn(
                  "text-4xl sm:text-5xl font-bold tracking-tight",
                  `bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`
                )}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.iconBg} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
