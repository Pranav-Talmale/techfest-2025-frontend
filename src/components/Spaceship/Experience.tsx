import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  lazy,
  Fragment,
  memo,
} from "react";
import { EffectComposer, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import LoadingScreen from "../LoadingScreen";
import { Preload, Environment } from "@react-three/drei";

// Custom hook to detect when the target key is held down.
function useKeyPress(targetKey: string) {
  const [pressed, setPressed] = useState(false);
  const downHandler = useCallback((e: KeyboardEvent) => {
    if (e.code === targetKey) setPressed(true);
  }, [targetKey]);
  const upHandler = useCallback((e: KeyboardEvent) => {
    if (e.code === targetKey) setPressed(false);
  }, [targetKey]);
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);
  return pressed;
}

// Lazy load heavy components
const Stars = lazy(() => import("./Stars"));
const Spaceship = lazy(() => import("./Spaceship"));
const MotionBlur = lazy(() => import("./MotionBlur"));

const CameraRig = ({ turbo }: { turbo: number }) => {
  const { camera } = useThree();
  const perspCamera = camera as THREE.PerspectiveCamera;

  useFrame(() => {
    const targetPos = turbo ? turboPosition : basePosition;
    const targetLook = turbo ? turboLookAt : baseLookAt;
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(targetLook);
    const targetFOV = 40 + turbo * 15;
    perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFOV, 0.02);
    perspCamera.updateProjectionMatrix();
  });

  useEffect(() => {
    camera.position.copy(basePosition);
    camera.lookAt(baseLookAt);
    perspCamera.fov = 40;
    perspCamera.updateProjectionMatrix();
  }, [camera, perspCamera]);

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

const SpaceshipController = ({
  mousePoint,
  turbo,
}: {
  mousePoint: THREE.Vector3;
  turbo: number;
}) => {
  const spaceshipRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const { clock } = useThree();
  const translateY = useRef(0);
  const translateAcceleration = useRef(0);
  const angleZ = useRef(0);
  const angleAcceleration = useRef(0);
  const pitchAngle = useRef(0);
  const pitchAcceleration = useRef(0);

  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const subtractionVec = useMemo(() => new THREE.Vector3(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  // Enhance spaceship materials for reflections and cache them.
  useEffect(() => {
    if (spaceshipRef.current) {
      const mats: THREE.MeshStandardMaterial[] = [];
      spaceshipRef.current.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMapIntensity = 4;
          child.material.metalness = 1;
          child.material.roughness = 0.1;
          child.material.needsUpdate = true;
          mats.push(child.material);
        }
      });
      materialsRef.current = mats;
    }
  }, []);

  useFrame(() => {
    if (!spaceshipRef.current) return;
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
    const boundedPitch = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, pitchAngle.current));
    if (!turbo) {
      angleAcceleration.current += (boundedAngle - angleZ.current) * 0.01;
    }
    angleAcceleration.current *= 0.75;
    angleZ.current += angleAcceleration.current;

    spaceshipRef.current.position.setY(translateY.current);
    spaceshipRef.current.rotation.set(boundedPitch, -Math.PI / 2, angleZ.current, "YZX");

    // --- Dynamic Reflection Update (Occasional Purple Tint Flash) ---
    const timeVal = clock.getElapsedTime();
    const flashPeriod = 10.0;
    const phase = timeVal % flashPeriod;
    let fraction = 0;
    if (phase < 4) {
      fraction = 0;
    } else if (phase < 5) {
      fraction = (phase - 4) / 1;
    } else if (phase < 6) {
      fraction = 1;
    } else if (phase < 7) {
      fraction = 1 - ((phase - 6) / 1);
    } else {
      fraction = 0;
    }
    const blueColor = new THREE.Color(0x800080);
    const purpleColor = new THREE.Color(0x0000ff);
    const tint = blueColor.clone().lerp(purpleColor, fraction);

    // Update only the cached materials.
    materialsRef.current.forEach((material) => {
      material.envMapIntensity = 3 + 2 * fraction;
      material.color.lerp(tint, 0.3);
      material.needsUpdate = true;
    });
  });

  return <Spaceship turbo={turbo} ref={spaceshipRef} />;
};

const PostProcessing = ({ turbo }: { turbo: number }) => {
  const multisampling = turbo ? 4 : 0;
  const offset = turbo ? [0.002 * turbo, 0.002 * turbo] : [0, 0];
  return (
    <EffectComposer multisampling={multisampling}>
      {turbo ? <MotionBlur turbo={turbo} /> : <Fragment />}
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={offset} />
    </EffectComposer>
  );
};

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
            child.material.envMapIntensity = 4;
            child.material.metalness = 1;
            child.material.roughness = 0.1;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene.environment]);
  return null;
};

const BOOST_DURATION = 2000;

// Memoize static objects
const basePosition = new THREE.Vector3(-4, 4, 6);
const baseLookAt = new THREE.Vector3(0, 0, 0);
const turboPosition = new THREE.Vector3(5, 1, 1);
const turboLookAt = new THREE.Vector3(-5, 0, 0);

const Experience = () => {
  // For desktop, boost state comes from holding "W"
  const isBoostingFromKey = useKeyPress("KeyW");
  // For mobile, we use a separate state that works on press-and-hold
  const [boostMobile, setBoostMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePoint, setMousePoint] = useState(new THREE.Vector3());
  const [boostStartTime, setBoostStartTime] = useState<number | null>(null);
  const [boostProgress, setBoostProgress] = useState(0);
  const boostTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Track boost start time separately for keyboard
  const keyboardBoostStart = useRef<number | null>(null);

  // Determine boost state based on platform:
  const turbo = isMobile ? (boostMobile ? 1 : 0) : (isBoostingFromKey ? 1 : 0);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Watch for keyboard boost changes
  useEffect(() => {
    if (isBoostingFromKey) {
      if (!keyboardBoostStart.current) {
        keyboardBoostStart.current = Date.now();
      }
      const updateProgress = () => {
        if (!keyboardBoostStart.current) return;
        const elapsed = Date.now() - keyboardBoostStart.current;
        const progress = Math.min(elapsed / BOOST_DURATION, 1);
        setBoostProgress(progress);
        
        if (progress < 1 && isBoostingFromKey) {
          boostTimeoutRef.current = window.setTimeout(updateProgress, 16); // Use timeout instead of RAF
        } else if (progress >= 1) {
          const aboutSection = document.getElementById('about-section');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      updateProgress();
    } else {
      if (boostTimeoutRef.current) {
        clearTimeout(boostTimeoutRef.current);
      }
      keyboardBoostStart.current = null;
      setBoostProgress(0);
    }

    return () => {
      if (boostTimeoutRef.current) {
        clearTimeout(boostTimeoutRef.current);
      }
    };
  }, [isBoostingFromKey]);

  // Separate mobile boost handler
  useEffect(() => {
    if (boostMobile) {
      if (!boostStartTime) {
        setBoostStartTime(Date.now());
      }
      const updateProgress = () => {
        const elapsed = Date.now() - (boostStartTime || Date.now());
        const progress = Math.min(elapsed / BOOST_DURATION, 1);
        setBoostProgress(progress);
        
        if (progress < 1 && boostMobile) {
          boostTimeoutRef.current = setTimeout(updateProgress, 16);
        } else if (progress >= 1) {
          const aboutSection = document.getElementById('about-section');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            setBoostMobile(false);
          }
        }
      };
      updateProgress();
    } else {
      if (boostTimeoutRef.current) {
        clearTimeout(boostTimeoutRef.current);
      }
      setBoostStartTime(null);
      if (!isBoostingFromKey) {
        setBoostProgress(0);
      }
    }

    return () => {
      if (boostTimeoutRef.current) {
        clearTimeout(boostTimeoutRef.current);
      }
    };
  }, [boostMobile, boostStartTime]);

  // Smooth progress animation
  useEffect(() => {
    const animateProgress = () => {
      setSmoothProgress(prev => {
        const target = boostProgress;
        const diff = target - prev;
        // Adjust the divisor to control smoothing (higher = smoother but slower)
        const next = prev + diff * 0.1;
        return Math.abs(diff) < 0.001 ? target : next;
      });
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [boostProgress]);

  // Calculate the displayed percentage using smoothed progress
  const displayedProgress = Math.min(Math.floor(smoothProgress * 100), 100);

  // Memoize event handlers
  const handleMobileBoostStart = useCallback(() => setBoostMobile(true), []);
  const handleMobileBoostEnd = useCallback(() => setBoostMobile(false), []);
  const handleMouseMove = useCallback((point: THREE.Vector3) => setMousePoint(point), []);


  return (
    <>
      <LoadingScreen />
      {/* Logo Overlay */}
      <div className="absolute top-6 sm:top-0 left-0 pointer-events-none z-10 p-16">
  <div className="text-left">
    <img
      src="technovate_logo.svg"
      alt="Technovate"
      className="h-18 md:h-18 w-auto mb-0 sm:mb-3 md:mb-6 object-contain"
    />
    <p className="px-1 text-lg md:text-xl text-white/90">the Future Awaits</p>
  </div>
</div>

      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 z-10 min-h-[80px]">
        {/* Boost Progress Bar - Use smoothed progress */}
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden" 
             style={{ opacity: turbo > 0 ? 1 : 0, transition: 'opacity 0.2s' }}>
          <div 
            className="h-full bg-white"
            style={{ 
              width: `${displayedProgress}%`,
              transition: 'none' // Remove transition to let RAF handle animation
            }}
          />
        </div>

        {/* Boost Controls */}
        {isMobile ? (
          <div
            className="pointer-events-auto bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer text-white/70 select-none min-w-[130px] text-center"
            onTouchStart={handleMobileBoostStart}
            onTouchEnd={handleMobileBoostEnd}
            onMouseDown={handleMobileBoostStart}
            onMouseUp={handleMobileBoostEnd}
            onMouseLeave={handleMobileBoostEnd}
          >
            <span className="text-sm whitespace-nowrap">
              {turbo ? `Boosting ${displayedProgress}%` : "Hold to Boost"}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-white/50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full min-w-[190px]">
            <kbd className="px-2 py-1 text-sm bg-white/10 rounded">W</kbd>
            <span className="text-sm md:text-base whitespace-nowrap">
              {turbo ? `Boosting ${displayedProgress}%` : "Hold to Boost"}
            </span>
          </div>
        )}
      </div>
      <Canvas
        tabIndex={0}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        shadows
        camera={{ fov: 40, near: 0.1, far: 200 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ background: "#000000" }}
      >
        <Preload all />
        <CameraRig turbo={turbo} />
        <Suspense fallback={null}>
          <Environment preset="park" background={false} />
          <AssignEnvMap />
          <MousePlane onMove={handleMouseMove} turbo={turbo} />
          <ambientLight intensity={1} />
          <directionalLight
            position={[1, 2, 3]}
            intensity={0.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          <Stars turbo={turbo} />
          <SpaceshipController mousePoint={mousePoint} turbo={turbo} />
          <PostProcessing turbo={turbo} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default memo(Experience);
