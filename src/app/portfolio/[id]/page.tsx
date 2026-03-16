import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { portfolioProjects, getProjectById } from '@/data/portfolio'
import { CaseStudyClient } from './CaseStudyClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return portfolioProjects
    .filter(p => p.category === 'movie' && p.caseStudy)
    .map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    return { title: 'プロジェクトが見つかりません' }
  }

  const title = `${project.client} - ${project.subtitle || project.category} | 制作実績`
  const description = project.detailedDescription || project.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://non-turn.com/portfolio/${project.id}`,
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project || !('caseStudy' in project) || !project.caseStudy) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.client} - ${project.subtitle || project.category}`,
    description: project.detailedDescription || project.description,
    author: {
      '@type': 'Organization',
      name: 'NonTurn合同会社',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NonTurn合同会社',
      url: 'https://non-turn.com',
    },
    datePublished: `${project.year}-01-01`,
    image: project.thumbnailUrl,
    mainEntityOfPage: `https://non-turn.com/portfolio/${project.id}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CaseStudyClient project={project} />
    </>
  )
}
