import React from 'react';
import { cn } from '../../../lib/utils';
import { AvatarItem } from '../../../data/game/avatarItems';
import { AvatarItemSVG } from '../../../components/avatar';
import { Check, Lock, ShoppingCart } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface StoreItemCardProps {
  item: AvatarItem;
  isPurchased: boolean;
  isEquipped: boolean;
  canAfford: boolean;
  onPurchase: () => void;
  onEquip: () => void;
  onUnequip: () => void;
}

export function StoreItemCard({
  item,
  isPurchased,
  isEquipped,
  canAfford,
  onPurchase,
  onEquip,
  onUnequip,
}: StoreItemCardProps) {
  const isLocked = !isPurchased && !canAfford;

  return (
    <div
      className={cn(
        'relative border-2 rounded-xl p-3 transition-all',
        isEquipped && 'border-green-500 bg-green-50',
        isPurchased && !isEquipped && 'border-blue-300 bg-blue-50',
        !isPurchased && canAfford && 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md',
        isLocked && 'border-gray-200 bg-gray-50 opacity-60'
      )}
    >
      {/* Item Preview */}
      <div className="w-full aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 200" className="w-full h-full">
          {/* Simple head outline for context */}
          <circle cx="50" cy="30" r="20" fill="none" stroke="#ddd" strokeWidth="2" />
          <line x1="50" y1="50" x2="50" y2="120" stroke="#ddd" strokeWidth="2" />
          {/* The item */}
          <AvatarItemSVG itemId={item.id} />
        </svg>

        {/* Status badges */}
        {isEquipped && (
          <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={14} className="text-white" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
            <Lock size={24} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Item Info */}
      <h4 className="font-bold text-sm truncate">{item.name}</h4>
      <p className="text-xs text-gray-500 line-clamp-2 h-8 mb-2">{item.description}</p>

      {/* Price / Status */}
      <div className="flex items-center justify-between">
        {isPurchased ? (
          <span className="text-xs font-medium text-green-600">Owned</span>
        ) : (
          <div className={cn(
            'flex items-center gap-1 text-sm font-bold',
            canAfford ? 'text-amber-600' : 'text-gray-400'
          )}>
            <span>{item.price}</span>
            <span className="text-xs font-normal">pts</span>
          </div>
        )}

        {/* Action Button */}
        {isPurchased ? (
          isEquipped ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onUnequip}
              className="text-xs px-2 py-1 h-auto"
            >
              Remove
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onEquip}
              className="text-xs px-2 py-1 h-auto"
            >
              Equip
            </Button>
          )
        ) : canAfford ? (
          <Button
            size="sm"
            onClick={onPurchase}
            className="text-xs px-2 py-1 h-auto"
          >
            <ShoppingCart size={12} className="mr-1" />
            Buy
          </Button>
        ) : (
          <span className="text-xs text-gray-400">Need {item.price - 0} pts</span>
        )}
      </div>
    </div>
  );
}
