'use client';

import { useState, useTransition } from 'react';
import { CreditCard, Check, Loader2, ArrowRight } from 'lucide-react';
import { updateSubscriptionPlan } from '@/app/actions/restaurant';

interface Props {
  restaurantId: string;
  initialPlan: 'STARTER' | 'GROWTH' | 'PREMIUM';
  initialStatus: string;
}

export default function BillingPlansClient({
  restaurantId,
  initialPlan,
  initialStatus,
}: Props) {
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSelectPlan = (plan: 'STARTER' | 'GROWTH' | 'PREMIUM') => {
    if (plan === currentPlan) return;
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const res = await updateSubscriptionPlan(restaurantId, plan);
      if (res.error) {
        setError(res.error);
      } else {
        setCurrentPlan(plan);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  const PLANS = [
    {
      id: 'STARTER',
      name: 'Starter Plan',
      price: '$0',
      description: 'Digitize your menu with essential table routing tools.',
      features: [
        'Up to 20 Menu Items',
        'Up to 5 Dining Tables',
        'Basic theme style (Red)',
        'Standard QR code downloads',
        'Email customer support',
      ],
      color: 'border-[#EAEAEA] bg-white',
      badgeColor: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'GROWTH',
      name: 'Growth Plan',
      price: '$19',
      description: 'Ideal for popular local cafes and family diners.',
      features: [
        'Unlimited Menu Items',
        'Up to 25 Dining Tables',
        'Custom colors theme presets',
        'PNG & PDF QR code downloads',
        'Standard dashboard actions',
        '2 Manager accounts',
      ],
      color: 'border-[#F97316]/35 bg-white relative shadow-xs',
      badgeColor: 'bg-[#F97316]/10 text-[#F97316]',
    },
    {
      id: 'PREMIUM',
      name: 'Premium Plan',
      price: '$49',
      description: 'Premium branding and control for high-volume venues.',
      features: [
        'Unlimited Menu Items',
        'Unlimited Dining Tables',
        'Custom logo upload',
        'Fully custom brand theme color',
        'Unlimited Manager accounts',
        'Stripe Checkout Simulation',
        'Priority 24/7 Support line',
      ],
      color: 'border-[#EAEAEA] bg-white',
      badgeColor: 'bg-slate-100 text-slate-600',
    },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg font-medium font-sans">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium font-sans animate-pulse">
          <Check className="w-4 h-4 text-emerald-650 shrink-0" /> Subscription updated successfully! Settings unlocked.
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 font-sans">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          return (
            <div
              key={plan.id}
              className={`border rounded-xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01] ${plan.color}`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${plan.badgeColor}`}>
                    {plan.name}
                  </span>
                  
                  {isCurrent && (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-0.5">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-extrabold text-[#111827]">{plan.price}</span>
                  <span className="text-slate-400 text-xs font-semibold">/month</span>
                </div>

                <p className="text-xs text-slate-500 mt-3.5 leading-relaxed font-medium">{plan.description}</p>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                disabled={isCurrent || isPending}
                onClick={() => handleSelectPlan(plan.id as any)}
                className={`mt-8 w-full font-bold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-slate-50 text-slate-400 border border-[#EAEAEA] cursor-default'
                    : 'bg-[#F97316] hover:bg-[#ea580c] text-white hover:scale-[1.01] cursor-pointer shadow-2xs'
                }`}
              >
                {isPending && !isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : isCurrent ? (
                  'Current Plan'
                ) : (
                  <>
                    Switch to this plan <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Info billing footer */}
      <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 flex gap-4 items-center max-w-xl font-sans">
        <div className="bg-[#F97316]/10 p-2.5 rounded-lg text-[#F97316] shrink-0">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs text-[#111827] uppercase tracking-wider">SaaS Sandbox Billing Mode</h4>
          <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">
            This platform uses simulation transactions. Clicking updates will immediately sync features in the database.
          </p>
        </div>
      </div>
    </div>
  );
}
