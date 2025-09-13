'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
  loading: () => null
});

export default function LazyChat() {
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}