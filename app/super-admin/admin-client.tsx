'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Edit2,
  Search,
  Check,
  X,
  Loader2,
  Store
} from 'lucide-react';
import { updateRestaurantSubscriptionStatus } from '@/app/actions/admin';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Subscription {
  id: string;
  plan: 'STARTER' | 'GROWTH' | 'PREMIUM';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE';
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  users: User[];
  subscription: Subscription | null;
  _count: {
    categories: number;
    tables: number;
  };
}

interface Props {
  initialRestaurants: Restaurant[];
}

export default function SuperAdminClient({ initialRestaurants }: Props) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingRest, setEditingRest] = useState<Restaurant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'STARTER' | 'GROWTH' | 'PREMIUM'>('STARTER');
  const [selectedStatus, setSelectedStatus] = useState<'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE'>('ACTIVE');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEditSubscription = (rest: Restaurant) => {
    setEditingRest(rest);
    setSelectedPlan(rest.subscription?.plan || 'STARTER');
    setSelectedStatus(rest.subscription?.status || 'ACTIVE');
    setError(null);
    setSuccess(false);
  };

  const handleSaveSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRest) return;
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const res = await updateRestaurantSubscriptionStatus(
        editingRest.id,
        selectedPlan,
        selectedStatus
      );

      if (res.error) {
        setError(res.error);
      } else {
        setRestaurants(prev =>
          prev.map(r =>
            r.id === editingRest.id
              ? {
                  ...r,
                  subscription: r.subscription
                    ? {
                        ...r.subscription,
                        plan: selectedPlan,
                        status: selectedStatus,
                        price: selectedPlan === 'GROWTH' ? 19.0 : selectedPlan === 'PREMIUM' ? 49.0 : 0.0,
                      }
                    : {
                        id: 'new',
                        plan: selectedPlan,
                        status: selectedStatus,
                        price: selectedPlan === 'GROWTH' ? 19.0 : selectedPlan === 'PREMIUM' ? 49.0 : 0.0,
                      },
                }
              : r
          )
        );
        setSuccess(true);
        setTimeout(() => {
          setEditingRest(null);
          setSuccess(false);
        }, 1500);
      }
    });
  };

  const filtered = restaurants.filter(
    r =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.users.some(u => u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">SaaS Tenants</h2>
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-450">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search name, slug, email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-9 pr-3 py-2 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#EAEAEA] text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-4 px-4">Restaurant</th>
              <th className="py-4 px-4">Owner Email</th>
              <th className="py-4 px-4 text-center">Stats</th>
              <th className="py-4 px-4">Plan</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                  No tenant restaurants found.
                </td>
              </tr>
            ) : (
              filtered.map(rest => {
                const sub = rest.subscription;
                const owner = rest.users.find(u => u.role === 'RESTAURANT_OWNER');
                return (
                  <tr key={rest.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-550 flex items-center justify-center shrink-0 border border-rose-100">
                          <Store className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#111827]">{rest.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <span>/{rest.slug}</span>
                            <Link href={`/menu/${rest.slug}`} target="_blank" className="text-slate-400 hover:text-[#111827]">
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">{owner?.email || 'N/A'}</td>
                    <td className="py-4 px-4 text-center text-[10px] font-bold text-slate-500">
                      <span title="Categories">{rest._count.categories}c</span>
                      <span className="text-slate-300 mx-1.5">•</span>
                      <span title="Tables" className="text-[#F97316]">{rest._count.tables}t</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600 px-2 py-0.5 rounded-md bg-slate-100 border border-[#EAEAEA]">
                        {sub?.plan || 'STARTER'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          sub?.status === 'ACTIVE'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                            : 'bg-rose-50 border-rose-100 text-rose-600'
                        }`}
                      >
                        {sub?.status || 'EXPIRED'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleEditSubscription(rest)}
                        className="inline-flex items-center gap-1 bg-white border border-[#EAEAEA] hover:border-slate-350 text-slate-600 hover:text-[#111827] px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-xs"
                      >
                        <Edit2 className="w-3 h-3" /> Edit Plan
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingRest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-md rounded-xl p-6 shadow-md relative">
            <button
              onClick={() => setEditingRest(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white text-slate-400 hover:text-[#111827] border border-[#EAEAEA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">Override Subscription</h3>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100 inline-block mb-6">
              {editingRest.name}
            </span>

            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-650 text-xs p-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-3 rounded-lg flex items-center gap-1.5 font-medium animate-pulse">
                <Check className="w-4 h-4 text-emerald-650 shrink-0" /> Subscription updated!
              </div>
            )}

            <form onSubmit={handleSaveSubscription} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Plan Tier
                </label>
                <select
                  value={selectedPlan}
                  onChange={e => setSelectedPlan(e.target.value as any)}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="STARTER">Starter Plan ($0.00/mo)</option>
                  <option value="GROWTH">Growth Plan ($19.00/mo)</option>
                  <option value="PREMIUM">Premium Plan ($49.00/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as any)}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="EXPIRED">Expired</option>
                  <option value="PAST_DUE">Past Due</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Modifications'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
