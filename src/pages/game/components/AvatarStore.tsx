import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useGameProgress } from '../../../hooks/useGameProgress';
import { avatarItems, getAllCategories, getCategoryLabel, getItemsByCategory, AvatarItemCategory } from '../../../data/game/avatarItems';
import { CustomizableAvatar } from '../../../components/avatar';
import { PointsDisplay } from './PointsDisplay';
import { StoreItemCard } from './StoreItemCard';
import { Button } from '../../../components/ui/Button';

interface AvatarStoreProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarStore({ isOpen, onClose }: AvatarStoreProps) {
  const {
    progress,
    getAvailablePoints,
    purchaseItem,
    equipItem,
    unequipItem,
    isItemPurchased,
    isItemEquipped,
  } = useGameProgress();

  const [selectedCategory, setSelectedCategory] = useState<AvatarItemCategory>('head');

  const availablePoints = getAvailablePoints();
  const purchasedCount = progress.avatar.purchasedItems.length;
  const totalItems = avatarItems.length;

  const categories = getAllCategories();
  const categoryItems = getItemsByCategory(selectedCategory);

  const handlePurchase = (itemId: string) => {
    const success = purchaseItem(itemId);
    if (success) {
      // Auto-equip after purchase
      equipItem(itemId);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl z-50 flex flex-col overflow-hidden border-2 border-black shadow-xl"
      >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center gap-3">
                <Sparkles className="text-purple-500" size={24} />
                <h2 className="text-xl font-bold">Avatar Store</h2>
              </div>
              <div className="flex items-center gap-4">
                <PointsDisplay points={availablePoints} size="lg" showLabel />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close store"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left side - Avatar Preview */}
              <div className="w-64 border-r-2 border-gray-200 p-6 flex flex-col items-center bg-gray-50">
                <div className="flex-1 flex items-center justify-center">
                  <CustomizableAvatar
                    equippedItems={progress.avatar.equippedItems}
                    size="xl"
                    variant="standing"
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="text-sm text-gray-500">Items Owned</div>
                  <div className="font-bold text-lg">{purchasedCount} / {totalItems}</div>
                </div>
              </div>

              {/* Right side - Store items */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Category Tabs */}
                <div className="flex border-b-2 border-gray-200 bg-white">
                  {categories.map((category) => {
                    const count = getItemsByCategory(category).length;
                    const ownedCount = getItemsByCategory(category).filter(
                      item => progress.avatar.purchasedItems.includes(item.id)
                    ).length;

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          'flex-1 py-3 px-4 font-medium text-sm transition-colors relative',
                          selectedCategory === category
                            ? 'text-[#0066FF] bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        {getCategoryLabel(category)}
                        <span className="ml-1 text-xs text-gray-400">
                          ({ownedCount}/{count})
                        </span>
                        {selectedCategory === category && (
                          <motion.div
                            layoutId="categoryIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryItems.map((item) => (
                      <StoreItemCard
                        key={item.id}
                        item={item}
                        isPurchased={isItemPurchased(item.id)}
                        isEquipped={isItemEquipped(item.id)}
                        canAfford={availablePoints >= item.price}
                        onPurchase={() => handlePurchase(item.id)}
                        onEquip={() => equipItem(item.id)}
                        onUnequip={() => unequipItem(item.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t-2 border-gray-200 bg-gray-50 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {progress.avatar.equippedItems.length} items equipped
                  </div>
                  {progress.avatar.equippedItems.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        progress.avatar.equippedItems.forEach(id => unequipItem(id));
                      }}
                    >
                      Remove All
                    </Button>
                  )}
                </div>
              </div>
            </div>
      </motion.div>
    </>
  );
}
