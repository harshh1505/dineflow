// Mock Supabase Client for local-only static prototype
// This replicates table storage in-memory to keep the frontend UIs interactive and compile-safe.

let restaurants: any[] = [
  {
    id: 'restaurant-1',
    name: 'The Coffee Corner',
    slug: 'the-coffee-corner',
    theme_color: '#FF6B35',
    logo_url: null,
    contact_details: {
      phone: '+1 234 567 8900',
      email: 'hello@coffeecorner.com',
      address: '456 Brew Street, Cafe Hill'
    }
  }
];

let categories: any[] = [
  { id: 'cat-1', restaurant_id: 'restaurant-1', name: 'Coffee', sort_order: 1 },
  { id: 'cat-2', restaurant_id: 'restaurant-1', name: 'Breakfast', sort_order: 2 },
  { id: 'cat-3', restaurant_id: 'restaurant-1', name: 'Desserts', sort_order: 3 }
];

let menuItems: any[] = [
  { id: 'item-1', category_id: 'cat-1', name: 'Cappuccino', description: 'Classic cappuccino with rich espresso & steamed milk', price: 180, image_url: null, food_type: 'VEG', is_bestseller: true, prep_time: 5, is_available: true },
  { id: 'item-2', category_id: 'cat-1', name: 'Latte', description: 'Creamy espresso and steamed milk', price: 190, image_url: null, food_type: 'VEG', is_bestseller: false, prep_time: 5, is_available: true },
  { id: 'item-3', category_id: 'cat-2', name: 'Cheese Sandwich', description: 'Grilled sandwich with cheese & veggies', price: 220, image_url: null, food_type: 'VEG', is_bestseller: true, prep_time: 10, is_available: true },
  { id: 'item-4', category_id: 'cat-3', name: 'Chocolate Brownie', description: 'Warm brownie with chocolate sauce & ice cream', price: 160, image_url: null, food_type: 'VEG', is_bestseller: true, prep_time: 7, is_available: true }
];

let tables: any[] = [
  { id: 'table-1', restaurant_id: 'restaurant-1', number: '1', name: 'Table 1', qr_code_url: null },
  { id: 'table-2', restaurant_id: 'restaurant-1', number: '2', name: 'Table 2', qr_code_url: null }
];

let users: any[] = [
  { id: 'user-1', email: 'owner@coffeecorner.com', password_hash: '$2b$10$Q.D3Sg7q7k5K5/6G2T2dEuV76m1J08G2P/4p8fV9Qy1m2V2d3E4F5', role: 'RESTAURANT_OWNER', restaurant_id: 'restaurant-1' }
];

let subscriptions: any[] = [
  { id: 'sub-1', restaurant_id: 'restaurant-1', plan_type: 'GROWTH', status: 'ACTIVE' }
];

class MockQueryBuilder {
  private table: string;
  private data: any[];
  private currentFilter: (item: any) => boolean = () => true;

  constructor(table: string) {
    this.table = table;
    if (table === 'restaurants') this.data = restaurants;
    else if (table === 'categories') this.data = categories;
    else if (table === 'menu_items') this.data = menuItems;
    else if (table === 'tables') this.data = tables;
    else if (table === 'users') this.data = users;
    else if (table === 'subscriptions') this.data = subscriptions;
    else this.data = [];
  }

  select(fields?: string, options?: any) {
    return this;
  }

  eq(field: string, value: any) {
    const prevFilter = this.currentFilter;
    if (field === 'slug' && this.table === 'restaurants') {
      this.currentFilter = (item) => prevFilter(item) && item.slug === value;
    } else if (field === 'restaurant_id') {
      this.currentFilter = (item) => prevFilter(item) && item.restaurant_id === value;
    } else if (field === 'id') {
      this.currentFilter = (item) => prevFilter(item) && item.id === value;
    } else if (field === 'email') {
      this.currentFilter = (item) => prevFilter(item) && item.email === value;
    } else if (field === 'category_id') {
      this.currentFilter = (item) => prevFilter(item) && item.category_id === value;
    }
    return this;
  }

  in(field: string, values: any[]) {
    const prevFilter = this.currentFilter;
    if (field === 'category_id') {
      this.currentFilter = (item) => prevFilter(item) && values.includes(item.category_id);
    }
    return this;
  }

  order(field: string, options?: any) {
    return this;
  }

  async maybeSingle() {
    const filtered = this.data.filter(this.currentFilter);
    const item = filtered[0] || null;
    if (item && this.table === 'restaurants') {
      return { data: { ...item, categories: categories.filter(c => c.restaurant_id === item.id) } };
    }
    return { data: item };
  }

  async single() {
    const filtered = this.data.filter(this.currentFilter);
    const item = filtered[0] || null;
    return { data: item };
  }

  async then(resolve: any) {
    const filtered = this.data.filter(this.currentFilter);
    return resolve({ data: filtered });
  }

  insert(record: any) {
    const newRecord = { id: `${this.table}-${Date.now()}`, ...record };
    if (this.table === 'categories') categories.push(newRecord);
    else if (this.table === 'menu_items') menuItems.push(newRecord);
    else if (this.table === 'tables') tables.push(newRecord);
    else if (this.table === 'restaurants') restaurants.push(newRecord);
    else if (this.table === 'users') users.push(newRecord);
    
    return {
      select: () => {
        return {
          single: async () => ({ data: newRecord }),
          then: async (resolve: any) => resolve({ data: newRecord })
        };
      }
    };
  }

  update(record: any) {
    return {
      eq: (field: string, value: any) => {
        const index = this.data.findIndex(item => item[field] === value);
        let updatedRecord = null;
        if (index !== -1) {
          this.data[index] = { ...this.data[index], ...record };
          updatedRecord = this.data[index];
        }
        return {
          select: () => {
            return {
              single: async () => ({ data: updatedRecord }),
              then: async (resolve: any) => resolve({ data: updatedRecord })
            };
          },
          then: async (resolve: any) => resolve({ data: updatedRecord })
        };
      }
    };
  }

  delete() {
    return {
      eq: (field: string, value: any) => {
        if (this.table === 'categories') {
          categories = categories.filter(item => item.id !== value);
        } else if (this.table === 'menu_items') {
          menuItems = menuItems.filter(item => item.id !== value);
        } else if (this.table === 'tables') {
          tables = tables.filter(item => item.id !== value);
        }
        return {
          then: async (resolve: any) => resolve({ error: null })
        };
      }
    };
  }
}

export const supabase = {
  from: (table: string) => {
    return new MockQueryBuilder(table);
  }
} as any;
