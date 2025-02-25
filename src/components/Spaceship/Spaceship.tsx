import { forwardRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface SpaceshipProps {
  turbo?: number
}

const Spaceship = forwardRef<THREE.Group, SpaceshipProps>(({ turbo = 0 }, ref) => {
  const { scene, nodes, materials } = useGLTF('/textured_x-wing_low_poly.glb')

  // Fix material transparency and depth issues
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.Material) {
        material.transparent = false
        material.depthWrite = true
        material.side = THREE.FrontSide
        material.needsUpdate = true
      }
    })
  }, [materials])

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

  return (
    <group
      ref={ref}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.5}
      position={[0, 0, 0]}
      name="x-wing"
    >
      <primitive object={scene} />
    </group>
  )
})

Spaceship.displayName = 'Spaceship'
useGLTF.preload('/textured_x-wing_low_poly.glb')

export default Spaceship
