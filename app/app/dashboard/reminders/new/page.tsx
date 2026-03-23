'use client';

import { ReminderForm } from '@/components/reminder-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewReminderPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-display-md">
            Create <span className="text-gradient">New Reminder</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Set up an AI-powered reminder to help you build lasting habits
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card-premium p-8 lg:p-10">
        <ReminderForm mode="create" />
      </div>
    </div>
  );
}
