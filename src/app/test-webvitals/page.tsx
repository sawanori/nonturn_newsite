'use client'

import { useState } from 'react'
import { WebVitals } from '@/components/performance/WebVitals'

interface WebVitalsMetric {
  name: string
  value: number
  id: string
  delta: number
  navigationType?: string
  rating?: 'good' | 'needs-improvement' | 'poor'
}

export default function TestWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([])

  const handleMetric = (metric: WebVitalsMetric) => {
    setMetrics(prev => [...prev, metric])
    console.log('Web Vitals Metric:', metric)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <WebVitals onMetric={handleMetric} />
      
      <h1 className="text-3xl font-bold mb-8">Web Vitals Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Open browser DevTools Console to see real-time metrics</li>
          <li>Interact with the page (click, scroll, type)</li>
          <li>Check the metrics table below for captured data</li>
          <li>Metrics will appear as they are measured by the browser</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Expected Metrics:</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><strong>CLS:</strong> Cumulative Layout Shift (&lt; 0.1 is good)</li>
            <li><strong>FCP:</strong> First Contentful Paint (&lt; 1.8s is good)</li>
            <li><strong>FID:</strong> First Input Delay (&lt; 100ms is good)</li>
            <li><strong>LCP:</strong> Largest Contentful Paint (&lt; 2.5s is good)</li>
            <li><strong>TTFB:</strong> Time to First Byte (&lt; 800ms is good)</li>
            <li><strong>FP:</strong> First Paint (custom metric)</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Test Actions:</h3>
          <div className="space-y-2">
            <button 
              className="block w-full bg-yellow-400 text-black p-2 rounded hover:bg-yellow-500 transition-colors"
              onClick={() => console.log('Button clicked')}
            >
              Click for FID measurement
            </button>
            <button 
              className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                // Simulate layout shift
                const div = document.createElement('div')
                div.style.height = '100px'
                div.style.backgroundColor = 'red'
                document.body.appendChild(div)
                setTimeout(() => document.body.removeChild(div), 1000)
              }}
            >
              Trigger Layout Shift (CLS)
            </button>
            <textarea 
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600"
              placeholder="Type here to generate input events..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-600 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Captured Metrics ({metrics.length})</h3>
        
        {metrics.length === 0 ? (
          <p className="text-gray-400 italic">
            No metrics captured yet. Metrics will appear as they are measured...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2">Metric</th>
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Rating</th>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Delta</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2 font-mono">{metric.name}</td>
                    <td className="p-2">
                      {metric.name === 'CLS' 
                        ? metric.value.toFixed(4)
                        : `${Math.round(metric.value)}${metric.name.includes('Paint') || metric.name.includes('TTFB') || metric.name.includes('FID') ? 'ms' : ''}`
                      }
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        metric.rating === 'good' ? 'bg-green-500/20 text-green-400' :
                        metric.rating === 'needs-improvement' ? 'bg-yellow-500/20 text-yellow-400' :
                        metric.rating === 'poor' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {metric.rating || 'unknown'}
                      </span>
                    </td>
                    <td className="p-2 font-mono text-xs text-gray-400">
                      {metric.id.slice(0, 8)}...
                    </td>
                    <td className="p-2 text-gray-400">
                      {metric.delta?.toFixed(2) || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-400">
        <p>
          <strong>Note:</strong> This page demonstrates the web-vitals integration. 
          In production, these metrics would be sent to Google Analytics and your custom analytics endpoint.
        </p>
      </div>

      {/* Add some content to trigger LCP */}
      <div className="mt-16 space-y-8">
        <div className="h-64 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
          <h2 className="text-3xl font-bold text-black">Large Content Element for LCP</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Content Block {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}