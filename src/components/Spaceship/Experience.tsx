import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import LoadingScreen from "../LoadingScreen";
import { Stats, Environment } from "@react-three/drei";
import Stars from "./Stars";
import Spaceship from "./Spaceship";
import MotionBlur from "./MotionBlur";

// Enable/disable FPS counter
const SHOW_FPS = false; // Toggle this to show/hide FPS counter

// Timing constants in milliseconds
const TIMING = {
  FTL_CHARGE: 1500,    // Time to charge FTL drive
  SCROLL_DELAY: 900,   // Delay before page scroll
  JUMP_RESET: 930,    // Time before resetting after jump
  TRANSITION: 150      // State transition duration
} as const;

// Custom hook to detect when the target key is pressed or mobile touch is active
function useTurboControl() {
  const [isPressed, setIsPressed] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [transitioningTurbo, setTransitioningTurbo] = useState(false);
  const [ftlJump, setFtlJump] = useState(false);
  const chargeTimeoutRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<number | null>(null);
  
  const handleStart = useCallback(() => {
    setIsCharging(true);
    setIsPressed(true); // Immediately activate turbo view
    
    // Start charging timer
    chargeTimeoutRef.current = window.setTimeout(() => {
      setFtlJump(true); // Trigger FTL jump
      setIsCharging(false);
      
      setTimeout(() => {
        // Scroll the page down smoothly
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }, TIMING.SCROLL_DELAY);
      
      // Reset FTL jump state after animation
      jumpTimeoutRef.current = window.setTimeout(() => {
        setFtlJump(false);
        setIsPressed(false);
        setTransitioningTurbo(true);
        setTimeout(() => setTransitioningTurbo(false), TIMING.TRANSITION);
      }, TIMING.JUMP_RESET);
    }, TIMING.FTL_CHARGE);
  }, []);
  
  const handleEnd = useCallback(() => {
    // Only cancel if we haven't started the FTL jump
    if (!ftlJump) {
      // Clear timers
      if (chargeTimeoutRef.current) {
        clearTimeout(chargeTimeoutRef.current);
        chargeTimeoutRef.current = null;
      }
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = null;
      }
      
      setIsCharging(false);
      setIsPressed(false);
      setTransitioningTurbo(true);
      setTimeout(() => setTransitioningTurbo(false), TIMING.TRANSITION);
    }
  }, [ftlJump]);

  useEffect(() => {
    return () => {
      if (chargeTimeoutRef.current) clearTimeout(chargeTimeoutRef.current);
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, []);

  return {
    turboActive: isPressed,
    isCharging,
    ftlJump,
    transitioningTurbo,
    handleStart,
    handleEnd
  };
}

const CameraRig = ({ turbo }: { turbo: number }) => {
  const { camera } = useThree();
  const perspCamera = camera as THREE.PerspectiveCamera;
  const basePosition = useMemo(() => new THREE.Vector3(-5, 4.5, 7), []);
  const baseLookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const turboPosition = useMemo(() => new THREE.Vector3(12, 0, 0), []);
  const turboLookAt = useMemo(() => new THREE.Vector3(-6, 0, 0), []);

  useFrame(() => {
    const targetPos = turbo ? turboPosition : basePosition;
    const targetLook = turbo ? turboLookAt : baseLookAt;
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(targetLook);
    const targetFOV = 40 + turbo * 15;
    perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFOV, 0.05);
    perspCamera.updateProjectionMatrix();
  });

  useEffect(() => {
    camera.position.copy(basePosition);
    camera.lookAt(baseLookAt);
    perspCamera.fov = 40;
    perspCamera.updateProjectionMatrix();
  }, [camera, basePosition, baseLookAt, perspCamera]);

  return null;
};

const MousePlane = ({
  onMove,
  turbo,
}: {
  onMove: (point: THREE.Vector3) => void;
  turbo: number;
}) => {
  const intersectionPoint = useMemo(() => new THREE.Vector3(), []);
  const handlePointerMove = (event: { point: THREE.Vector3 }) => {
    if (turbo > 0) return;
    intersectionPoint.set(-3, event.point.y, event.point.z);
    onMove(intersectionPoint);
  };

  return (
    <mesh
      renderOrder={2}
      visible={false}
      onPointerMove={handlePointerMove}
      rotation={[-Math.PI * 0.1, 0, 0]}
    >
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial transparent opacity={0.25} color={[1, 0, 1]} />
    </mesh>
  );
};

// Custom hook for gyroscopic controls on mobile
//
// function useGyroControl() {
//   const [gyroPoint, setGyroPoint] = useState(new THREE.Vector3(0, 0, 0));
//   const smoothGyroPoint = useRef(new THREE.Vector3(0, 0, 0)); // For smoother transition

//   useEffect(() => {
//     const handleOrientation = (event: DeviceOrientationEvent) => {
//       // Ensure values are not null, defaulting to 0 if undefined
//       const beta = event.beta ?? 0;
//       const gamma = event.gamma ?? 0;

//       // Normalize values and apply smoother scaling
//       const targetY = THREE.MathUtils.clamp((beta - 45) / 60, -3, 1);
//       const targetZ = THREE.MathUtils.clamp(gamma / 60, -2, 2);

//       // Apply smoothing using interpolation (lerp)
//       smoothGyroPoint.current.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1);
//       setGyroPoint(smoothGyroPoint.current.clone()); // Update state with smoothed values
//     };

//     if (window.DeviceOrientationEvent) {
//       window.addEventListener("deviceorientation", handleOrientation);
//     }

//     return () => {
//       window.removeEventListener("deviceorientation", handleOrientation);
//     };
//   }, []);

//   return gyroPoint;
// }

const SpaceshipController = ({
  mousePoint,
  turbo,
  ftlJump
}: {
  mousePoint: THREE.Vector3;
  turbo: number;
  ftlJump: boolean;
}) => {
  const spaceshipRef = useRef<THREE.Group>(null);
  const translateY = useRef(0);
  const translateAcceleration = useRef(0);
  const angleZ = useRef(0);
  const angleAcceleration = useRef(0);
  const pitchAngle = useRef(0);
  const pitchAcceleration = useRef(0);
  const originalPosition = useRef(new THREE.Vector3(0, 0, 0));
  const originalRotation = useRef(new THREE.Euler(0, -Math.PI / 2, 0, "YZX"));
  const isResetting = useRef(false);
  const targetQuaternion = useRef(new THREE.Quaternion());

  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const subtractionVec = useMemo(() => new THREE.Vector3(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  // Store initial position and rotation
  useEffect(() => {
    if (spaceshipRef.current) {
      originalPosition.current.copy(spaceshipRef.current.position);
      targetQuaternion.current.setFromEuler(originalRotation.current);
    }
  }, []);

  useFrame(() => {
    if (!spaceshipRef.current) return;

    if (ftlJump) {
      isResetting.current = false;
      // Dramatic forward movement during FTL jump
      spaceshipRef.current.position.x -= 1;
      
      // Keep the ship's orientation stable during FTL
      spaceshipRef.current.quaternion.copy(targetQuaternion.current);
      return;
    }

    // Reset position and rotation after FTL jump
    if (!ftlJump && spaceshipRef.current.position.x !== originalPosition.current.x) {
      isResetting.current = true;
      spaceshipRef.current.position.lerp(originalPosition.current, 0.1);
      
      // If close enough to original position, snap to it
      if (spaceshipRef.current.position.distanceTo(originalPosition.current) < 0.01) {
        spaceshipRef.current.position.copy(originalPosition.current);
        spaceshipRef.current.quaternion.copy(targetQuaternion.current);
        isResetting.current = false;
      }
      return;
    }

    // Only apply normal movement logic if not resetting
    if (!isResetting.current) {
      // --- Spaceship Movement Logic ---
      if (turbo > 0) {
        translateAcceleration.current += -translateY.current * 0.01;
        angleAcceleration.current += -angleZ.current * 0.01;
        pitchAcceleration.current += -pitchAngle.current * 0.01;
      } else {
        const boundedY = Math.max(-3, Math.min(1, mousePoint.y));
        translateAcceleration.current += (boundedY - translateY.current) * 0.002;
        const targetPitch = mousePoint.z * 0.5;
        pitchAcceleration.current += (targetPitch - pitchAngle.current) * 0.01;
      }
      translateAcceleration.current *= 0.95;
      translateY.current += translateAcceleration.current;
      pitchAcceleration.current *= 0.85;
      pitchAngle.current += pitchAcceleration.current;

      subtractionVec.set(0, translateY.current, 0);
      tempVec.copy(mousePoint).sub(subtractionVec).normalize();
      const dirCos = tempVec.dot(upVec);
      const angle = Math.acos(dirCos) - Math.PI / 2;
      const boundedAngle = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, angle));
      const boundedPitch = Math.max(
        -Math.PI / 6,
        Math.min(Math.PI / 6, pitchAngle.current)
      );
      if (!turbo) {
        angleAcceleration.current += (boundedAngle - angleZ.current) * 0.01;
      }
      angleAcceleration.current *= 0.75;
      angleZ.current += angleAcceleration.current;

      spaceshipRef.current.position.setY(translateY.current);
      const euler = new THREE.Euler(boundedPitch, -Math.PI / 2, angleZ.current, "YZX");
      spaceshipRef.current.setRotationFromEuler(euler);
    }
  });

  return <Spaceship turbo={turbo} ref={spaceshipRef} />;
};

// Optimized PostProcessing component with reduced quality during transitions
const PostProcessing = ({ turbo, transitioning }: { turbo: number, transitioning: boolean }) => {
  const quality = transitioning ? 0.5 : 1; // Reduce quality during transitions
  
  return (
    <EffectComposer multisampling={0}>
      <Suspense fallback={null}>
        {turbo > 0 ? <MotionBlur turbo={turbo} /> : null}
      </Suspense>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.002 * turbo * quality, 0.002 * turbo * quality]}
      />
    </EffectComposer>
  );
};

// Assign the static environment map (from Drei's Environment) to objects that need it.
const AssignEnvMap = () => {
  const { scene } = useThree();
  useEffect(() => {
    if (scene.environment) {
      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          if (!child.material.envMap) {
            child.material.envMap = scene.environment;
            child.material.envMapIntensity = 1;
            child.material.envMapIntensity = 1;
            child.material.metalness = 1;
            child.material.roughness = 0.1;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.environment]);
  return null;
};

const Experience = () => {
  const { turboActive, isCharging, ftlJump, transitioningTurbo, handleStart, handleEnd } = useTurboControl();
  const [mousePoint, setMousePoint] = useState(() => new THREE.Vector3(0, 0, 0));

  return (
    <>
      <LoadingScreen />
      {/* FPS Counter */}
      {SHOW_FPS && <Stats className="fps-counter" />}
      
      {/* Minimalist Sci-fi Logo Overlay */}
      <div className="absolute inset-x-0 top-[10vh] flex flex-col items-center pointer-events-none z-10">
        {/* Logo Container */}
        <div className="relative">
          {/* Logo */}
          <img 
            src="/technovate-logo.svg" 
            alt="Technovate" 
            className="h-16 hidden md:block md:h-32 w-auto p-6 mt-4"
          />
          
          {/* Tagline */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs md:text-sm uppercase font-medium tracking-[0.15em] text-white/80">
            A Techfest like never before
            </p>
          </div>
        </div>
      </div>
      
      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 pointer-events-none z-10 select-none touch-none">
        <div className="text-sm text-white/50 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          Hold circle to charge hyperdrive
        </div>
        
        {/* FTL Charge Progress Bar */}
        <div className={`ftl-charge-container ${isCharging ? 'charging' : ''}`}>
          <div className="ftl-charge-progress" />
        </div>

        <div className="pointer-events-auto touch-none">
          <button
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            className={`w-20 h-20 boost-button ${turboActive ? 'boost-active' : ''} ${isCharging ? 'charging' : ''}`}
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              userSelect: 'none'
            }}
          >
            <div className="boost-button-inner flex items-center justify-center">
              <div 
                className={`w-10 h-10 rounded-full transition-all duration-300 ${
                  turboActive || isCharging
                    ? 'bg-[#409CFF] scale-90 opacity-90' 
                    : 'bg-white/50 scale-100 opacity-70'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>
      <Canvas
        dpr={transitioningTurbo ? 1 : (window.devicePixelRatio > 2 ? [1, 2] : [1, window.devicePixelRatio])}
        performance={{ min: transitioningTurbo ? 0.3 : 0.5 }}
        shadows={false}
        camera={{ fov: 40, near: 0.1, far: 200 }}
        gl={{
          antialias: !transitioningTurbo && window.devicePixelRatio < 2,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        style={{ background: "#000000" }}
      >
        <CameraRig turbo={turboActive ? 1 : 0} />
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          <AssignEnvMap />
          <MousePlane onMove={setMousePoint} turbo={turboActive ? 1 : 0} />
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[1, 2, 3]}
            intensity={0.8}
            castShadow={false}
          />
          <Stars turbo={turboActive ? 1 : 0} />
          <SpaceshipController 
            mousePoint={mousePoint} 
            turbo={turboActive ? 1 : 0}
            ftlJump={ftlJump}
          />
          <PostProcessing 
            turbo={turboActive ? 1 : 0} 
            transitioning={transitioningTurbo}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Experience;
