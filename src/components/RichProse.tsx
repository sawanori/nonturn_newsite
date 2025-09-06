'use client'

export default function RichProse({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg prose-gray max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
        prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-700
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-gray-700 prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 
        prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:italic
        prose-blockquote:text-gray-700
        prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:w-full
        prose-table:my-8 prose-table:w-full prose-table:border-collapse
        prose-thead:bg-gray-50 prose-thead:border-b-2 prose-thead:border-gray-300
        prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
        prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-200
        prose-tbody:divide-y prose-tbody:divide-gray-200
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-a:text-blue-600 prose-a:underline prose-a:font-medium hover:prose-a:text-blue-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}