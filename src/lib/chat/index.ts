import type { ChatAPI } from '@/types/chat';
import { MockChatApi, seedMockData } from './mockApi';

// Seed mock data on initialization
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
  seedMockData();
}

// Real API implementation (to be implemented)
// import { RealChatApi } from './realApi';

export function getChatApi(): ChatAPI {
  // For now, always return mock API when USE_MOCK is true
  // Later we'll implement the real API and switch based on the flag
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  
  if (useMock) {
    return MockChatApi;
  }
  
  // TODO: Return RealChatApi when implemented
  return MockChatApi;
}

// Export for direct usage if needed
export { MockChatApi } from './mockApi';