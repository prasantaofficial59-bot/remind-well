import Link from 'next/link';
import { Sparkles, Bell, Clock, Zap, ArrowRight, CheckCircle2, Flame, Target } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow">
                ✓
              </div>
              <span className="text-xl font-bold text-gradient hidden sm:inline">RemindWell</span>
            </Link>
            <Link
              href="/auth"
              className="px-6 py-2.5 rounded-lg font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background: 'linear-gradient(135deg, rgb(107, 114, 207), rgb(84, 194, 206))'}} />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-15" style={{background: 'linear-gradient(135deg, rgb(84, 194, 206), rgb(99, 230, 226))'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all">
              <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">AI-Powered Habit Tracking</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-display-xl text-pretty leading-tight">
                <span className="block">Build Better Habits</span>
                <span className="text-gradient">with AI-Powered Reminders</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Never forget to take care of yourself. Smart, contextual reminders delivered instantly to Telegram—powered by AI that learns your patterns.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/auth"
                className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-premium text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <a
                href="#features"
                className="group w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-muted hover:border-primary/40 hover:bg-primary/5 text-foreground font-semibold transition-all flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Section */}
            <div className="pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground mb-4">Trusted by thousands of users building healthier habits</p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">15s Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-warning" />
                  <span className="text-sm font-medium">No Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Premium Cards */}
      <section className="relative py-24 sm:py-32 bg-muted/30">
        <div className="absolute inset-0 bg-pattern-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-display-md mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just 3 simple steps and never forget a habit again
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Add Your Habits',
                desc: 'Water, breaks, stretching—whatever you need to remember to stay healthy',
                icon: Sparkles,
              },
              {
                num: '02',
                title: 'Set Frequency',
                desc: 'Choose how often you want reminders, active hours, and timezone',
                icon: Clock,
              },
              {
                num: '03',
                title: 'Get Smart Notifications',
                desc: 'AI generates unique, contextual reminders delivered to Telegram',
                icon: Bell,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="card-premium-hover p-8 sm:p-10 relative group"
                >
                  {/* Gradient accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent" />
                  
                  {/* Number */}
                  <div className="text-5xl font-bold text-gradient mb-6 leading-none">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features - Premium Grid */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-display-md mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build lasting, healthy habits
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🤖',
                title: 'AI Messages',
                desc: 'Unique, contextual reminders that keep you engaged',
              },
              {
                icon: '📱',
                title: 'Telegram Delivery',
                desc: 'Instant notifications on your phone, 24/7',
              },
              {
                icon: '⚡',
                title: 'Quick Setup',
                desc: 'Create reminders in under 15 seconds',
              },
              {
                icon: '🎯',
                title: 'Smart Scheduling',
                desc: 'Active hours, weekend skip, and timezone support',
              },
              {
                icon: '📊',
                title: 'Live Stats',
                desc: 'Track active reminders and daily notification counts',
                className: 'sm:col-span-2 lg:col-span-1',
              },
              {
                icon: '🔔',
                title: 'Smart Tones',
                desc: 'Choose from motivational, friendly, direct, or funny',
                className: 'sm:col-span-2 lg:col-span-1',
              },
              {
                icon: '⏸️',
                title: 'Pause & Resume',
                desc: 'Pause reminders without losing your schedule',
                className: 'sm:col-span-2 lg:col-span-1',
              },
              {
                icon: '🌍',
                title: 'Timezone Aware',
                desc: 'Works perfectly across all time zones',
                className: 'sm:col-span-2 lg:col-span-1',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`card-premium-hover p-6 ${feature.className || ''} group`}
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial & CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium opacity-5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20" style={{background: 'linear-gradient(135deg, rgb(107, 114, 207), rgb(84, 194, 206))'}} />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-display-md">
            Ready to Build <span className="text-gradient">Better Habits?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users staying hydrated, taking breaks, and reaching their wellness goals—all powered by AI-driven reminders.
          </p>
          
          <Link
            href="/auth"
            className="group relative inline-flex px-10 py-4 rounded-xl bg-gradient-premium text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2">
              Get Started - It's Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
