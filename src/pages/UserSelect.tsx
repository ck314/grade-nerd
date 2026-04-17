import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, UserPlus } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/Button';

export function UserSelect() {
  const { users, createUser, deleteUser, setActiveUser } = useUser();
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const sortedUsers = [...users].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  const handleCreate = () => {
    const result = createUser(newName);
    if (result.ok) {
      setActiveUser(newName.trim());
      setNewName('');
      setError('');
    } else {
      setError(result.error || 'Could not create user');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newName.trim()) {
      handleCreate();
    }
  };

  const handleDelete = (username: string) => {
    deleteUser(username);
    setDeletingUser(null);
  };

  return (
    <div className="min-h-screen bg-graph-paper flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-black rounded-lg items-center justify-center text-white mb-3">
            <span className="font-bold text-lg">gn</span>
          </div>
          <h1 className="text-2xl font-bold text-black">Grade Nerd</h1>
          <p className="text-gray-500 text-sm mt-1">Who&apos;s learning today?</p>
        </div>

        {/* User list */}
        {sortedUsers.length > 0 && (
          <div className="bg-white border-2 border-black rounded-xl p-4 mb-4">
            <div className="space-y-2">
              {sortedUsers.map(username => (
                <div key={username.toLowerCase()} className="relative">
                  <AnimatePresence mode="wait">
                    {deletingUser === username ? (
                      <motion.div
                        key="confirm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 border-2 border-red-200 rounded-lg p-3"
                      >
                        <p className="text-red-700 text-sm font-medium mb-2">
                          Delete {username} and all their progress?
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeletingUser(null)}
                          >
                            Cancel
                          </Button>
                          <button
                            onClick={() => handleDelete(username)}
                            className="px-3 py-1.5 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="row"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <button
                          onClick={() => setActiveUser(username)}
                          className="flex-1 text-left px-4 py-3 rounded-lg font-medium text-black hover:bg-gray-50 transition-colors"
                        >
                          {username}
                        </button>
                        <button
                          onClick={() => setDeletingUser(username)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          aria-label={`Delete ${username}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create user */}
        {users.length >= 100 ? (
          <div className="bg-white border-2 border-black rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Maximum 100 users reached</p>
          </div>
        ) : (
          <div className="bg-white border-2 border-black rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <UserPlus size={18} className="text-gray-400" />
              <span className="font-medium text-sm text-gray-600">New user</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={e => {
                  setNewName(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter name"
                maxLength={20}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                autoFocus={sortedUsers.length === 0}
              />
              <Button
                size="sm"
                onClick={handleCreate}
                disabled={!newName.trim()}
              >
                Go
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
