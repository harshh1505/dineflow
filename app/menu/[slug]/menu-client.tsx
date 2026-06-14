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
  RotateCcw
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

export default function CustomerMenuClient({
  restaurant,
  categories,
  menuItems,
  tableContext,
  contacts,
}: Props) {
  const {
    searchQuery,
    setSearchQuery,
    selectedDiet,
    setSelectedDiet,
    cart,
    addToCart,
    updateCartQuantity,
    clearCart,
  } = useMenuStore();

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Out of Stock Simulation States
  const [showStockModification, setShowStockModification] = useState(false);
  const [simulatedOosItem, setSimulatedOosItem] = useState<{ id: string; name: string; price: number } | null>(null);
  const [suggestedReplacement, setSuggestedReplacement] = useState<MenuItem | null>(null);

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const ribbonRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      const offset = 120;
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

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
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
  }, [categories]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filter Items
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet = selectedDiet === 'ALL' || item.foodType === selectedDiet;
    return matchesSearch && matchesDiet;
  });

  // Handle Simulated Order submission
  const handlePlaceOrder = () => {
    setShowCartDrawer(false);
    
    // Simulation: if Garlic Bread is in cart, trigger out of stock flow
    const garlicBread = cart.find(i => i.name.toLowerCase().includes('garlic'));
    
    if (garlicBread) {
      setSimulatedOosItem(garlicBread);
      
      // Find a replacement item in menu items (e.g. Pasta or Paneer)
      const replacement = menuItems.find(i => i.isAvailable && !i.name.toLowerCase().includes('garlic'));
      setSuggestedReplacement(replacement || null);
      
      setShowStockModification(true);
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  // Replacement Flow options
  const handleReplaceItem = () => {
    if (!simulatedOosItem || !suggestedReplacement) return;
    
    updateCartQuantity(simulatedOosItem.id, 0);
    addToCart({
      id: suggestedReplacement.id,
      name: suggestedReplacement.name,
      price: suggestedReplacement.price,
    });

    setShowStockModification(false);
    setSimulatedOosItem(null);
    setSuggestedReplacement(null);
    setOrderPlaced(true);
  };

  const handleRemoveItemOnly = () => {
    if (!simulatedOosItem) return;
    
    updateCartQuantity(simulatedOosItem.id, 0);
    
    setShowStockModification(false);
    setSimulatedOosItem(null);
    setSuggestedReplacement(null);
    setOrderPlaced(true);
  };

  return (
    <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative border-x border-[#EAEAEA] font-sans selection:bg-[#F97316] selection:text-white">
      {/* Header Banner - Elegant Light theme */}
      <header className="bg-white text-[#111827] p-6 relative border-b border-[#EAEAEA]">
        {tableContext && (
          <div className="inline-flex items-center gap-1.5 bg-[#F97316]/10 border border-[#F97316]/20 px-3 py-1 rounded-md text-[10px] font-bold text-[#F97316] mb-4 animate-slide-up">
            <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full animate-ping" />
            Table {tableContext} • Dining In
          </div>
        )}

        <div className="flex items-center gap-4 mt-2">
          {restaurant.logoUrl ? (
            <img
              src={restaurant.logoUrl}
              alt={restaurant.name}
              className="w-14 h-14 rounded-lg object-cover border border-[#EAEAEA] shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center shrink-0 text-slate-400">
              <UtensilsCrossed className="w-6 h-6 text-[#F97316]" />
            </div>
          )}

          <div>
            <h1 className="text-lg font-black tracking-tight text-[#111827]">{restaurant.name}</h1>
            <div className="flex flex-col gap-1 mt-1 text-[10px] text-slate-500 font-medium">
              {contacts?.address && (
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> {contacts.address}</span>
              )}
              {contacts?.phone && (
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> {contacts.phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg pl-10 pr-3 py-3 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] transition-colors"
          />
        </div>
      </header>

      {/* Diet filter horizontal ribbon */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#EAEAEA] bg-white">
        {(['ALL', 'VEG', 'NON_VEG', 'JAIN'] as DietFilter[]).map(diet => {
          const isSelected = selectedDiet === diet;
          return (
            <button
              key={diet}
              onClick={() => setSelectedDiet(diet)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]'
                  : 'bg-white border-[#EAEAEA] text-slate-500 hover:text-[#111827]'
              }`}
            >
              {diet === 'ALL' && 'All Items'}
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
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#EAEAEA] px-6 py-3 flex gap-5 overflow-x-auto no-scrollbar"
      >
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`text-xs font-bold pb-1.5 transition-all shrink-0 cursor-pointer border-b-2 relative ${
                isActive
                  ? 'border-[#F97316] text-[#F97316] font-black'
                  : 'border-transparent text-slate-450 hover:text-[#111827]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Main Menu items display */}
      <main className="flex-1 px-6 py-4 space-y-10 bg-white">
        {categories.map(cat => {
          const itemsInCat = filteredItems.filter(item => item.categoryId === cat.id);
          if (itemsInCat.length === 0) return null;

          return (
            <div
              key={cat.id}
              ref={el => {
                categoryRefs.current[cat.id] = el;
              }}
              className="space-y-2"
            >
              <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between py-2 border-b border-[#EAEAEA]">
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{itemsInCat.length} items</span>
              </h2>

              <div className="divide-y divide-[#EAEAEA]">
                {itemsInCat.map(item => {
                  const cartItem = cart.find(ci => ci.id === item.id);
                  const isOos = !item.isAvailable;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-start justify-between gap-4 py-5 relative transition-colors ${
                        isOos ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Left: tags, details */}
                      <div className="flex-1 space-y-1.5 pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`w-3 h-3 rounded flex items-center justify-center shrink-0 border ${
                              item.foodType === 'VEG'
                                ? 'border-emerald-450 bg-emerald-50 text-emerald-600'
                                : item.foodType === 'NON_VEG'
                                ? 'border-rose-450 bg-rose-50 text-rose-600'
                                : 'border-amber-450 bg-amber-50 text-amber-600'
                            }`}
                          >
                            <span className="w-1 h-1 rounded-full bg-current" />
                          </span>

                          {item.isBestseller && (
                            <span className="bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2 py-0.5 text-[9px] font-bold flex items-center gap-0.5 uppercase tracking-wide">
                              <Sparkles className="w-2.5 h-2.5" /> Bestseller
                            </span>
                          )}
                          
                          {isOos && (
                            <span className="bg-slate-100 text-slate-500 border border-[#EAEAEA] rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        <h3 className="font-extrabold text-sm text-[#111827] leading-snug">{item.name}</h3>
                        
                        {item.description && (
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold mt-2">
                          <span className="text-[#111827] text-xs font-black">${item.price.toFixed(2)}</span>
                          <span className="flex items-center gap-0.5 font-medium"><Clock className="w-3.5 h-3.5 text-slate-355 shrink-0" /> {item.prepTime} mins</span>
                        </div>
                      </div>

                      {/* Right: Picture & Actions (Scaled Up Image) */}
                      <div className="relative shrink-0 flex flex-col items-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={`w-24 h-24 rounded-lg object-cover border border-[#EAEAEA] shrink-0 ${
                              isOos ? 'grayscale' : ''
                            }`}
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center text-slate-400 shrink-0">
                            <UtensilsCrossed className="w-8 h-8 text-[#EAEAEA]" />
                          </div>
                        )}

                        {/* Quantity controls */}
                        <div className="absolute -bottom-2 shadow-xs border border-[#EAEAEA] rounded-lg overflow-hidden bg-white flex items-center">
                          {isOos ? (
                            <span className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 bg-slate-50 select-none">
                              Unavailable
                            </span>
                          ) : cartItem ? (
                            <div className="flex items-center text-xs font-bold text-[#111827]">
                              <button
                                onClick={() => updateCartQuantity(item.id, cartItem.quantity - 1)}
                                className="px-2 py-1.5 hover:bg-slate-50 cursor-pointer select-none"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-1.5 min-w-4 text-center">{cartItem.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, cartItem.quantity + 1)}
                                className="px-2 py-1.5 hover:bg-slate-50 cursor-pointer select-none"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                              className="px-5 py-1.5 text-xs font-bold uppercase bg-white text-[#F97316] hover:bg-slate-50 cursor-pointer select-none"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      {/* Floating Cart Panel */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[340px] z-45 bg-[#111827] border border-[#EAEAEA] text-white p-3 rounded-xl shadow-md flex justify-between items-center animate-slide-up">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                {cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'} Selected
              </span>
              <span className="text-xs font-black">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCartDrawer(true)}
            className="bg-[#F97316] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer hover:bg-[#ea580c]"
          >
            Review Cart
          </button>
        </div>
      )}

      {/* CART DRAWER */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-xl p-6 space-y-6 shadow-md relative animate-slide-up pb-10 border-t border-[#EAEAEA]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#111827]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#111827]">Confirm Selection</h3>
              </div>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="p-1 rounded-lg bg-white text-slate-400 hover:text-[#111827] border border-[#EAEAEA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#FAFAFA] last:border-none">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-[#111827]">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center border border-[#EAEAEA] rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-500 hover:bg-[#FAFAFA]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold min-w-4 text-center text-[#111827]">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-500 hover:bg-[#FAFAFA]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EAEAEA] pt-4 flex justify-between items-center">
              <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Subtotal</span>
              <span className="font-black text-base text-[#111827]">${cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-xs py-3.5 rounded-lg shadow-2xs transition-colors cursor-pointer text-center select-none"
            >
              Order & Request Service
            </button>
          </div>
        </div>
      )}

      {/* DRIBBBLE UX: OUT OF STOCK ORDER MODIFICATION DRAWER */}
      {showStockModification && simulatedOosItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-t-xl p-6 space-y-6 shadow-md relative animate-slide-up pb-8 border-t-2 border-[#F97316]">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mx-auto">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Order Modification Required</h3>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                We apologize! <span className="font-bold text-[#111827]">"{simulatedOosItem.name}"</span> is currently out of stock. Please adjust your order.
              </p>
            </div>

            {/* Suggested Replacement Section */}
            {suggestedReplacement && (
              <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg p-4 space-y-3">
                <span className="text-[9px] font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                  Recommended Alternative
                </span>
                
                <div className="flex justify-between items-center gap-3">
                  <div className="flex gap-3">
                    {suggestedReplacement.imageUrl && (
                      <img
                        src={suggestedReplacement.imageUrl}
                        alt={suggestedReplacement.name}
                        className="w-12 h-12 rounded-md object-cover border border-[#EAEAEA]"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-[#111827]">{suggestedReplacement.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                        <span>${suggestedReplacement.price.toFixed(2)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3 text-slate-400" /> {suggestedReplacement.prepTime} min</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-500">
                    +{Math.max(0, suggestedReplacement.price - simulatedOosItem.price).toFixed(2)} diff
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid gap-3 pt-2">
              {suggestedReplacement && (
                <button
                  onClick={handleReplaceItem}
                  className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-xs py-3.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Replace with Recommended Alternative
                </button>
              )}
              
              <button
                onClick={handleRemoveItemOnly}
                className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-lg transition-colors cursor-pointer"
              >
                Remove from Cart and Continue
              </button>

              <button
                onClick={() => {
                  setShowStockModification(false);
                  setSimulatedOosItem(null);
                  setSuggestedReplacement(null);
                }}
                className="w-full bg-transparent text-slate-450 hover:text-[#111827] font-bold text-xs py-1"
              >
                Cancel and Review Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER CONFIRMATION */}
      {orderPlaced && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/25 backdrop-blur-xs">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-sm rounded-xl p-8 shadow-md text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">Order Confirmed!</h3>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Your digital menu request has been successfully dispatched to the server database. Enjoy your meal!
            </p>

            <button
              onClick={() => setOrderPlaced(false)}
              className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
