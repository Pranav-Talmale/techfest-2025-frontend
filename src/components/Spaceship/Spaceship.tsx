import { forwardRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

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
  const beamTexture = useTexture('/energy-beam-opacity.png')

  // Cache the material configuration function
  const configureMaterial = useMemo(() => {
    return (mat: THREE.MeshStandardMaterial) => {
      mat.transparent = true
      mat.alphaToCoverage = true
      mat.depthTest = true
      mat.depthWrite = true
      mat.metalness = 0.8
      mat.roughness = 0.3
    }
  }, [])

  useEffect(() => {
    configureMaterial(materials.spaceship_racer)
    configureMaterial(materials.cockpit)
  }, [configureMaterial, materials])

  useFrame((state) => {
    const group = (ref as React.RefObject<THREE.Group>)?.current
    if (!group) return
    const time = state.clock.elapsedTime
    group.position.y = Math.sin(time) * 0.1
    group.rotation.z = Math.sin(time * 0.5) * 0.05

    if (turbo > 0) {
      group.rotation.z += Math.sin(time * 8) * 0.02
      materials.cockpit.emissiveIntensity = 0.5 + turbo * 0.5
    } else {
      materials.cockpit.emissiveIntensity = 0.5
    }
  })

  useEffect(() => {
    return () => {
      beamTexture.dispose()
      Object.values(materials).forEach((mat) => {
        if (mat instanceof THREE.Material) mat.dispose()
      })
      Object.values(nodes).forEach((node) => {
        if (node instanceof THREE.Mesh && node.geometry) node.geometry.dispose()
      })
    }
  }, [materials, nodes, beamTexture])

  return (
    <group
      ref={ref}
      rotation={[0, -Math.PI / 2, 0]}  // use full rotation array instead of rotation-y shorthand
      scale={0.003}
      position={[0.95, 0, -2.235]}
      name="spaceship"
    >
      <mesh
        geometry={nodes.Cube001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.26, -64.81, 64.77]}
      />
      <mesh
        geometry={nodes.Cylinder002_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.69, -59.39, -553.38]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[742.15, -64.53, -508.88]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[737.62, 46.84, -176.41]}
      />
      <mesh
        geometry={nodes.Cylinder004_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[789.52, 59.45, -224.91]}
        rotation={[1, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube001_RExtr001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[745.54, 159.32, -5.92]}
      />
      <mesh
        geometry={nodes.Cube001_RPanel003_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.26, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube001_RPanel003_RExtr_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.26, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube002_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[736.79, -267.14, -33.21]}
      />
      <mesh
        geometry={nodes.Cube001_RPanel001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.26, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube001_RPanel003_RExtr001_spaceship_racer_0.geometry}
        material={materials.spaceship_racer}
        position={[739.26, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube005_cockpit_0.geometry}
        material={materials.cockpit}
        position={[739.45, 110.44, 307.18]}
        rotation={[0.09, 0, 0]}
      />
      <mesh
        geometry={nodes.Sphere_cockpit_0.geometry}
        material={materials.cockpit}
        position={[739.37, 145.69, 315.6]}
        rotation={[0.17, 0, 0]}
      />

      <mesh position={[750, -60, -1350]} rotation-x={Math.PI * 0.5}>
        <cylinderGeometry args={[70, 25, 1600, 15]} />
        <meshBasicMaterial
          transparent
          color={new THREE.Color('#260C73')}
          alphaMap={beamTexture}
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendDst={THREE.OneFactor}
          opacity={turbo > 0 ? 1 : 0.7}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[750, -60, -1350]}>
        <sphereGeometry args={[50, 16, 16]} />
        <meshBasicMaterial
          color={new THREE.Color('#260C73')}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
})

Spaceship.displayName = 'Spaceship'
useGLTF.preload('/spaceship.glb')

export default Spaceship
