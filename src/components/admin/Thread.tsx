'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReplyBox } from './ReplyBox';
import type { Message, Conversation } from '@/types/chat';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { MockChatApi } from '@/lib/chat/mockApi';

interface ThreadProps {
  conversationId: string;
}

export function Thread({ conversationId }: ThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversation();
    fetchMessages();

    // Set up realtime subscription for messages
    const channel = supabase
      .channel(`thread-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchConversation() {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (!error && data) {
        setConversation(data);
      } else {
        // Fall back to mock data
        const mockConversations = await MockChatApi.listConversations();
        const mockConv = mockConversations.find(c => c.id === conversationId);
        if (mockConv) {
          setConversation(mockConv);
        }
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
      // Fall back to mock data
      const mockConversations = await MockChatApi.listConversations();
      const mockConv = mockConversations.find(c => c.id === conversationId);
      if (mockConv) {
        setConversation(mockConv);
      }
    }
  }

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        setMessages(data);
      } else {
        // Fall back to mock data
        const mockMessages = await MockChatApi.getMessages(conversationId);
        setMessages(mockMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Fall back to mock data
      const mockMessages = await MockChatApi.getMessages(conversationId);
      setMessages(mockMessages);
    } finally {
      setIsLoading(false);
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  async function toggleStatus() {
    if (!conversation) return;

    const newStatus = conversation.status === 'open' ? 'closed' : 'open';
    
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ status: newStatus })
        .eq('id', conversationId);

      if (error) {
        console.error('Failed to update status:', error);
        return;
      }

      setConversation({ ...conversation, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {conversation?.contact_name || '（名前未設定）'}
            </h3>
            {conversation?.contact_email && (
              <p className="text-sm text-gray-500">{conversation.contact_email}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              conversation?.status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {conversation?.status === 'open' ? '未対応' : '対応済み'}
            </span>
            <button
              onClick={toggleStatus}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {conversation?.status === 'open' ? 'クローズ' : '再開'}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>メッセージがありません</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'agent' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`max-w-[70%] ${
                  message.role === 'agent' ? 'order-2' : ''
                }`}>
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.role === 'agent'
                        ? 'bg-blue-500 text-white'
                        : message.role === 'system'
                        ? 'bg-gray-200 text-gray-700 italic'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {/* Metadata */}
                  <div className={`mt-1 text-xs text-gray-500 ${
                    message.role === 'agent' ? 'text-right' : ''
                  }`}>
                    <span>{formatTime(message.created_at)}</span>
                    {message.source && (
                      <span className="ml-2">
                        {message.source === 'web' ? 'Web' : 
                         message.source === 'admin' ? '管理画面' : 'LINE'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Reply Box */}
      {conversation?.status === 'open' && (
        <ReplyBox 
          conversationId={conversationId}
          onMessageSent={scrollToBottom}
        />
      )}
    </div>
  );
}