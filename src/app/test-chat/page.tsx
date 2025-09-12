'use client';

import ChatWidget from '@/components/chat/ChatWidget';
import { useState } from 'react';

export default function TestChatPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Chat Widget Test Page</h1>
      
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Chat
      </button>

      <div className="mt-4 p-4 bg-white rounded shadow">
        <h2 className="font-bold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Click &quot;Open Chat&quot; to open the chat widget</li>
          <li>Send a message</li>
          <li>Check if messages display correctly</li>
          <li>Close and reopen to test persistence</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-white rounded shadow">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <p>Chat is: {isOpen ? 'OPEN' : 'CLOSED'}</p>
        <p>Check browser console for detailed logs</p>
      </div>

      <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}