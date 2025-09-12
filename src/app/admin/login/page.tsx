'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { MockAuthApi, MOCK_ADMIN_CREDENTIALS } from '@/lib/chat/mockApi';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // First try Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        router.push('/admin/inbox');
        return;
      }

      // If Supabase fails, try mock authentication
      const mockResult = await MockAuthApi.signIn(email, password);
      
      if (mockResult.success && mockResult.session) {
        // Store mock session in localStorage for demo purposes
        localStorage.setItem('mockAdminSession', mockResult.session);
        router.push('/admin/inbox');
      } else {
        setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Try mock authentication as fallback
      const mockResult = await MockAuthApi.signIn(email, password);
      
      if (mockResult.success && mockResult.session) {
        localStorage.setItem('mockAdminSession', mockResult.session);
        router.push('/admin/inbox');
      } else {
        setError('予期しないエラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            管理画面ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            飲食店撮影PhotoStudio チャット管理
          </p>
          {/* Mock credentials hint for demo */}
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>デモ用ログイン情報:</strong><br />
              メール: {MOCK_ADMIN_CREDENTIALS.email}<br />
              パスワード: {MOCK_ADMIN_CREDENTIALS.password}
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'ログイン'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}