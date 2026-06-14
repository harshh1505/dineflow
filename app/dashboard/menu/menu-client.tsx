'use client';

import { useState, useTransition } from 'react';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit,
  Search,
  Check,
  X,
  Loader2,
  UtensilsCrossed,
  Sparkles,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  sortCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemAvailability
} from '@/app/actions/menu';

interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  foodType: 'VEG' | 'NON_VEG' | 'JAIN';
  isBestseller: boolean;
  prepTime: number;
}

interface Props {
  initialCategories: Category[];
  initialMenuItems: MenuItem[];
  restaurantId: string;
}

export default function MenuManagerClient({
  initialCategories,
  initialMenuItems,
  restaurantId,
}: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isPending, startTransition] = useTransition();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedDietFilter, setSelectedDietFilter] = useState<'ALL' | 'VEG' | 'NON_VEG' | 'JAIN'>('ALL');

  // Modal / Form States
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCatName, setNewCatName] = useState('');

  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  // CATEGORY OPERATIONS
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setError(null);
    startTransition(async () => {
      let res: any;
      if (editingCategory) {
        res = await updateCategory(editingCategory.id, newCatName);
        if (res.success && res.category) {
          setCategories(prev =>
            prev.map(c => (c.id === editingCategory.id ? (res.category as Category) : c))
          );
          setShowCatModal(false);
        }
      } else {
        res = await createCategory(newCatName, restaurantId);
        if (res.success && res.category) {
          setCategories(prev => [...prev, res.category as Category]);
          setShowCatModal(false);
        }
      }
      if (res.error) {
        setError(res.error);
      } else {
        setNewCatName('');
        setEditingCategory(null);
      }
    });
  };

  const handleDeleteCat = async (catId: string) => {
    if (!confirm('Are you sure you want to delete this category? All items inside will also be deleted.')) return;
    setError(null);
    startTransition(async () => {
      const res = await deleteCategory(catId);
      if (res.success) {
        setCategories(prev => prev.filter(c => c.id !== catId));
        setMenuItems(prev => prev.filter(i => i.categoryId !== catId));
      } else {
        setError(res.error || 'Failed to delete category');
      }
    });
  };

  const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Instantly set state
    setCategories(updated);

    startTransition(async () => {
      const orderedIds = updated.map(c => c.id);
      const res = await sortCategories(restaurantId, orderedIds);
      if (res.error) {
        setError(res.error);
        // revert
        setCategories(categories);
      }
    });
  };

  // MENU ITEM OPERATIONS
  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res: any;
      if (editingItem) {
        res = await updateMenuItem(editingItem.id, restaurantId, formData);
        if (res.success && res.menuItem) {
          setMenuItems(prev =>
            prev.map(i => (i.id === editingItem.id ? (res.menuItem as MenuItem) : i))
          );
          setShowItemModal(false);
        }
      } else {
        res = await createMenuItem(restaurantId, formData);
        if (res.success && res.menuItem) {
          setMenuItems(prev => [res.menuItem as MenuItem, ...prev]);
          setShowItemModal(false);
        }
      }

      if (res?.error) {
        setError(res.error);
      } else {
        setEditingItem(null);
        setImagePreview(null);
      }
    });
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    setError(null);
    startTransition(async () => {
      const res = await deleteMenuItem(itemId, restaurantId);
      if (res.success) {
        setMenuItems(prev => prev.filter(i => i.id !== itemId));
      } else {
        setError(res.error || 'Failed to delete item.');
      }
    });
  };

  const handleToggleStock = async (itemId: string, currentAvailable: boolean) => {
    startTransition(async () => {
      const targetState = !currentAvailable;
      setMenuItems(prev =>
        prev.map(i => (i.id === itemId ? { ...i, isAvailable: targetState } : i))
      );
      const res = await toggleItemAvailability(itemId, targetState, restaurantId);
      if (res.error) {
        setError(res.error);
        // revert
        setMenuItems(prev =>
          prev.map(i => (i.id === itemId ? { ...i, isAvailable: currentAvailable } : i))
        );
      }
    });
  };

  // Filtering Logic
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategoryFilter === 'ALL' || item.categoryId === selectedCategoryFilter;
    
    const matchesDiet = selectedDietFilter === 'ALL' || item.foodType === selectedDietFilter;

    return matchesSearch && matchesCategory && matchesDiet;
  });

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Category Manager Side */}
      <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Categories</h2>
          <button
            onClick={() => {
              setEditingCategory(null);
              setNewCatName('');
              setShowCatModal(true);
            }}
            className="inline-flex items-center gap-1 bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {error && !showItemModal && !showCatModal && (
          <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium">
            <span className="w-1 h-1 bg-rose-600 rounded-full shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1">
          {categories.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-medium border border-dashed border-[#EAEAEA] rounded-lg">
              No categories created yet
            </div>
          ) : (
            categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="flex items-center justify-between bg-white border border-[#EAEAEA] p-3 rounded-lg hover:border-slate-300 transition-colors"
              >
                <span className="font-bold text-xs text-[#111827]">{cat.name}</span>
                
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={idx === 0 || isPending}
                    onClick={() => handleMoveCategory(idx, 'up')}
                    className="p-1 rounded bg-[#FAFAFA] text-slate-500 hover:text-[#111827] border border-[#EAEAEA] disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === categories.length - 1 || isPending}
                    onClick={() => handleMoveCategory(idx, 'down')}
                    className="p-1 rounded bg-[#FAFAFA] text-slate-500 hover:text-[#111827] border border-[#EAEAEA] disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setNewCatName(cat.name);
                      setShowCatModal(true);
                    }}
                    className="p-1 rounded bg-[#FAFAFA] text-slate-500 hover:text-[#F97316] border border-[#EAEAEA]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteCat(cat.id)}
                    className="p-1 rounded bg-[#FAFAFA] text-slate-500 hover:text-rose-600 border border-[#EAEAEA]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Menu Items Manager Panel */}
      <div className="lg:col-span-2 bg-white border border-[#EAEAEA] rounded-xl p-6 flex flex-col justify-between">
        <div>
          {/* Menu Items Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Menu Items ({filteredItems.length})</h2>
            <button
              onClick={() => {
                setEditingItem(null);
                setImagePreview(null);
                setShowItemModal(true);
              }}
              disabled={categories.length === 0}
              className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#ea580c] disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Menu Item
            </button>
          </div>

          {/* Search & Filters */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-450">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search name, description..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-9 pr-3 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={e => setSelectedCategoryFilter(e.target.value)}
              className="bg-white border border-[#EAEAEA] rounded-lg px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Diet Filter */}
            <select
              value={selectedDietFilter}
              onChange={e => setSelectedDietFilter(e.target.value as any)}
              className="bg-white border border-[#EAEAEA] rounded-lg px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="ALL">All Types</option>
              <option value="VEG">Vegetarian Only</option>
              <option value="NON_VEG">Non-Vegetarian Only</option>
              <option value="JAIN">Jain Menu Only</option>
            </select>
          </div>

          {/* Menu Items List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-medium border border-dashed border-[#EAEAEA] rounded-lg flex flex-col items-center justify-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-slate-350" />
                No matching menu items found.
              </div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EAEAEA] p-4 rounded-lg hover:border-slate-350 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-[#EAEAEA] shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center text-slate-450 shrink-0">
                        <UtensilsCrossed className="w-5 h-5 text-slate-450" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Food Type Flag */}
                        <span
                          className={`w-3 h-3 rounded flex items-center justify-center shrink-0 border ${
                            item.foodType === 'VEG'
                              ? 'border-emerald-450 bg-emerald-50 text-emerald-600'
                              : item.foodType === 'NON_VEG'
                              ? 'border-rose-450 bg-rose-50 text-rose-600'
                              : 'border-amber-450 bg-amber-50 text-amber-600'
                          }`}
                          title={item.foodType}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                        </span>

                        <h3 className="font-bold text-xs text-[#111827]">{item.name}</h3>

                        {item.isBestseller && (
                          <span className="bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-2 py-0.5 text-[9px] font-bold inline-flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Bestseller
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-[10px] text-slate-500 font-medium line-clamp-2 max-w-sm">{item.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold mt-1">
                        <span className="text-[#111827] font-bold">${item.price.toFixed(2)}</span>
                        <span className="flex items-center gap-0.5 font-medium"><Clock className="w-3 h-3" /> {item.prepTime} mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t border-[#EAEAEA] pt-3 sm:border-none sm:pt-0 shrink-0">
                    {/* Availability Switch */}
                    <button
                      onClick={() => handleToggleStock(item.id, item.isAvailable)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/50'
                          : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/50'
                      }`}
                    >
                      {item.isAvailable ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Instock
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Out of Stock
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setImagePreview(item.imageUrl);
                          setShowItemModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-white border border-[#EAEAEA] hover:border-slate-350 text-slate-500 hover:text-[#111827]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg bg-white border border-[#EAEAEA] hover:border-rose-200 text-slate-500 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY MODAL */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-md rounded-xl p-6 shadow-md relative">
            <button
              onClick={() => setShowCatModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white text-slate-400 hover:text-[#111827] border border-[#EAEAEA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-6">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </h3>

            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-650 text-xs p-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
                  placeholder="e.g. Starters, Main Course, Drinks"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Category'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ITEM MODAL */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-lg rounded-xl p-6 shadow-md relative my-8">
            <button
              onClick={() => {
                setShowItemModal(false);
                setEditingItem(null);
                setImagePreview(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white text-slate-400 hover:text-[#111827] border border-[#EAEAEA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-6">
              {editingItem ? 'Edit Menu Item' : 'Create Menu Item'}
            </h3>

            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-650 text-xs p-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    required
                    defaultValue={editingItem?.categoryId || categories[0]?.id}
                    className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] font-medium focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingItem?.name || ''}
                    className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
                    placeholder="e.g. Crispy Garlic Bread"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ''}
                  rows={2}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
                  placeholder="Describe your dish (ingredients, spice level, allergen details)"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    defaultValue={editingItem?.price || ''}
                    className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
                    placeholder="9.99"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Type *
                  </label>
                  <select
                    name="foodType"
                    required
                    defaultValue={editingItem?.foodType || 'VEG'}
                    className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] font-medium focus:outline-none"
                  >
                    <option value="VEG">Veg (Green)</option>
                    <option value="NON_VEG">Non-Veg (Red)</option>
                    <option value="JAIN">Jain (Amber)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    name="prepTime"
                    defaultValue={editingItem?.prepTime || 15}
                    className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
                    placeholder="15"
                  />
                </div>
              </div>

              {/* Switches / Toggles */}
              <div className="flex flex-wrap gap-6 bg-[#FAFAFA] p-4 rounded-lg border border-[#EAEAEA]">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBestseller"
                    value="true"
                    defaultChecked={editingItem?.isBestseller || false}
                    className="rounded text-[#F97316] focus:ring-[#F97316] w-4 h-4 bg-white border-[#EAEAEA]"
                  />
                  Mark as Bestseller
                </label>

                {editingItem && (
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      value="true"
                      defaultChecked={editingItem?.isAvailable}
                      className="rounded text-[#F97316] focus:ring-[#F97316] w-4 h-4 bg-white border-[#EAEAEA]"
                    />
                    Item In Stock
                  </label>
                )}
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Item Image (PNG or JPG)
                </label>
                <div className="flex items-center gap-4 bg-[#FAFAFA] p-3 rounded-lg border border-[#EAEAEA]">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border file:border-[#EAEAEA] file:text-xs file:font-semibold file:bg-white file:text-slate-700 file:cursor-pointer hover:file:bg-[#FAFAFA]"
                  />

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-md object-cover border border-[#EAEAEA] shrink-0"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Menu Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
