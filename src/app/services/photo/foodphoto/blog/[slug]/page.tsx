import { getPostBySlug, getAllPosts, getLatestPosts } from '@/lib/mock'
import RichProse from '@/components/RichProse'
import PostCard from '@/components/PostCard'
import Badge from '@/components/Badge'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const post = getPostBySlug(resolvedParams.slug)
  const base = 'https://foodphoto-pro.com'
  const url = `${base}/blog/${resolvedParams.slug}`
  
  if (!post) {
    return {
      title: '記事が見つかりません｜飲食店撮影PhotoStudio',
    }
  }

  const title = `${post.title}｜飲食店撮影PhotoStudio`
  const description = post.excerpt || '飲食店撮影の実践知を発信'
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author_name || 'PhotoStudio'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// JSON-LD用ユーティリティ関数（nullを出さない安全整形）
function articleJsonLd(post: any, url: string) {
  const obj: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: [{ 
      "@type": "Person", 
      name: post.author_name || "PhotoStudio" 
    }],
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "飲食店撮影PhotoStudio",
      logo: {
        "@type": "ImageObject",
        url: "https://foodphoto-pro.com/logo.png"
      }
    }
  }
  if (post.cover_image_url) {
    obj.image = [post.cover_image_url]
  }
  if (post.category?.name) {
    obj.articleSection = post.category.name
  }
  if (post.excerpt) {
    obj.description = post.excerpt
  }
  return obj
}

function breadcrumbJsonLd(post: any, url: string, base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { 
        "@type": "ListItem", 
        position: 1, 
        name: "ホーム", 
        item: base 
      },
      { 
        "@type": "ListItem", 
        position: 2, 
        name: "ブログ", 
        item: `${base}/blog` 
      },
      { 
        "@type": "ListItem", 
        position: 3, 
        name: post.title, 
        item: url 
      }
    ]
  }
}

export default async function BlogDetail({ params }: Props) {
  const resolvedParams = await Promise.resolve(params)
  const post = getPostBySlug(resolvedParams.slug)
  const base = 'https://foodphoto-pro.com'
  const url = `${base}/blog/${resolvedParams.slug}`
  
  if (!post) {
    notFound()
  }

  // Get related posts (latest 3 posts excluding current)
  const relatedPosts = getLatestPosts(4).filter(p => p.id !== post.id).slice(0, 3)

  return (
    <article className="min-h-screen bg-white">
      {/* 構造化データ：Article */}
      <Script 
        id="ld-article" 
        type="application/ld+json" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post, url))
        }}
      />
      {/* 構造化データ：BreadcrumbList */}
      <Script 
        id="ld-breadcrumb" 
        type="application/ld+json" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(post, url, base))
        }}
      />
      {/* Header with breadcrumb */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center text-sm mb-4 opacity-90">
            <Link href="https://foodphoto-pro.com" className="hover:underline">
              飲食店撮影PhotoStudio
            </Link>
            <span className="mx-2">/</span>
            <Link href="https://foodphoto-pro.com/blog" className="hover:underline">
              ブログ
            </Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            {post.category && (
              <Badge>{post.category.name}</Badge>
            )}
            <time className="text-sm text-gray-500 font-medium">
              {new Date(post.published_at).toLocaleDateString("ja-JP", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-orange-400 pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="relative aspect-[16/9] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="mb-16">
          <RichProse html={post.content_html} />
        </div>

        {/* Share Buttons */}
        <div className="border-t border-b border-gray-200 py-6 mb-12">
          <p className="text-sm text-gray-600 mb-3">この記事をシェア</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://foodphoto-pro.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              X (Twitter)
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://foodphoto-pro.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Facebook
            </a>
            <a
              href={`https://line.me/R/msg/text/?${encodeURIComponent(post.title + ' https://foodphoto-pro.com/blog/' + post.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              LINE
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-16 border border-orange-200">
          <h3 className="text-xl font-bold mb-3 text-gray-900">
            飲食店撮影のご依頼はお気軽に
          </h3>
          <p className="text-gray-700 mb-6">
            東京・横浜・千葉エリアで出張撮影承ります。申し込みフォームから。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="https://foodphoto-pro.com/form"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              撮影日程を打診する
            </Link>
            <Link
              href="https://foodphoto-pro.com#pricing"
              className="inline-block px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors text-center"
            >
              料金プランを見る
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">関連記事</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}