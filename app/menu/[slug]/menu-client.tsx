'use client';

import { useState, useEffect, useRef } from 'react';
import { useMenuStore, DietFilter } from '@/lib/store';
import {
  Search,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Star,
  Bell,
  Coffee,
  ArrowRight,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ChevronRight,
  ThumbsUp,
  HelpCircle,
  Users
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  foodType: 'VEG' | 'NON_VEG' | 'JAIN';
  isBestseller: boolean;
  prepTime: number;
  isAvailable: boolean;
  ingredients?: string[];
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  themeColor: string;
}

interface Props {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  tableContext?: string;
  contacts?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

type ScreenState = 'landing' | 'menu' | 'cart' | 'payment' | 'tracking' | 'review';

// Premium high-res fallback imagery for visual excellence
const FALLBACK_BANNER = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80";
const FALLBACK_LOGO = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80";

const DISH_IMAGES: { [key: string]: string } = {
  'cappuccino': 'https://images.unsplash.com/photo-1571934811356-5cc561b63d2c?w=400&auto=format&fit=crop&q=80',
  'latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80',
  'cheese sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop&q=80',
  'chocolate brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80'
};

const INGREDIENTS_MAP: { [key: string]: string[] } = {
  'cappuccino': ['Espresso shot', 'Steamed milk', 'Milk foam', 'Cocoa powder dusting'],
  'latte': ['Double shot espresso', 'Steamed whole milk', 'Subtle microfoam'],
  'cheese sandwich': ['Artisanal sourdough', 'Aged cheddar', 'Mozzarella', 'Fresh basil pesto', 'Heirloom tomatoes'],
  'chocolate brownie': ['Belgian dark chocolate', 'Organic cocoa', 'Sea salt crystals', 'Vanilla bean extract', 'Walnuts']
};

export default function CustomerMenuClient({
  restaurant,
  categories,
  menuItems,
  tableContext = "4", // Default to table 4 if unspecified
  contacts,
}: Props) {
  const {
    searchQuery,
    setSearchQuery,
    selectedDiet,
    setSelectedDiet,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useMenuStore();

  // Screen State Machine
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('landing');
  
  // Drawer Detail State
  const [selectedItemForDrawer, setSelectedItemForDrawer] = useState<MenuItem | null>(null);
  
  // Table Service Quick Action State
  const [showWaiterSheet, setShowWaiterSheet] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Split Bill State
  const [splitCount, setSplitCount] = useState<number>(2);

  // Cooking instructions
  const [cookingInstructions, setCookingInstructions] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'upi' | 'split'>('upi');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Simulated Order Tracking State
  const [trackingStatus, setTrackingStatus] = useState<'received' | 'preparing' | 'ready' | 'served' | 'completed'>('received');
  
  // Review Stars & State
  const [reviewStars, setReviewStars] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const ribbonRef = useRef<HTMLDivElement | null>(null);

  // Simulate Order Tracking Steps
  useEffect(() => {
    if (currentScreen === 'tracking') {
      const timer1 = setTimeout(() => setTrackingStatus('preparing'), 6000);
      const timer2 = setTimeout(() => setTrackingStatus('ready'), 15000);
      const timer3 = setTimeout(() => setTrackingStatus('served'), 25000);
      const timer4 = setTimeout(() => setTrackingStatus('completed'), 35000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [currentScreen]);

  // Clean UI Auto-dismiss for Notifications
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  // Scroll spy helper
  useEffect(() => {
    if (currentScreen !== 'menu') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      for (const cat of categories) {
        const ref = categoryRefs.current[cat.id];
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories, currentScreen]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingCharge = cartItemCount > 0 ? 15 : 0;
  const gstAmount = cartTotal * 0.05;
  const finalGrandTotal = cartTotal + packagingCharge + gstAmount;

  // Search & diet filtering
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet = selectedDiet === 'ALL' || item.foodType === selectedDiet;
    return matchesSearch && matchesDiet;
  });

  const popularItems = menuItems.filter(item => item.isBestseller && item.isAvailable);

  const triggerNotification = (message: string) => {
    setActiveNotification(message);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setCurrentScreen('tracking');
    setTrackingStatus('received');
  };

  const handlePayment = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      setCurrentScreen('review');
    }, 2000);
  };

  const handleReviewSubmit = () => {
    if (reviewStars >= 4) {
      window.open('https://google.com', '_blank');
    }
    setFeedbackSubmitted(true);
  };

  // Get food image helper
  const getFoodImage = (item: MenuItem) => {
    if (item.imageUrl) return item.imageUrl;
    const nameLower = item.name.toLowerCase();
    for (const key in DISH_IMAGES) {
      if (nameLower.includes(key)) return DISH_IMAGES[key];
    }
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen flex justify-center selection:bg-[#FF6B35] selection:text-white pb-16 font-sans">
      
      {/* Mobile Frame Simulator for Desktop */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl border-x border-[#EFEFEF]">
        
        {/* Floating System-level Notifications (Toasts) */}
        {activeNotification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-55 w-[90%] max-w-[340px] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up border border-slate-800">
            <div className="bg-[#FF6B35] p-1.5 rounded-lg text-white">
              <Bell className="w-4 h-4 animate-swing" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-slate-100 leading-tight">{activeNotification}</p>
            </div>
          </div>
        )}

        {/* PERSISTENT QUICK TABLE SERVICES BAR */}
        {currentScreen !== 'landing' && currentScreen !== 'review' && (
          <div className="bg-white border-b border-[#EFEFEF] py-2 px-4 flex justify-between items-center text-xs sticky top-0 z-40 shadow-xs">
            <div className="flex items-center gap-1.5 font-black text-[#111827]">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full animate-ping" />
              <span>Table {tableContext}</span>
            </div>
            <button
              onClick={() => setShowWaiterSheet(true)}
              className="inline-flex items-center gap-1 bg-[#FF6B35]/10 hover:bg-[#FF6B35]/20 text-[#FF6B35] px-3 py-1.5 rounded-full font-bold text-[10px] transition-colors cursor-pointer"
            >
              <Bell className="w-3 h-3" /> Call Waiter & Services
            </button>
          </div>
        )}

        {/* SCREEN 1: RESTAURANT LANDING SCREEN */}
        {currentScreen === 'landing' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            {/* Banner Section */}
            <div className="h-48 w-full relative">
              <img
                src={FALLBACK_BANNER}
                alt="Restaurant atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              
              {/* Back to previous / Home indicator */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Live Order Enabled
              </div>
            </div>

            {/* Restaurant Profile Card */}
            <div className="px-5 -mt-8 relative z-10 pb-6 border-b border-[#EFEFEF]">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#EFEFEF] flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h1 className="text-xl font-black text-[#111827] tracking-tight">{restaurant.name}</h1>
                    <p className="text-[11px] text-[#6B7280] font-medium leading-relaxed max-w-[200px]">
                      {contacts?.address || "456 Brew Street, Cafe Hill"}
                    </p>
                  </div>
                  <img
                    src={FALLBACK_LOGO}
                    alt="Logo"
                    className="w-12 h-12 rounded-xl object-cover border border-[#EFEFEF] shadow-xs shrink-0"
                  />
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#FAFAFA] text-xs">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide">
                      Open Now
                    </span>
                    <span className="text-[#6B7280] font-normal">• Closes 11 PM</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-900 font-black">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    <span>4.8</span>
                    <span className="text-[#6B7280] font-normal text-[10px]">(500+)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick search & categories wrapper */}
            <div className="px-5 py-6 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder={`Search in ${restaurant.name}...`}
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentScreen('menu');
                  }}
                  className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#111827] placeholder-[#6B7280] transition-all"
                />
              </div>

              {/* Bestsellers/Recommended Section */}
              {popularItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#111827] flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#FF6B35]" /> Recommended Today
                    </h2>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1">
                    {popularItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemForDrawer(item)}
                        className="w-36 bg-white border border-[#EFEFEF] rounded-xl overflow-hidden shadow-xs cursor-pointer shrink-0 transition-transform active:scale-98"
                      >
                        <div className="h-24 relative bg-slate-100">
                          <img
                            src={getFoodImage(item)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#FF6B35] rounded-full p-1 text-[9px] font-black">
                            <Sparkles className="w-3 h-3 fill-current" />
                          </span>
                        </div>
                        <div className="p-3 space-y-1">
                          <h3 className="font-extrabold text-xs text-[#111827] truncate leading-tight">{item.name}</h3>
                          <p className="text-[10px] font-black text-[#FF6B35]">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Category Grid */}
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                  Browse Categories
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryClick(cat.id);
                        setCurrentScreen('menu');
                      }}
                      className="bg-white border border-[#EFEFEF] p-4 rounded-xl text-left hover:border-[#FF6B35] transition-colors flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-[#6B7280] block">Section {idx + 1}</span>
                        <span className="font-extrabold text-xs text-[#111827]">{cat.name}</span>
                      </div>
                      <Coffee className="w-4 h-4 text-[#FF6B35]/50 group-hover:text-[#FF6B35] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Big CTA to enter menu */}
            <div className="mt-auto p-5 bg-white border-t border-[#EFEFEF]">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="w-full bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs py-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Digital Menu</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: MENU BROWSING SCREEN */}
        {currentScreen === 'menu' && (
          <div className="flex-1 flex flex-col animate-fade-in">
            {/* Minimal Header navigation */}
            <div className="px-5 py-4 border-b border-[#EFEFEF] flex justify-between items-center bg-white">
              <button
                onClick={() => setCurrentScreen('landing')}
                className="text-xs font-bold text-[#6B7280] hover:text-[#111827] flex items-center gap-1"
              >
                ← About
              </button>
              <h2 className="text-xs font-black uppercase tracking-widest text-[#111827]">Digital Menu</h2>
              <div className="w-12" />
            </div>

            {/* Diet filter horizontal ribbon */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#EFEFEF] bg-white sticky top-[37px] z-30">
              {(['ALL', 'VEG', 'NON_VEG', 'JAIN'] as DietFilter[]).map(diet => {
                const isSelected = selectedDiet === diet;
                return (
                  <button
                    key={diet}
                    onClick={() => setSelectedDiet(diet)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black border transition-colors shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF6B35]/10 border-[#FF6B35]/30 text-[#FF6B35]'
                        : 'bg-white border-[#EFEFEF] text-[#6B7280]'
                    }`}
                  >
                    {diet === 'ALL' && 'All Food'}
                    {diet === 'VEG' && '🟢 Veg Only'}
                    {diet === 'NON_VEG' && '🔴 Non-Veg'}
                    {diet === 'JAIN' && '🟡 Jain'}
                  </button>
                );
              })}
            </div>

            {/* Sticky categories horizontal ribbon */}
            <div
              ref={ribbonRef}
              className="sticky top-[77px] z-30 bg-white/95 backdrop-blur-xs border-b border-[#EFEFEF] px-4 py-3 flex gap-5 overflow-x-auto no-scrollbar"
            >
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-xs font-extrabold pb-1.5 transition-all shrink-0 cursor-pointer border-b-2 relative ${
                      isActive
                        ? 'border-[#FF6B35] text-[#FF6B35] font-black'
                        : 'border-transparent text-slate-400 hover:text-[#111827]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search items display */}
            <div className="p-4 bg-white border-b border-[#FAFAFA]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#FF6B35]"
                />
              </div>
            </div>

            {/* Main Menu List */}
            <main className="flex-1 px-5 py-4 space-y-10 bg-white">
              {categories.map(cat => {
                const itemsInCat = filteredItems.filter(item => item.categoryId === cat.id);
                if (itemsInCat.length === 0) return null;

                return (
                  <div
                    key={cat.id}
                    ref={el => {
                      categoryRefs.current[cat.id] = el;
                    }}
                    className="space-y-3 scroll-mt-36"
                  >
                    <h2 className="text-xs font-black tracking-wider text-slate-400 uppercase flex items-center justify-between py-2 border-b border-[#EFEFEF]">
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{itemsInCat.length} items</span>
                    </h2>

                    <div className="divide-y divide-[#EFEFEF]">
                      {itemsInCat.map(item => {
                        const cartItem = cart.find(ci => ci.id === item.id);
                        const isOos = !item.isAvailable;

                        return (
                          <div
                            key={item.id}
                            className={`flex items-start justify-between gap-4 py-5 relative transition-opacity ${
                              isOos ? 'opacity-40' : ''
                            }`}
                          >
                            {/* Left Side: Photo */}
                            <div
                              onClick={() => !isOos && setSelectedItemForDrawer(item)}
                              className="relative shrink-0 cursor-pointer"
                            >
                              <img
                                src={getFoodImage(item)}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover border border-[#EFEFEF]"
                              />
                              {item.isBestseller && (
                                <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-white rounded-full p-0.5 shadow-xs">
                                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                                </span>
                              )}
                            </div>

                            {/* Middle Side: Details */}
                            <div
                              onClick={() => !isOos && setSelectedItemForDrawer(item)}
                              className="flex-1 space-y-1 cursor-pointer pr-1"
                            >
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`w-3 h-3 rounded-xs flex items-center justify-center shrink-0 border ${
                                    item.foodType === 'VEG'
                                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                                      : 'border-rose-500 bg-rose-50 text-rose-600'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${item.foodType === 'VEG' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                                </span>
                                <h3 className="font-extrabold text-xs text-[#111827] leading-tight">{item.name}</h3>
                              </div>
                              {item.description && (
                                <p className="text-[10px] text-[#6B7280] font-medium leading-normal line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center gap-3 text-[10px] text-[#6B7280] font-bold pt-1">
                                <span className="text-[#FF6B35] font-black">₹{item.price}</span>
                                <span className="flex items-center gap-0.5"><Clock className="w-3 h-3 text-[#6B7280]" /> {item.prepTime} min</span>
                              </div>
                            </div>

                            {/* Right Side: Add Action */}
                            <div className="shrink-0 flex items-center h-20">
                              {isOos ? (
                                <span className="text-[9px] font-bold bg-slate-100 border border-[#EFEFEF] px-2 py-1 rounded-md text-[#6B7280] uppercase tracking-wide">
                                  Sold Out
                                </span>
                              ) : cartItem ? (
                                <div className="flex items-center border border-[#FF6B35]/30 rounded-lg overflow-hidden bg-white text-xs font-black text-[#111827] shadow-xs">
                                  <button
                                    onClick={() => updateCartQuantity(item.id, cartItem.quantity - 1)}
                                    className="px-2 py-1.5 hover:bg-slate-55"
                                  >
                                    <Minus className="w-3 h-3 text-[#FF6B35]" />
                                  </button>
                                  <span className="px-1.5 min-w-4 text-center text-[11px]">{cartItem.quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(item.id, cartItem.quantity + 1)}
                                    className="px-2 py-1.5 hover:bg-slate-55"
                                  >
                                    <Plus className="w-3 h-3 text-[#FF6B35]" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    addToCart({ id: item.id, name: item.name, price: item.price });
                                    triggerNotification(`"${item.name}" added to cart`);
                                  }}
                                  className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider border border-[#FF6B35]/30 text-[#FF6B35] hover:bg-[#FF6B35]/5 bg-white rounded-lg shadow-2xs cursor-pointer select-none"
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </main>

            {/* SCREEN 4: FLOATING ZOMATO-STYLE BOTTOM CART BAR */}
            {cartItemCount > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[370px] z-45 bg-[#111827] text-white p-3.5 rounded-xl shadow-2xl flex justify-between items-center animate-slide-up border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider leading-none">
                      {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} added
                    </span>
                    <span className="text-xs font-black">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('cart')}
                  className="bg-[#FF6B35] hover:bg-[#ea580c] text-white text-[11px] font-black px-4 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 select-none"
                >
                  View Cart <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 5: CART CHECKOUT PAGE */}
        {currentScreen === 'cart' && (
          <div className="flex-1 flex flex-col animate-fade-in bg-[#FAFAFA]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#EFEFEF] flex justify-between items-center bg-white">
              <button
                onClick={() => setCurrentScreen('menu')}
                className="text-xs font-bold text-[#6B7280] hover:text-[#111827]"
              >
                ← Back
              </button>
              <h2 className="text-xs font-black uppercase tracking-wider text-[#111827]">Basket Checkout</h2>
              <div className="w-8" />
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-sm text-[#111827] uppercase tracking-wider">Basket Empty</h3>
                <p className="text-[10px] text-[#6B7280] max-w-xs leading-relaxed">
                  Go back to the digital menu card to add delicious meals to your basket.
                </p>
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="bg-[#FF6B35] text-white text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Scrollable list & billing */}
                <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-230px)]">
                  {/* Items Card */}
                  <div className="bg-white rounded-xl border border-[#EFEFEF] p-4 space-y-4 shadow-2xs">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Your Selection</h3>
                    
                    <div className="divide-y divide-[#FAFAFA]">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2.5">
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-xs text-[#111827]">{item.name}</h4>
                            <span className="text-[10px] text-[#6B7280] font-medium">₹{item.price}</span>
                          </div>
                          
                          <div className="flex items-center border border-[#EFEFEF] rounded-lg overflow-hidden text-xs font-black text-[#111827]">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-[#FF6B35]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-[11px] min-w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-[#FF6B35]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Instructions Card */}
                  <div className="bg-white rounded-xl border border-[#EFEFEF] p-4 space-y-3 shadow-2xs">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Cooking Instructions
                    </h3>
                    <textarea
                      placeholder="Add any note (e.g. make it extra spicy, allergy details, no onions...)"
                      value={cookingInstructions}
                      onChange={e => setCookingInstructions(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg p-3 text-xs placeholder-[#6B7280] resize-none h-16"
                    />
                  </div>

                  {/* Detailed Bill Breakdown */}
                  <div className="bg-white rounded-xl border border-[#EFEFEF] p-4 space-y-3 shadow-2xs text-xs">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Bill Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[#6B7280] font-medium">
                        <span>Item Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#6B7280] font-medium">
                        <span>Govt Taxes & GST (5%)</span>
                        <span>₹{gstAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#6B7280] font-medium">
                        <span>Packaging Charge</span>
                        <span>₹{packagingCharge.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-[#EFEFEF] pt-2.5 flex justify-between font-black text-sm text-[#111827]">
                        <span>Grand Total</span>
                        <span className="text-[#FF6B35]">₹{finalGrandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Order Action */}
                <div className="p-5 bg-white border-t border-[#EFEFEF] space-y-3">
                  <div className="flex justify-between items-center text-xs px-1">
                    <div>
                      <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Total Payable</span>
                      <span className="font-black text-sm text-[#111827]">₹{finalGrandTotal.toFixed(2)}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-0.5">
                      Table {tableContext} Dine-in
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs py-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-center select-none"
                  >
                    <span>Place Order & Start Tracking</span> <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 6: ORDER TRACKING SCREEN */}
        {currentScreen === 'tracking' && (
          <div className="flex-1 flex flex-col animate-fade-in bg-[#FAFAFA]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#EFEFEF] flex justify-between items-center bg-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35]">Live Tracker</span>
              <h2 className="text-xs font-black uppercase tracking-wider text-[#111827]">Track Your Feast</h2>
              <button
                onClick={() => setCurrentScreen('menu')}
                className="text-[10px] font-bold bg-[#FAFAFA] border border-[#EFEFEF] px-2.5 py-1 rounded-md text-[#6B7280]"
              >
                Menu
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              {/* Order Status Timeline Card */}
              <div className="bg-white rounded-2xl border border-[#EFEFEF] p-6 space-y-6 shadow-xs relative">
                <div className="text-center space-y-1 pb-4 border-b border-[#FAFAFA]">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">Simulated Dining Timeline</span>
                  <h3 className="font-black text-sm text-[#111827]">
                    {trackingStatus === 'received' && '📝 Order Dispatched'}
                    {trackingStatus === 'preparing' && '🍳 Freshly Preparing...'}
                    {trackingStatus === 'ready' && '🔔 Ready at Counter'}
                    {trackingStatus === 'served' && '🍽️ Served at Table'}
                    {trackingStatus === 'completed' && '✨ Enjoy Your Food'}
                  </h3>
                  <p className="text-[10px] text-[#6B7280] font-medium">Table {tableContext} • Est: 12-15 mins</p>
                </div>

                {/* Visual Status Steps */}
                <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EFEFEF]">
                  {/* Step 1 */}
                  <div className="relative flex gap-4">
                    <span className={`absolute -left-[22px] w-4 h-4 rounded-full border-2 ${
                      trackingStatus !== 'received'
                        ? 'bg-[#FF6B35] border-[#FF6B35]'
                        : 'bg-white border-[#FF6B35] animate-ping'
                    }`} />
                    <div className="space-y-0.5 -mt-1">
                      <h4 className={`text-xs font-extrabold ${trackingStatus === 'received' ? 'text-[#FF6B35]' : 'text-[#111827]'}`}>Order Received</h4>
                      <p className="text-[10px] text-[#6B7280] font-medium">Chef approved your basket items</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex gap-4">
                    <span className={`absolute -left-[22px] w-4 h-4 rounded-full border-2 ${
                      trackingStatus === 'preparing'
                        ? 'bg-white border-[#FF6B35] animate-ping'
                        : ['ready', 'served', 'completed'].includes(trackingStatus)
                        ? 'bg-[#FF6B35] border-[#FF6B35]'
                        : 'bg-white border-[#EFEFEF]'
                    }`} />
                    <div className="space-y-0.5 -mt-1">
                      <h4 className={`text-xs font-extrabold ${
                        trackingStatus === 'preparing' ? 'text-[#FF6B35]' : ['ready', 'served', 'completed'].includes(trackingStatus) ? 'text-[#111827]' : 'text-slate-400'
                      }`}>In the Kitchen</h4>
                      <p className="text-[10px] text-[#6B7280] font-medium">Baking and plating ingredients fresh</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex gap-4">
                    <span className={`absolute -left-[22px] w-4 h-4 rounded-full border-2 ${
                      trackingStatus === 'ready'
                        ? 'bg-white border-[#FF6B35] animate-ping'
                        : ['served', 'completed'].includes(trackingStatus)
                        ? 'bg-[#FF6B35] border-[#FF6B35]'
                        : 'bg-white border-[#EFEFEF]'
                    }`} />
                    <div className="space-y-0.5 -mt-1">
                      <h4 className={`text-xs font-extrabold ${
                        trackingStatus === 'ready' ? 'text-[#FF6B35]' : ['served', 'completed'].includes(trackingStatus) ? 'text-[#111827]' : 'text-slate-400'
                      }`}>Ready to Serve</h4>
                      <p className="text-[10px] text-[#6B7280] font-medium">Dish is packed and marked for serving</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex gap-4">
                    <span className={`absolute -left-[22px] w-4 h-4 rounded-full border-2 ${
                      trackingStatus === 'served'
                        ? 'bg-white border-[#FF6B35] animate-ping'
                        : trackingStatus === 'completed'
                        ? 'bg-[#FF6B35] border-[#FF6B35]'
                        : 'bg-white border-[#EFEFEF]'
                    }`} />
                    <div className="space-y-0.5 -mt-1">
                      <h4 className={`text-xs font-extrabold ${
                        trackingStatus === 'served' ? 'text-[#FF6B35]' : trackingStatus === 'completed' ? 'text-[#111827]' : 'text-slate-400'
                      }`}>Served at Table</h4>
                      <p className="text-[10px] text-[#6B7280] font-medium">Delivered directly to table {tableContext}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons to proceed to payment */}
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentScreen('payment')}
                  className="w-full bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs py-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Request Bill / Make Payment
                </button>
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="w-full bg-white border border-[#EFEFEF] text-slate-800 font-extrabold text-xs py-3 rounded-xl hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                >
                  Browse More & Add Dishes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 8: PAYMENT OPTIONS */}
        {currentScreen === 'payment' && (
          <div className="flex-1 flex flex-col animate-fade-in bg-[#FAFAFA]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#EFEFEF] flex justify-between items-center bg-white">
              <button
                onClick={() => setCurrentScreen('tracking')}
                className="text-xs font-bold text-[#6B7280] hover:text-[#111827]"
              >
                ← Tracker
              </button>
              <h2 className="text-xs font-black uppercase tracking-wider text-[#111827]">Settle Bill</h2>
              <div className="w-8" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              
              {/* Payment Details Card */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-[#EFEFEF] p-4 text-center space-y-1 shadow-2xs">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">Total Bill Due</span>
                  <h3 className="text-2xl font-black text-[#111827]">₹{finalGrandTotal.toFixed(2)}</h3>
                  <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-100 border border-[#EFEFEF] rounded-md px-2 py-0.5">
                    Table {tableContext} • Dining Bill
                  </span>
                </div>

                {/* Option selector */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] px-1">Payment Method</h4>
                  
                  {/* Pay at Counter */}
                  <label
                    onClick={() => setPaymentMethod('counter')}
                    className={`bg-white border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'counter' ? 'border-[#FF6B35]' : 'border-[#EFEFEF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        💵
                      </div>
                      <div className="space-y-0.5 text-left">
                        <span className="font-extrabold text-xs text-[#111827]">Pay At Counter</span>
                        <span className="text-[9px] font-bold text-[#6B7280] block">Pay cash/card to the cashier</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMethod === 'counter'}
                      onChange={() => {}}
                      className="accent-[#FF6B35]"
                    />
                  </label>

                  {/* UPI */}
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`bg-white border rounded-xl p-4 flex flex-col gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-[#FF6B35]' : 'border-[#EFEFEF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          📱
                        </div>
                        <div className="space-y-0.5 text-left">
                          <span className="font-extrabold text-xs text-[#111827]">Instant UPI Payment</span>
                          <span className="text-[9px] font-bold text-[#6B7280] block">Scan simulated code or select provider</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'upi'}
                        onChange={() => {}}
                        className="accent-[#FF6B35]"
                      />
                    </div>
                    
                    {paymentMethod === 'upi' && (
                      <div className="border-t border-[#FAFAFA] pt-3 flex flex-col items-center justify-center bg-[#FAFAFA] rounded-lg p-3 space-y-2">
                        {/* Simulated QR */}
                        <div className="w-24 h-24 bg-white border border-[#EFEFEF] rounded-md p-1.5 flex items-center justify-center shadow-2xs">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=merchant@upi%26pn=Restreasy%26am=${finalGrandTotal.toFixed(2)}`}
                            alt="Payment QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Scan with GPay / PhonePe / BHIM</span>
                      </div>
                    )}
                  </label>

                  {/* Split Bill Calculator */}
                  <label
                    onClick={() => setPaymentMethod('split')}
                    className={`bg-white border rounded-xl p-4 flex flex-col gap-3 cursor-pointer transition-colors ${
                      paymentMethod === 'split' ? 'border-[#FF6B35]' : 'border-[#EFEFEF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 text-left">
                          <span className="font-extrabold text-xs text-[#111827]">Split Bill</span>
                          <span className="text-[9px] font-bold text-[#6B7280] block">Calculate equal shares among peers</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'split'}
                        onChange={() => {}}
                        className="accent-[#FF6B35]"
                      />
                    </div>

                    {paymentMethod === 'split' && (
                      <div className="border-t border-[#FAFAFA] pt-3 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-[#6B7280]">
                          <span>Split Between</span>
                          <div className="flex items-center border border-[#EFEFEF] rounded-lg overflow-hidden bg-white text-xs font-black text-[#111827]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSplitCount(Math.max(2, splitCount - 1));
                              }}
                              className="px-2.5 py-1.5 hover:bg-slate-50"
                            >
                              <Minus className="w-3 h-3 text-[#FF6B35]" />
                            </button>
                            <span className="px-3">{splitCount}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSplitCount(splitCount + 1);
                              }}
                              className="px-2.5 py-1.5 hover:bg-slate-50"
                            >
                              <Plus className="w-3 h-3 text-[#FF6B35]" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-[#FF6B35]/5 border border-[#FF6B35]/15 rounded-lg p-3">
                          <span className="text-[10px] font-extrabold text-[#6B7280] uppercase tracking-wider">Per Person</span>
                          <span className="text-sm font-black text-[#FF6B35]">₹{(finalGrandTotal / splitCount).toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Confirm / Settle Bill Success screen */}
              {paymentConfirmed ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center text-emerald-800 space-y-2 mt-4">
                  <Check className="w-6 h-6 mx-auto animate-bounce text-emerald-500" />
                  <p className="text-xs font-black">Transaction Simulation Success!</p>
                  <p className="text-[9px] font-medium text-emerald-600">Redirecting to Feedback Rating Page...</p>
                </div>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs py-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Check className="w-4 h-4" /> Finish Payment & Checkout
                </button>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 9: REVIEW EXPERIENCE SCREEN */}
        {currentScreen === 'review' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 animate-fade-in text-center space-y-6">
            <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center text-[#FF6B35]">
              <ThumbsUp className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-xs">
              <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-widest block">Dining Complete</span>
              <h2 className="text-lg font-black text-[#111827] tracking-tight">How was your dining experience?</h2>
              <p className="text-[10px] text-[#6B7280] leading-relaxed">
                Your feedback helps us perfect our cooking, table distribution, and menu catalog.
              </p>
            </div>

            {/* Interactive Stars */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setReviewStars(star)}
                  className="p-1 cursor-pointer transition-transform active:scale-110"
                >
                  <Star className={`w-8 h-8 ${
                    star <= reviewStars
                      ? 'fill-amber-400 stroke-amber-400'
                      : 'stroke-slate-300'
                  }`} />
                </button>
              ))}
            </div>

            {/* Private Feedback Comment Box */}
            <div className="w-full space-y-2 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]">
                {reviewStars >= 4 ? 'Tell us what you loved' : 'How can we improve?'}
              </h4>
              <textarea
                placeholder="Write your review details here..."
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-3 text-xs placeholder-[#6B7280] h-20"
              />
            </div>

            {feedbackSubmitted ? (
              <div className="w-full bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-4 text-center space-y-1.5 animate-slide-up">
                <span className="font-extrabold text-xs text-[#FF6B35]">Thank You For Your Time!</span>
                <p className="text-[9px] text-[#6B7280] font-medium leading-relaxed">
                  {reviewStars >= 4 
                    ? "Redirecting you to our Google Reviews page..."
                    : "Your feedback has been logged internally for management review."}
                </p>
                <button
                  onClick={() => {
                    clearCart();
                    setFeedbackSubmitted(false);
                    setCurrentScreen('landing');
                  }}
                  className="mt-2 bg-[#111827] text-white font-bold text-[10px] px-4 py-1.5 rounded-lg"
                >
                  Go Back to Start
                </button>
              </div>
            ) : (
              <button
                onClick={handleReviewSubmit}
                className="w-full bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs py-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {reviewStars >= 4 ? "Redirect & Share on Google" : "Submit Feedback"}
              </button>
            )}
          </div>
        )}

        {/* SCREEN 3: FOOD DETAIL DRAWER BOTTOM SHEET */}
        {selectedItemForDrawer && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-xs">
            <div className="bg-white w-full max-w-md rounded-t-2xl shadow-2xl relative animate-slide-up pb-8 border-t border-[#EFEFEF] overflow-hidden">
              
              {/* Cover Image */}
              <div className="h-48 relative bg-slate-100">
                <img
                  src={getFoodImage(selectedItemForDrawer)}
                  alt={selectedItemForDrawer.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItemForDrawer(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-xs text-slate-700 hover:text-black shadow-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Panel */}
              <div className="p-5 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-3 h-3 rounded-xs flex items-center justify-center shrink-0 border ${
                        selectedItemForDrawer.foodType === 'VEG'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                          : 'border-rose-500 bg-rose-50 text-rose-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedItemForDrawer.foodType === 'VEG' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                    </span>
                    <h3 className="text-base font-black text-[#111827]">{selectedItemForDrawer.name}</h3>
                  </div>

                  <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                    {selectedItemForDrawer.description || "Freshly curated, hand-prepared house special served warm to your table."}
                  </p>
                </div>

                {/* Preparation details */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAFAFA] border border-[#EFEFEF] rounded-xl p-3">
                  <div className="space-y-0.5 text-center border-r border-[#EFEFEF]">
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Prep Time</span>
                    <span className="font-extrabold text-[#111827] flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF6B35]" /> {selectedItemForDrawer.prepTime} mins
                    </span>
                  </div>
                  <div className="space-y-0.5 text-center">
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Item Pricing</span>
                    <span className="font-black text-[#FF6B35]">₹{selectedItemForDrawer.price}</span>
                  </div>
                </div>

                {/* Ingredients tag */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Ingredients</span>
                  <div className="flex gap-2 flex-wrap">
                    {(INGREDIENTS_MAP[selectedItemForDrawer.name.toLowerCase()] || ['Fresh Herbs', 'Organic Spice', 'Seasonings']).map(ing => (
                      <span key={ing} className="bg-slate-100 border border-[#EFEFEF] text-slate-800 text-[10px] px-2 py-0.5 rounded-md">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to basket CTA */}
                <div className="pt-2 border-t border-[#EFEFEF] flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Subtotal</span>
                    <span className="font-black text-sm text-[#111827]">₹{selectedItemForDrawer.price}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      addToCart({ id: selectedItemForDrawer.id, name: selectedItemForDrawer.name, price: selectedItemForDrawer.price });
                      triggerNotification(`"${selectedItemForDrawer.name}" added to cart`);
                      setSelectedItemForDrawer(null);
                    }}
                    className="bg-[#FF6B35] hover:bg-[#ea580c] text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 7: TABLE SERVICES (QUICK ACTIONS BOTTOM SHEET) */}
        {showWaiterSheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-xs">
            <div className="bg-white w-full max-w-md rounded-t-2xl shadow-2xl p-6 space-y-6 animate-slide-up border-t border-[#EFEFEF] pb-10">
              <div className="flex justify-between items-center border-b border-[#EFEFEF] pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#111827]" />
                  <h3 className="font-black text-xs uppercase tracking-wider text-[#111827]">Quick Table Assistance</h3>
                </div>
                <button
                  onClick={() => setShowWaiterSheet(false)}
                  className="p-1 rounded-lg bg-white text-slate-400 hover:text-black border border-[#EFEFEF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    triggerNotification(`🛎️ Call Waiter: Assistance requested at Table ${tableContext}`);
                    setShowWaiterSheet(false);
                  }}
                  className="bg-white border border-[#EFEFEF] hover:border-[#FF6B35] p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-2xs hover:bg-[#FF6B35]/5 group cursor-pointer"
                >
                  <span className="text-xl">🛎️</span>
                  <span className="font-extrabold text-xs text-[#111827] group-hover:text-[#FF6B35]">Call Waiter</span>
                </button>

                <button
                  onClick={() => {
                    triggerNotification(`💧 Request Water: Dispatched for Table ${tableContext}`);
                    setShowWaiterSheet(false);
                  }}
                  className="bg-white border border-[#EFEFEF] hover:border-[#FF6B35] p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-2xs hover:bg-[#FF6B35]/5 group cursor-pointer"
                >
                  <span className="text-xl">💧</span>
                  <span className="font-extrabold text-xs text-[#111827] group-hover:text-[#FF6B35]">Request Water</span>
                </button>

                <button
                  onClick={() => {
                    triggerNotification(`🧾 Bill Request: Settle-up printed for Table ${tableContext}`);
                    setShowWaiterSheet(false);
                    setCurrentScreen('payment');
                  }}
                  className="bg-white border border-[#EFEFEF] hover:border-[#FF6B35] p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-2xs hover:bg-[#FF6B35]/5 group cursor-pointer"
                >
                  <span className="text-xl">🧾</span>
                  <span className="font-extrabold text-xs text-[#111827] group-hover:text-[#FF6B35]">Request Bill</span>
                </button>

                <button
                  onClick={() => {
                    triggerNotification(`❓ Help Needed: Attendant dispatched for Table ${tableContext}`);
                    setShowWaiterSheet(false);
                  }}
                  className="bg-white border border-[#EFEFEF] hover:border-[#FF6B35] p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-2xs hover:bg-[#FF6B35]/5 group cursor-pointer"
                >
                  <span className="text-xl">❓</span>
                  <span className="font-extrabold text-xs text-[#111827] group-hover:text-[#FF6B35]">Need Help</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
