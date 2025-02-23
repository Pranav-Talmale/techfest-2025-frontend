import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLORS = ['#fcaa67', '#c75d59', '#ffffc7', '#8cc5c6', '#a5898c'].map(
  color => new THREE.Color(color).convertSRGBToLinear().multiplyScalar(3.0)
)

const COUNT = 150
const STAR_TEXTURE_URL = '/star.png'

const random = (min: number, max: number) => min + Math.random() * (max - min)

interface StarsProps {
  turbo?: number
}

const Stars = ({ turbo = 0 }: StarsProps) => {
  // Create stars data only once
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      const position = new THREE.Vector3()
      let length: number

      if (Math.random() > 0.8) {
        position.set(random(-10, -30), random(-5, 5), random(6, -6))
        length = random(1.5, 15)
      } else {
        position.set(random(-15, -45), random(-10.5, 1.5), random(30, -45))
        length = random(2.5, 20)
      }

      const speed = random(19.5, 42)
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]

      temp.push({
        position,
        length,
        speed,
        color,
        initialX: position.x
      })
    }
    return temp
  }, [])

  // Use a single texture instance
  const texture = useMemo(() => new THREE.TextureLoader().load(STAR_TEXTURE_URL), [])
  
  // Create a single material instance
  const material = useMemo(() => (
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      alphaMap: texture,
      toneMapped: false
    })
  ), [texture])

  // Use a single geometry instance
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 0.05), [])

  // Cleanup resources on unmount
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [geometry, material, texture])

  // Reference for matrix updates
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null)
  const tempObject = useMemo(() => new THREE.Object3D(), [])

  useFrame((_state, delta) => {
    const mesh = instancedMeshRef.current
    if (!mesh) return

    stars.forEach((star, i) => {
      // Update position
      star.position.x += star.speed * delta + 1 * turbo

      // Reset star when it goes out of view
      if (star.position.x > 40) {
        star.position.x = star.initialX
      }

      // Update instance using tempMatrix to avoid creating new matrices
      tempObject.position.copy(star.position)
      tempObject.scale.set(star.length, 1, 1)
      tempObject.updateMatrix()
      mesh.setMatrixAt(i, tempObject.matrix)
      mesh.setColorAt(i, star.color)
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, COUNT]}
      frustumCulled={true}
    />
  )
}

export default Stars 