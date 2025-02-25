import { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

// Define the shader with a compile-time constant for samples.
const fragmentShader = /* glsl */ `
uniform float strength;
#define SAMPLES 1

float rand2(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Fixed direction for left-to-right motion
  vec2 dir = vec2(-1.0, 0.0);
  
  vec4 accum = vec4(0.0);
  
  for (int i = 0; i < SAMPLES; i++) {
    // Add some randomness to the sampling
    float offset = (float(i) / float(SAMPLES)) * strength;
    float random = rand2(uv * 5.0 + float(i));
    
    // Sample in the fixed direction
    vec2 offs = dir * offset * ((1.0 + random * 0.2) * 0.1);
    accum += texture2D(inputBuffer, uv + offs);
  }
  
  outputColor = accum / float(SAMPLES);
}
`

// Define the effect class.
class MotionBlurEffect extends Effect {
  constructor({ strength = 0 } = {}) {
    super('MotionBlur', fragmentShader, {
      uniforms: new Map([['strength', new THREE.Uniform(strength)]])
    })
  }
}

// Extend so that MotionBlurEffect is available as a JSX element.
extend({ MotionBlurEffect })

interface MotionBlurProps {
  turbo?: number
}

// The MotionBlur component
const MotionBlur = forwardRef<Effect, MotionBlurProps>(({ turbo = 0 }, ref) => {
  const effect = useMemo(() => new MotionBlurEffect(), [])
  // Cache the uniform so we avoid doing a Map lookup each frame.
  const strengthUniform = useMemo(() => effect.uniforms.get('strength'), [effect])

  useFrame(() => {
    if (strengthUniform) {
      strengthUniform.value = turbo
    }
  })

  return <primitive ref={ref} object={effect} dispose={null} />
})

MotionBlur.displayName = 'MotionBlur'

export default MotionBlur
