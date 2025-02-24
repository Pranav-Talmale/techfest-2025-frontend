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
import { EffectComposer, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import LoadingScreen from "../LoadingScreen";
import { Preload, Environment } from "@react-three/drei";

// Custom hook to detect when the target key is pressed.
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

const SpaceshipController = ({
  mousePoint,
  turbo,
}: {
  mousePoint: THREE.Vector3;
  turbo: number;
}) => {
  const spaceshipRef = useRef<THREE.Group>(null);
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
    const boundedPitch = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, pitchAngle.current));
    if (!turbo) {
      angleAcceleration.current += (boundedAngle - angleZ.current) * 0.01;
    }
    angleAcceleration.current *= 0.75;
    angleZ.current += angleAcceleration.current;

    spaceshipRef.current.position.setY(translateY.current);
    spaceshipRef.current.rotation.set(boundedPitch, -Math.PI / 2, angleZ.current, "YZX");

    // --- Dynamic Reflection Update (Occasional Purple Tint Flash) ---
    // Define a 10-second cycle:
    // 0 - 4 sec: pure blue
    // 4 - 5 sec: transition from blue to purple
    // 5 - 6 sec: pure purple
    // 6 - 7 sec: transition from purple back to blue
    // 7 - 10 sec: pure blue
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
    // When fraction is 0, tint is pure blue; when fraction is 1, tint is purple.
    const blueColor = new THREE.Color(0x800080);
    const purpleColor = new THREE.Color(0x0000ff);
    const tint = blueColor.clone().lerp(purpleColor, fraction);

    // Update envMap intensity and blend material color toward the tint.
    spaceshipRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 3 + 2 * fraction;
        child.material.color.lerp(tint, 0.3);
        child.material.needsUpdate = true;
      }
    });
  });

  return <Spaceship turbo={turbo} ref={spaceshipRef} />;
};

const PostProcessing = ({ turbo }: { turbo: number }) => {
  const multisampling = turbo === 1 ? 4 : 0;
  const offset = turbo === 1 ? [0.002 * turbo, 0.002 * turbo] : [0, 0];
  return (
    <EffectComposer multisampling={multisampling}>
      {turbo === 1 ? <MotionBlur turbo={turbo} /> : <Fragment />}
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={offset} />
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

const Experience = () => {
  // Use our custom hook to detect the "W" key for boosting.
  const isBoosting = useKeyPress("KeyW");
  const turbo = isBoosting ? 1 : 0;
  const [mousePoint, setMousePoint] = useState(() => new THREE.Vector3(0, 0, 0));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <>
      <LoadingScreen />
      {/* Logo Overlay */}
      <div className="absolute inset-x-0 top-1/3 flex flex-col items-center pointer-events-none z-10">
        <div className="text-center">
          <img src="/technovate logo.png" alt="Technovate" className="h-24 md:h-32 w-auto mb-4" />
          <p className="text-lg md:text-xl text-white/70">The Future Awaits</p>
        </div>
      </div>
      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-10">
        {isMobile ? (
          <div className="pointer-events-auto">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={turbo === 1} readOnly />
              <div className="w-20 h-11 bg-white/10 backdrop-blur-sm rounded-full"></div>
              <span className="ml-3 text-sm text-white/70">
                {turbo === 1 ? "Boosting" : "Boost"}
              </span>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-white/50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <kbd className="px-2 py-1 text-sm bg-white/10 rounded">W</kbd>
            <span className="text-sm md:text-base">to boost into hyperspace</span>
          </div>
        )}
      </div>
      <Canvas
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
          {/* Static HDR environment for efficient reflections */}
          <Environment preset="park" background={false} />
          <AssignEnvMap />
          <MousePlane onMove={setMousePoint} turbo={turbo} />
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

export default Experience;
