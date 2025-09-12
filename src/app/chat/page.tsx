'use client';

import ChatWidget from '@/components/chat/ChatWidget';
import { useState } from 'react';

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {!isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">チャットが閉じられました</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              チャットを再開する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}