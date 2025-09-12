import type { ChatAPI } from '@/types/chat';
import { MockChatApi, seedMockData } from './mockApi';
import { SupabaseChatApi } from './supabaseApi';

// Seed mock data on initialization
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
  seedMockData();
}

export function getChatApi(): ChatAPI {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  
  if (useMock) {
    console.log('Using Mock Chat API');
    return MockChatApi;
  }
  
  console.log('Using Supabase Chat API');
  return SupabaseChatApi;
}

// Export for direct usage if needed
export { MockChatApi } from './mockApi';
export { SupabaseChatApi } from './supabaseApi';