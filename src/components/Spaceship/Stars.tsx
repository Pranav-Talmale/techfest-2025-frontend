import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const COLORS = ['#008080', '#57016D', '#008080', '#529EEA', '#126778'].map(
  color => new THREE.Color(color).convertSRGBToLinear().multiplyScalar(8.0)
)

const COUNT = 200
const STAR_TEXTURE_URL = '/star.png'

interface Star {
  position: THREE.Vector3
  length: number
  speed: number
  color: THREE.Color
  initialX: number
}

interface StarsProps {
  turbo?: number
}

const Stars = ({ turbo = 0 }: StarsProps) => {
  const texture = useTexture(STAR_TEXTURE_URL)

  // Precompute star properties only once.
  const stars: Star[] = useMemo(() => {
    const temp: Star[] = []
    for (let i = 0; i < COUNT; i++) {
      const position = new THREE.Vector3()
      let length: number

      if (Math.random() > 0.8) {
        position.set(
          Math.random() * 20 - 30,
          Math.random() * 10 - 5,
          Math.random() * 12 - 6
        )
        length = Math.random() * 13.5 + 1.5
      } else {
        position.set(
          Math.random() * 30 - 45,
          Math.random() * 12 - 10.5,
          Math.random() * 75 - 45
        )
        length = Math.random() * 17.5 + 2.5
      }

      temp.push({
        position,
        length,
        speed: Math.random() * 22.5 + 19.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        initialX: position.x,
      })
    }
    return temp
  }, [])

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null)
  const tempObject = useMemo(() => new THREE.Object3D(), [])

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        alphaMap: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [texture]
  )

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 0.05), [])

  useFrame((_, delta) => {
    const mesh = instancedMeshRef.current
    if (!mesh) return

    const turboFactor = turbo * 10
    for (let i = 0; i < COUNT; i++) {
      const star = stars[i]
      star.position.x += (star.speed + turboFactor) * delta
      if (star.position.x > 40) {
        star.position.x = star.initialX - 30
      }
      tempObject.position.copy(star.position)
      tempObject.scale.set(star.length, 1, 1)
      tempObject.updateMatrix()
      mesh.setMatrixAt(i, tempObject.matrix)
      mesh.setColorAt(i, star.color)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [geometry, material, texture])

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, COUNT]}
      frustumCulled={false}
    />
  )
}

export default Stars
