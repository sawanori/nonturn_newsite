'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MainLayout } from '@/components/layout/MainLayout'
import { ArrowLeft, Clock, Users, Tag } from 'lucide-react'

interface CaseStudyProject {
  id: string
  title: string
  subtitle: string
  category: string
  industry: string
  year: string
  client: string
  description: string
  detailedDescription: string
  tags: string[]
  videoUrl: string
  thumbnailUrl: string
  gradient: string
  technologies: string[]
  duration: string
  deliverables: string[]
  results: Record<string, string | undefined>
  testimonial: { text: string; author: string }
  caseStudy?: { challenge: string; approach: string; result: string }
}

export function CaseStudyClient({ project }: { project: CaseStudyProject }) {
  // Extract video embed URL
  const getEmbedUrl = (url: string) => {
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    const vimeoMatch = url.match(/vimeo\.com\/(?:manage\/videos\/)?(\d+)/)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    return null
  }

  const embedUrl = getEmbedUrl(project.videoUrl)

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        {/* Back Navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>制作実績一覧に戻る</span>
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-medium rounded-full">
                {project.industry}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {project.year}
              </span>
              {project.duration && (
                <span className="text-gray-400 text-sm">{project.duration}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              {project.client}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {project.subtitle} — {project.description}
            </p>
          </motion.div>

          {/* Video Embed */}
          {embedUrl && (
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-700/50 mb-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          )}
        </section>

        {/* Case Study */}
        {project.caseStudy && (
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl font-bold text-white mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ケーススタディ
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: '課題', content: project.caseStudy.challenge, color: 'red' },
                  { label: 'アプローチ', content: project.caseStudy.approach, color: 'yellow' },
                  { label: '成果', content: project.caseStudy.result, color: 'green' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                      item.color === 'red' ? 'text-red-400' :
                      item.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {item.label}
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Details */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">プロジェクト概要</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{project.detailedDescription}</p>

                <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> 使用技術
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3">
                  納品物
                </h4>
                <ul className="space-y-2">
                  {project.deliverables.map(d => (
                    <li key={d} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results + Testimonial */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">成果</h3>
                <div className="space-y-4 mb-8">
                  {Object.entries(project.results).filter(([, v]) => v != null).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span className="text-yellow-400 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                {project.testimonial && (
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                    <Users className="w-5 h-5 text-yellow-400 mb-3" />
                    <blockquote className="text-gray-300 italic leading-relaxed mb-3">
                      &ldquo;{project.testimonial.text}&rdquo;
                    </blockquote>
                    <cite className="text-sm text-gray-400 not-italic">
                      — {project.testimonial.author}
                    </cite>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              同様のプロジェクトをお考えですか？
            </h2>
            <p className="text-gray-400 mb-8">
              まずは無料でご相談ください。貴社に最適なクリエイティブをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 font-medium text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 inline-block"
              >
                無料相談を予約する
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-gray-600 text-gray-300 px-8 py-4 font-medium text-lg rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 inline-block"
              >
                他の事例を見る
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
