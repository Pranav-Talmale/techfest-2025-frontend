import { forwardRef, useMemo, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Define the type for our GLTF result
type GLTFResult = {
  nodes: {
    Cube001_spaceship_racer_0: THREE.Mesh
    Cylinder002_spaceship_racer_0: THREE.Mesh
    Cylinder003_spaceship_racer_0: THREE.Mesh
    Cube003_spaceship_racer_0: THREE.Mesh
    Cylinder004_spaceship_racer_0: THREE.Mesh
    Cube001_RExtr001_spaceship_racer_0: THREE.Mesh
    Cube001_RPanel003_spaceship_racer_0: THREE.Mesh
    Cube001_RPanel003_RExtr_spaceship_racer_0: THREE.Mesh
    Cube002_spaceship_racer_0: THREE.Mesh
    Cube001_RPanel001_spaceship_racer_0: THREE.Mesh
    Cube001_RPanel003_RExtr001_spaceship_racer_0: THREE.Mesh
    Cube005_cockpit_0: THREE.Mesh
    Sphere_cockpit_0: THREE.Mesh
  }
  materials: {
    spaceship_racer: THREE.MeshStandardMaterial
    cockpit: THREE.MeshStandardMaterial
  }
}

interface SpaceshipProps {
  turbo?: number
}

const Spaceship = forwardRef<THREE.Group, SpaceshipProps>(({ turbo = 0 }, ref) => {
  const { nodes, materials } = useGLTF('/spaceship.glb') as unknown as GLTFResult
  const beamTexture = useMemo(() => new THREE.TextureLoader().load('/energy-beam-opacity.png'), [])

  // Fix alpha settings for materials
  const alphaFix = useCallback((material: THREE.MeshStandardMaterial) => {
    material.transparent = true
    material.alphaToCoverage = true
    material.depthTest = true
    material.depthWrite = true
    material.metalness = 0.8  // Full metallic for better reflections
    material.roughness = 0.3  // Slightly rough for more interesting reflections
  }, [])

  // Apply material settings on mount
  useEffect(() => {
    alphaFix(materials.spaceship_racer)
    alphaFix(materials.cockpit)

    // Add emissive properties to cockpit
    materials.cockpit.emissive = new THREE.Color(0xffa500) // Orange glow
    materials.cockpit.emissiveIntensity = 2.5 // Base intensity

    // Cleanup on unmount
    return () => {
      beamTexture.dispose()
      Object.values(materials).forEach(material => {
        if (material instanceof THREE.Material) {
          material.dispose()
        }
      })
      Object.values(nodes).forEach(node => {
        if (node instanceof THREE.Mesh && node.geometry) {
          node.geometry.dispose()
        }
      })
    }
  }, [alphaFix, materials, nodes, beamTexture])

  // Animation
  useFrame((state) => {
    const group = (ref as React.RefObject<THREE.Group>)?.current
    if (!group) return

    // Add slight hover animation
    group.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    group.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05

    // Add turbo effect
    if (turbo > 0) {
      group.rotation.z += Math.sin(state.clock.elapsedTime * 8) * 0.02
      // Increase cockpit glow during turbo
      materials.cockpit.emissiveIntensity = 0.5 + (turbo * 0.5)
    } else {
      materials.cockpit.emissiveIntensity = 0.5
    }
  })

  return (
    <group ref={ref} rotation-y={-Math.PI / 2} scale={0.003} position={[0.95, 0, -2.235]} name="spaceship">
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.257, -64.815, 64.771]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.691, -59.39, -553.376]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[742.147, -64.535, -508.885]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[737.618, 46.842, -176.413]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[789.518, 59.453, -224.912]}
        rotation={[1.003, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_RExtr001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[745.539, 159.319, -5.922]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_RPanel003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.257, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_RPanel003_RExtr_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.257, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[736.789, -267.14, -33.214]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_RPanel001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.257, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_RPanel003_RExtr001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.257, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube005_cockpit_0.geometry}
        material={materials.cockpit}
        position={[739.446, 110.436, 307.179]}
        rotation={[0.087, 0, 0]}
      />
      <mesh
        geometry={nodes.Sphere_cockpit_0.geometry}
        material={materials.cockpit}
        position={[739.365, 145.689, 315.602]}
        rotation={[0.175, 0, 0]}
      />

      {/* Energy Beam */}
      <mesh position={[750, -60, -1350]} rotation-x={Math.PI * 0.5}>
        <cylinderGeometry args={[70, 25, 1600, 15]} />
        <meshBasicMaterial
          transparent
          color={[1, 0.4, 0.02]}
          alphaMap={beamTexture}
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendDst={THREE.OneFactor}
          opacity={turbo > 0 ? 1 : 0.7}
          toneMapped={false} // Important for bloom effect
        />
      </mesh>

      {/* Engine Glow */}
      <mesh position={[750, -60, -1350]}>
        <sphereGeometry args={[50, 16, 16]} />
        <meshBasicMaterial
          color={[1, 0.4, 0.02]}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
})

Spaceship.displayName = 'Spaceship'

// Pre-load the model
useGLTF.preload('/spaceship.glb')

export default Spaceship 