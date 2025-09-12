'use client';

import { useState, useRef, KeyboardEvent } from 'react';

interface ReplyBoxProps {
  conversationId: string;
  onMessageSent?: () => void;
}

export function ReplyBox({ conversationId, onMessageSent }: ReplyBoxProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function sendReply() {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          content: text.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to send reply');
      }

      setText('');
      if (onMessageSent) {
        onMessageSent();
      }
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert(error instanceof Error ? error.message : '返信の送信に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  }

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="返信を入力... (Shift+Enterで改行)"
            disabled={isLoading}
            rows={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            style={{ minHeight: '40px', maxHeight: '150px' }}
          />
        </div>
        <button
          onClick={sendReply}
          disabled={isLoading || !text.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            '送信'
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Shift+Enterで改行、Enterで送信
      </p>
    </div>
  );
}