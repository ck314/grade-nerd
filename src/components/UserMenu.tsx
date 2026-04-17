import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, RotateCcw } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function UserMenu() {
  const { activeUser, clearActiveUser, resetActiveUserProgress } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowResetConfirm(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  if (!activeUser) return null;

  return (
    <div ref={menuRef} className="fixed top-4 right-16 z-50">
      {/* Pill / badge */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setShowResetConfirm(false);
        }}
        className="bg-white border-2 border-black rounded-full px-3 py-1.5 font-medium text-sm cursor-pointer hover:bg-gray-50 shadow-sm"
      >
        {activeUser}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden"
          >
            {showResetConfirm ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-red-700 font-medium text-sm mb-3">
                  Reset all progress? This cannot be undone.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      resetActiveUserProgress();
                      setIsOpen(false);
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-1">
                <button
                  onClick={() => {
                    clearActiveUser();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={16} />
                  Switch User
                </button>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset Progress
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
