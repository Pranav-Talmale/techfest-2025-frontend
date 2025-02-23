import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import Stars from './Stars'
import Spaceship from './Spaceship'
import MotionBlur from './MotionBlur'

// Create PMREM Generator for dynamic environment mapping
const DynamicEnvMap = ({ children }: { children: React.ReactNode }) => {
  const { gl, scene } = useThree()
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl])
  const previousEnvMap = useRef<THREE.WebGLRenderTarget | null>(null)
  
  useFrame(() => {
    // Hide spaceship temporarily
    scene.traverse((obj) => {
      if (obj.name === 'spaceship') obj.visible = false
    })
    
    // Clear background
    const originalBackground = scene.background
    scene.background = null

    // Generate environment map
    const envMap = pmrem.fromScene(scene)

    // Restore scene
    scene.background = originalBackground
    scene.traverse((obj) => {
      if (obj.name === 'spaceship') {
        obj.visible = true
        // Apply environment map to spaceship materials
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMap = envMap.texture
            child.material.envMapIntensity = 100
            child.material.normalScale?.set(0.3, 0.3)
            child.material.needsUpdate = true
          }
        })
      }
    })

    // Dispose of previous envMap
    if (previousEnvMap.current) {
      previousEnvMap.current.dispose()
    }
    previousEnvMap.current = envMap
  })

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previousEnvMap.current) {
        previousEnvMap.current.dispose()
      }
      pmrem.dispose()
    }
  }, [pmrem])

  return <>{children}</>
}

const CameraRig = ({ turbo }: { turbo: number }) => {
  const { camera } = useThree()
  const perspCamera = camera as THREE.PerspectiveCamera
  
  // Base camera position for non-turbo view
  const basePosition = new THREE.Vector3(-4, 4, 6)//RGB x-axis:red y-axis:green z-axis:blue
  const baseLookAt = new THREE.Vector3(0, 0, 0)

  // Turbo camera position
  const turboPosition = new THREE.Vector3(5, 1, 1)
  const turboLookAt = new THREE.Vector3(-5, 0, 0)

  useFrame(() => {
    const targetPos = turbo ? turboPosition : basePosition
    const targetLook = turbo ? turboLookAt : baseLookAt

    // Smoothly interpolate position
    camera.position.lerp(targetPos, 0.05)
    
    // Update camera look-at
    camera.lookAt(targetLook)

    // Update FOV
    const targetFOV = 40 + (turbo * 15)
    perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFOV, 0.02)
    perspCamera.updateProjectionMatrix()
  })

  // Set initial position and look-at
  useEffect(() => {
    camera.position.copy(basePosition)
    camera.lookAt(baseLookAt)
    perspCamera.fov = 40
    perspCamera.updateProjectionMatrix()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera])

  return null
}

// Mouse tracking for spaceship control
const MousePlane = ({ onMove, turbo }: { onMove: (point: THREE.Vector3) => void, turbo: number }) => {
  const intersectionPoint = new THREE.Vector3()

  const handlePointerMove = (event: { point: THREE.Vector3 }) => {
    if (turbo > 0) return // Disable steering during turbo
    intersectionPoint.set(-3, event.point.y, event.point.z)
    onMove(intersectionPoint)
  }

  return (
    <mesh renderOrder={2} visible={false} onPointerMove={handlePointerMove} rotation={[-Math.PI * 0.1, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial transparent opacity={0.25} color={[1, 0, 1]} />
    </mesh>
  )
}

// Spaceship movement controller
const SpaceshipController = ({ mousePoint, turbo }: { mousePoint: THREE.Vector3, turbo: number }) => {
  const spaceshipRef = useRef<THREE.Group>(null)
  const translateY = useRef(0)
  const translateAcceleration = useRef(0)
  const angleZ = useRef(0)
  const angleAcceleration = useRef(0)
  const pitchAngle = useRef(0)
  const pitchAcceleration = useRef(0)

  useFrame(() => {
    if (!spaceshipRef.current) return

    if (turbo > 0) {
      // During turbo, gradually return to center
      translateAcceleration.current += (0 - translateY.current) * 0.01
      angleAcceleration.current += (0 - angleZ.current) * 0.01
      pitchAcceleration.current += (0 - pitchAngle.current) * 0.01
    } else {
      // Normal steering with bounds
      const boundedY = Math.max(-3, Math.min(1, mousePoint.y)) // Limit vertical range to ±3 units
      translateAcceleration.current += (boundedY - translateY.current) * 0.002

      // Calculate target pitch based on mouse Z position
      const targetPitch = mousePoint.z * 0.5
      pitchAcceleration.current += (targetPitch - pitchAngle.current) * 0.01
    }

    // Apply acceleration damping
    translateAcceleration.current *= 0.95
    translateY.current += translateAcceleration.current

    pitchAcceleration.current *= 0.85
    pitchAngle.current += pitchAcceleration.current

    // Calculate rotation based on mouse position with bounds
    const dir = mousePoint.clone()
      .sub(new THREE.Vector3(0, translateY.current, 0))
      .normalize()
    
    // Calculate yaw (left/right tilt)
    const dirCos = dir.dot(new THREE.Vector3(0, 1, 0))
    const angle = Math.acos(dirCos) - Math.PI / 2
    
    // Limit rotation angles
    const boundedAngle = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, angle))
    const boundedPitch = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, pitchAngle.current))

    // Update rotation with smooth acceleration
    if (!turbo) {
      angleAcceleration.current += (boundedAngle - angleZ.current) * 0.01
    }
    angleAcceleration.current *= 0.75
    angleZ.current += angleAcceleration.current

    // Apply transformations with proper Euler angles
    spaceshipRef.current.position.setY(translateY.current)
    spaceshipRef.current.rotation.set(boundedPitch, -Math.PI / 2, angleZ.current, 'YZX')
  })

  return <Spaceship turbo={turbo} ref={spaceshipRef} />
}

const Experience = () => {
  const [turbo, setTurbo] = useState(0)
  const [mousePoint, setMousePoint] = useState(new THREE.Vector3(0, 0, 0))

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setTurbo(1)
    }
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setTurbo(0)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return (
    <>
      {/* Controls Indicator */}
      <div className="fixed bottom-4 left-4 z-10 rounded bg-black/50 p-4 text-white">
        <p className="text-sm">Controls:</p>
        <p className="text-xs text-gray-300">Space - Turbo boost</p>
        <p className="text-xs text-gray-300">Mouse - Steer ship (disabled during turbo)</p>
      </div>

      <Canvas 
        dpr={[1, 1.5]} 
        performance={{ min: 0.5 }} 
        shadows
        camera={{ fov: 40, near: 0.1, far: 200 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance"
        }}
        style={{
          background: '#101d1d'
        }}
      >
        <CameraRig turbo={turbo} />

        <Suspense fallback={null}>
          <DynamicEnvMap>
            {/* Mouse tracking plane */}
            <MousePlane onMove={setMousePoint} turbo={turbo} />

            {/* Enhanced Lighting Setup */}
            <ambientLight intensity={0.3} />
            
            {/* Main directional light */}
            <directionalLight 
              position={[1, 2, 3]} 
              intensity={0.5} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />

            {/* Engine glow light */}
            <pointLight 
              position={[-3, 0, 0]} 
              intensity={2.0} 
              color="#ff3030"
              distance={8}
              decay={2}
            />

            {/* Stars Background */}
            <Stars turbo={turbo} />

            {/* Spaceship with movement control */}
            <SpaceshipController mousePoint={mousePoint} turbo={turbo} />

            {/* Post Processing */}
            <EffectComposer multisampling={4}>
              {/* Motion Blur */}
              <MotionBlur turbo={turbo} />

              {/* Chromatic Aberration */}
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.002 * turbo, 0.002 * turbo]}
              />
            </EffectComposer>
          </DynamicEnvMap>
        </Suspense>
      </Canvas>
    </>
  )
}

export default Experience 