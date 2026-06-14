import { create } from 'zustand';

// Diet filter type matching schema FoodType plus ALL
export type DietFilter = 'ALL' | 'VEG' | 'NON_VEG' | 'JAIN';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface MenuState {
  searchQuery: string;
  activeCategory: string;
  selectedDiet: DietFilter;
  cart: CartItem[];
  
  setSearchQuery: (query: string) => void;
  setActiveCategory: (categoryId: string) => void;
  setSelectedDiet: (diet: DietFilter) => void;
  
  // Cart Actions
  addToCart: (item: { id: string; name: string; price: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  searchQuery: '',
  activeCategory: '',
  selectedDiet: 'ALL',
  cart: [],

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  setSelectedDiet: (diet) => set({ selectedDiet: diet }),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== itemId),
    })),

  updateCartQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((i) => i.id !== itemId) };
      }
      return {
        cart: state.cart.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
      };
    }),

  clearCart: () => set({ cart: [] }),
}));

// Dashboard UI state
interface DashboardUIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useDashboardUIStore = create<DashboardUIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
