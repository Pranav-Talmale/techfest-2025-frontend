import { forwardRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface SpaceshipProps {
  turbo?: number
}

const Spaceship = forwardRef<THREE.Group, SpaceshipProps>(({ turbo = 0 }, ref) => {
  const { scene, nodes, materials } = useGLTF('/textured_x-wing_low_poly.glb')

  // Mobile detection
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  }, [])

  // Optimize materials for mobile
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.Material) {
        // Basic material settings
        material.transparent = false
        material.depthWrite = true
        material.side = THREE.FrontSide
        
        // Mobile optimizations
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 1.5 // Increased for better reflections
          material.metalness = 0.8 // Slightly reduced metalness
          material.roughness = 0.2 // Reduced roughness for better reflections
          material.flatShading = true // Disable flat shading for smoother look
        }
        
        // Ensure high quality
        material.precision = 'highp'
        material.needsUpdate = true
      }
    })

    // Optimize geometries if needed
    Object.values(nodes).forEach((node) => {
      if (node instanceof THREE.Mesh && node.geometry) {
        node.geometry.computeVertexNormals() // Ensure smooth normals
      }
    })
  }, [materials, nodes])

  useFrame((state) => {
    const group = (ref as React.RefObject<THREE.Group>)?.current
    if (!group) return
    const time = state.clock.elapsedTime
    group.position.y = Math.sin(time) * 0.1
    group.rotation.z = Math.sin(time * 0.5) * 0.05

    if (turbo > 0) {
      group.rotation.z += Math.sin(time * 8) * 0.02
    }
  })

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((mat) => {
        if (mat instanceof THREE.Material) mat.dispose()
      })
      Object.values(nodes).forEach((node) => {
        if (node instanceof THREE.Mesh && node.geometry) node.geometry.dispose()
      })
    }
  }, [materials, nodes])

  const groupProps = useMemo(() => ({
    rotation: [0, Math.PI / 2, 0] as [number, number, number],
    scale: isMobile ? 0.35 : 0.5,
    position: [0, 0, 0] as [number, number, number],
    name: "x-wing"
  }), [isMobile])

  return (
    <group ref={ref} {...groupProps}>
      <primitive object={scene} />
    </group>
  )
})

Spaceship.displayName = 'Spaceship'
useGLTF.preload('/textured_x-wing_low_poly.glb')

export default Spaceship
