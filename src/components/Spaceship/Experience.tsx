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
} from "react";
import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import LoadingScreen from "../LoadingScreen";
import { Preload, Environment } from "@react-three/drei";

// Custom hook to detect when the target key is pressed or mobile touch is active
function useTurboControl() {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleStart = useCallback(() => {
    setIsPressed(true);
  }, []);
  
  const handleEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    turboActive: isPressed,
    handleStart,
    handleEnd
  };
}

// Lazy load heavy components
const Stars = lazy(() => import("./Stars"));
const Spaceship = lazy(() => import("./Spaceship"));
const MotionBlur = lazy(() => import("./MotionBlur"));

const CameraRig = ({ turbo }: { turbo: number }) => {
  const { camera } = useThree();
  const perspCamera = camera as THREE.PerspectiveCamera;
  const basePosition = useMemo(() => new THREE.Vector3(-4, 4, 6), []);
  const baseLookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const turboPosition = useMemo(() => new THREE.Vector3(5, 1, 1), []);
  const turboLookAt = useMemo(() => new THREE.Vector3(-5, 0, 0), []);

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
function useGyroControl() {
  const [gyroPoint, setGyroPoint] = useState(new THREE.Vector3(0, 0, 0));
  const smoothGyroPoint = useRef(new THREE.Vector3(0, 0, 0)); // For smoother transition

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Ensure values are not null, defaulting to 0 if undefined
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;

      // Normalize values and apply smoother scaling
      const targetY = THREE.MathUtils.clamp((beta - 45) / 60, -3, 1);
      const targetZ = THREE.MathUtils.clamp(gamma / 60, -2, 2);

      // Apply smoothing using interpolation (lerp)
      smoothGyroPoint.current.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1);
      setGyroPoint(smoothGyroPoint.current.clone()); // Update state with smoothed values
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return gyroPoint;
}

const SpaceshipController = ({
  mousePoint,
  turbo,
}: {
  mousePoint: THREE.Vector3;
  turbo: number;
}) => {
  const spaceshipRef = useRef<THREE.Group>(null);
  const translateY = useRef(0);
  const translateAcceleration = useRef(0);
  const angleZ = useRef(0);
  const angleAcceleration = useRef(0);
  const pitchAngle = useRef(0);
  const pitchAcceleration = useRef(0);

  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const subtractionVec = useMemo(() => new THREE.Vector3(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  // Enhance spaceship material for reflections on mount.
  useEffect(() => {
    if (spaceshipRef.current) {
      spaceshipRef.current.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMapIntensity = 4;
          child.material.metalness = 1;
          child.material.roughness = 0.1;
          child.material.needsUpdate = true;
        }
      });
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
    spaceshipRef.current.rotation.set(boundedPitch, -Math.PI / 2, angleZ.current, "YZX");
  });

  return <Spaceship turbo={turbo} ref={spaceshipRef} />;
};

const PostProcessing = ({ turbo }: { turbo: number }) => {
  const multisampling = turbo === 1 ? 4 : 0;
  const offset = turbo === 1 ? [0.002 * turbo, 0.002 * turbo] : [0, 0];
  return (
    <EffectComposer multisampling={multisampling}>
      {turbo === 1 ? <MotionBlur turbo={turbo} /> : <Fragment />}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
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
  }, [scene.environment]);
  return null;
};

const Experience = () => {
  const { turboActive, handleStart, handleEnd } = useTurboControl();
  const [mousePoint, setMousePoint] = useState(() => new THREE.Vector3(0, 0, 0));

  return (
    <>
      <LoadingScreen />
      {/* Minimalist Sci-fi Logo Overlay */}
      <div className="absolute inset-x-0 top-[10vh] flex flex-col items-center pointer-events-none z-10">
        {/* Logo Container */}
        <div className="relative">
          {/* Logo */}
          <img 
            src="/technovate logo.png" 
            alt="Technovate" 
            className="h-16 md:h-32 w-auto"
          />
          
          {/* Tagline */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-white/60">
              The Future Awaits
            </p>
          </div>
        </div>
      </div>
      
      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 pointer-events-none z-10 select-none touch-none">
        <div className="text-sm text-white/50 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          Hold circle to boost into hyperspace
        </div>
        <div className="pointer-events-auto touch-none">
          <button
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 transform select-none touch-none"
            style={{
              background: turboActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              transform: turboActive ? 'scale(0.95)' : 'scale(1)',
              boxShadow: turboActive ? '0 0 20px rgba(255, 255, 255, 0.2)' : '0 0 10px rgba(255, 255, 255, 0.1)',
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              userSelect: 'none'
            }}
          >
            <div className={`w-8 h-8 rounded-full transition-all duration-200 select-none ${
              turboActive ? 'bg-white scale-90' : 'bg-white/50 scale-100'
            }`} />
          </button>
        </div>
      </div>
      <Canvas
        dpr={[0.5, 1]}
        performance={{ min: 0.1 }}
        shadows={false}
        dpr={[0.5, 1]}
        performance={{ min: 0.1 }}
        shadows={false}
        camera={{ fov: 40, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "#000000" }}
      >
        <Preload all />
        <CameraRig turbo={turboActive ? 1 : 0} />
        <CameraRig turbo={turboActive ? 1 : 0} />
        <Suspense fallback={null}>
          <Environment preset="park" background={false} />
          <AssignEnvMap />
          <MousePlane onMove={setMousePoint} turbo={turboActive ? 1 : 0} />
          <ambientLight intensity={0.1} />
          <MousePlane onMove={setMousePoint} turbo={turboActive ? 1 : 0} />
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[1, 2, 3]}
            intensity={0.5}
            castShadow={false}
            castShadow={false}
          />
          <Stars turbo={turboActive ? 1 : 0} />
          <SpaceshipController mousePoint={mousePoint} turbo={turboActive ? 1 : 0} />
          <PostProcessing turbo={turboActive ? 1 : 0} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Experience;
