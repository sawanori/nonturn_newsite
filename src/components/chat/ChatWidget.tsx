'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getChatApi } from '@/lib/chat';
import type { Message } from '@/types/chat';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useToast } from '@/lib/ui/toast';

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Quick reply suggestions
const QUICK_REPLIES = [
  '料金について教えてください',
  '撮影の流れを知りたい',
  '納期はどのくらいですか？',
  '見積もりをお願いします'
];

export default function ChatWidget({ isOpen: controlledIsOpen, onClose }: ChatWidgetProps = {}) {
  const api = getChatApi();
  const toast = useToast();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
  const [showContactForm, setShowContactForm] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const focusTrapRef = useFocusTrap(isOpen);
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [onClose]);

  // Initialize conversation when widget opens
  useEffect(() => {
    if (isOpen && !conversationId) {
      initializeChat();
    }
  }, [isOpen]);

  // Set up global chat opener
  useEffect(() => {
    const handleOpenChat = () => {
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(true);
      }
    };

    // Listen for clicks on elements with data-chat-open attribute
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-chat-open]')) {
        e.preventDefault();
        handleOpenChat();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [controlledIsOpen]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = async () => {
    try {
      console.log('Initializing chat...');
      setIsLoading(true);
      const { conversationId } = await api.start();
      console.log('Got conversation ID:', conversationId);
      setConversationId(conversationId);
      const msgs = await api.getMessages(conversationId);
      console.log('Got messages during initialization:', msgs);
      setMessages(msgs);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      toast.error('チャットの初期化に失敗しました。ページを更新してください。', 'chat-init-error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || !conversationId || isLoading) return;

    setInputText('');
    setIsLoading(true);
    setHasInteracted(true);

    try {
      await api.sendMessage({ conversationId, text: messageText });
      const updatedMessages = await api.getMessages(conversationId);
      console.log('Setting messages in state:', updatedMessages);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputText(messageText); // Restore input on error
      toast.error('メッセージの送信に失敗しました。もう一度お試しください。', 'send-error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const updateContactInfo = async () => {
    if (!conversationId) return;
    
    try {
      await api.updateContact({
        conversationId,
        name: contactInfo.name,
        email: contactInfo.email,
      });
      setShowContactForm(false);
      toast.success('連絡先を登録しました');
    } catch (error) {
      console.error('Failed to update contact info:', error);
      toast.error('連絡先の登録に失敗しました', 'contact-error');
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={handleClose}
            />
            
            {/* Chat Window */}
            <motion.div
              ref={focusTrapRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-96 md:max-w-[calc(100vw-3rem)] bg-white md:rounded-2xl shadow-2xl overflow-hidden h-screen md:h-[600px] max-h-screen md:max-h-[calc(100vh-6rem)] flex flex-col"
              role="dialog"
              aria-label="チャットウィンドウ"
              aria-modal="true"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">飲食店撮影PhotoStudio</h3>
                  <p className="text-xs opacity-90">お気軽にご相談ください</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors bg-white/10"
                aria-label="チャットを閉じる"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Content Container */}
            <div className="flex flex-col flex-1" style={{ minHeight: 0 }}>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0, maxHeight: '400px' }} role="log" aria-live="polite">
                {isLoading && messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                              : message.role === 'system'
                              ? 'bg-gray-100 text-gray-700 italic'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Quick Replies - Show only at the start */}
              {!hasInteracted && messages.length <= 1 && (
                <div className="px-4 py-3 border-t bg-gray-50 flex-shrink-0">
                  <p className="text-xs text-gray-600 mb-2">よくあるご質問：</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_REPLIES.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full hover:bg-orange-50 hover:border-orange-300 transition-colors"
                        disabled={isLoading}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info Button */}
              {conversationId && !contactInfo.email && !showContactForm && (
                <div className="px-4 py-2 border-t bg-white flex-shrink-0">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    連絡先を登録する（任意）
                  </button>
                </div>
              )}

              {/* Contact Form */}
              <AnimatePresence>
                {showContactForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 py-3 bg-gray-50 border-t flex-shrink-0 overflow-y-auto max-h-48"
                  >
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="お名前（任意）"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="email"
                        placeholder="メールアドレス（任意）"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={updateContactInfo}
                          className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          登録
                        </button>
                        <button
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div className="p-3 border-t bg-white flex-shrink-0">
                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="text-xs text-gray-500 mb-2">
                    Debug: conversationId={conversationId || 'null'}, isLoading={isLoading.toString()}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="メッセージを入力..."
                    disabled={isLoading || !conversationId}
                    className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                    aria-label="メッセージ入力"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !inputText.trim() || !conversationId}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="送信"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
            
            {/* Floating Close Button (always visible) */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={handleClose}
              className="fixed top-4 right-4 md:hidden z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="チャットを閉じる"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}