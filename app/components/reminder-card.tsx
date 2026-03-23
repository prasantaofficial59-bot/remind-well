'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Clock, MessageSquare, Pause, Play, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToggleReminder } from '@/hooks/use-reminders';
import { useUIStore } from '@/lib/stores/ui-store';
import type { Reminder } from '@/types/models';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ReminderCardProps {
  reminder: Reminder;
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const router = useRouter();
  const toggleMutation = useToggleReminder();
  const { openDeleteModal } = useUIStore();

  const handleToggle = () => {
    toggleMutation.mutate(reminder.id);
  };

  const handleEdit = () => {
    router.push(`/dashboard/reminders/${reminder.id}`);
  };

  const handleDelete = () => {
    openDeleteModal(reminder.id);
  };

  const getMethodIcon = () => {
    return <MessageSquare className="h-3.5 w-3.5" />;
  };

  const nextScheduledText = reminder.reminder_type === 'one_time' && reminder.scheduled_for
    ? `Fires ${formatDistanceToNow(new Date(reminder.scheduled_for), { addSuffix: true })}`
    : reminder.next_scheduled_at
      ? formatDistanceToNow(new Date(reminder.next_scheduled_at), { addSuffix: true })
      : 'Not scheduled';

  const frequencyDisplay = reminder.reminder_type === 'one_time' && reminder.scheduled_for
    ? `Scheduled for ${format(new Date(reminder.scheduled_for), 'PPp')}`
    : reminder.frequencyText;

  const isOneTime = reminder.reminder_type === 'one_time';

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 border-border',
        'hover:shadow-lg hover:border-primary/40 hover:-translate-y-1',
        'card-premium-hover',
        reminder.is_paused && 'opacity-60'
      )}
    >
      {/* Premium Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent" />

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform origin-left">
              {reminder.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                {reminder.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {frequencyDisplay}
              </p>
            </div>
          </div>
          <Button
            variant={reminder.is_paused ? "secondary" : "ghost"}
            size="sm"
            onClick={handleToggle}
            disabled={toggleMutation.isPending || isOneTime}
            className={cn(
              "flex items-center gap-1.5 flex-shrink-0 h-9 px-3 text-xs font-semibold transition-all",
              reminder.is_paused && "bg-primary/10 text-primary hover:bg-primary/20",
              isOneTime && "cursor-not-allowed opacity-50"
            )}
          >
            {isOneTime ? (
              <span>Scheduled</span>
            ) : reminder.is_paused ? (
              <>
                <Play className="h-3.5 w-3.5" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5" />
                Pause
              </>
            )}
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            className={cn(
              "text-xs font-semibold rounded-full",
              isOneTime 
                ? "bg-accent/20 text-accent" 
                : "bg-primary/20 text-primary"
            )}
          >
            {isOneTime ? 'One-Time' : 'Recurring'}
          </Badge>
          <Badge className="text-xs font-semibold rounded-full bg-secondary/60 text-foreground flex items-center gap-1">
            {getMethodIcon()}
            <span className="ml-0.5">Telegram</span>
          </Badge>
          <Badge className="text-xs font-semibold rounded-full bg-secondary/60 text-foreground capitalize">
            {reminder.message_tone}
          </Badge>
          {!isOneTime && reminder.skip_weekends && (
            <Badge className="text-xs font-semibold rounded-full bg-secondary/60 text-foreground">
              No weekends
            </Badge>
          )}
        </div>

        {/* Next Scheduled */}
        {!reminder.is_paused && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Clock className="h-3.5 w-3.5 text-primary/60" />
            <span>{nextScheduledText}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="flex-1 h-9 text-xs font-semibold hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-9 px-3 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
