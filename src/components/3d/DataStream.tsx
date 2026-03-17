'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataStreamProps {
  count?: number
  opacity?: number
}

// データストリーム用の文字テクスチャを生成
function createCharTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, 64, 64)

  // ランダムに0/1またはコード断片を描画
  const chars = ['0', '1', '{', '}', '<', '>', '/', '*', '#', '=', '+', 'λ', '∞', '→']
  const char = chars[Math.floor(Math.random() * chars.length)]

  ctx.font = 'bold 48px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fbbf24' // 黄色（ブランドカラー）
  ctx.fillText(char, 32, 32)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function DataStream({ count = 120, opacity = 0.04 }: DataStreamProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // 各パーティクルの初期状態
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,     // 横方向の広がり
      y: Math.random() * 20 - 10,          // 縦方向の初期位置
      z: (Math.random() - 0.5) * 8 - 2,   // 奥行き
      speed: 0.3 + Math.random() * 0.8,    // 落下速度
      scale: 0.08 + Math.random() * 0.15,  // サイズ
      rotSpeed: (Math.random() - 0.5) * 0.5,
      flickerPhase: Math.random() * Math.PI * 2,
      flickerSpeed: 1 + Math.random() * 2,
    }))
  }, [count])

  // 文字テクスチャ（複数種類）
  const textures = useMemo(() => {
    return Array.from({ length: 8 }, () => createCharTexture())
  }, [])

  // テクスチャアサインメント
  const textureAssignments = useMemo(() => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * textures.length))
  }, [count, textures.length])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    particles.forEach((p, i) => {
      // ゆっくり落下
      p.y -= p.speed * 0.008

      // 画面外に出たらリセット
      if (p.y < -12) {
        p.y = 12
        p.x = (Math.random() - 0.5) * 20
      }

      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(p.scale)
      dummy.rotation.z += p.rotSpeed * 0.002
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    // フレームを要求（demand modeのため）
    state.invalidate()
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={textures[0]}
        transparent
        opacity={opacity}
        color="#fbbf24"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  )
}
