# Technovate Interactive Spaceship Experience

A high-performance, interactive 3D spaceship experience built with React Three Fiber and Three.js. Features a dynamic FTL (Faster Than Light) drive system with smooth animations and responsive controls.

## 🚀 Features

### Core Mechanics
- **Interactive Spaceship Control**: Smooth mouse/touch-based control system
- **FTL Drive System**: Charge-based FTL jump mechanic with visual feedback
- **Dynamic Camera**: Responsive camera system that follows ship movements
- **Post-Processing Effects**: Motion blur and chromatic aberration for enhanced visuals

### Visual Effects
- **Charging System**:
  - Visual progress bar for FTL charge status
  - Dynamic glow effects during charging
  - Smooth transitions between states
  
- **FTL Jump Sequence**:
  - Dramatic forward movement
  - Camera perspective shifts
  - Enhanced visual effects during jump
  - Smooth reset animation

### Performance Optimizations
- Dynamic DPR (Device Pixel Ratio) adjustment
- Quality scaling during transitions
- Mobile-specific optimizations
- Efficient state management
- Quaternion-based rotation system

## 🛠️ Technical Implementation

### Core Components

#### `Experience.tsx`
Main component orchestrating the entire 3D experience:
- Canvas setup and configuration
- Scene composition
- UI overlay management
- Performance optimization settings

#### `SpaceshipController`
Handles spaceship physics and movement:
```typescript
// Key features:
- Position and rotation management using quaternions
- Smooth interpolation for all movements
- FTL jump sequence handling
- Physics-based acceleration system
```

#### `useTurboControl` Hook
Manages the FTL drive system:
```typescript
// State management:
- Charging state
- FTL jump activation
- Transition handling
- Timer management
```

### Animation System

#### FTL Jump Sequence
1. **Charging Phase** (800ms):
   - Progress bar fills up
   - Button glows with increasing intensity
   - Ship maintains position with subtle movements

2. **Jump Phase**:
   - Ship launches forward
   - Enhanced visual effects activate
   - Camera perspective shifts
   - Page scrolls after 700ms delay

3. **Reset Phase** (1000ms):
   - Ship smoothly returns to original position
   - Quaternion-based rotation ensures smooth reset
   - Effects gradually fade out

### Movement System

#### Normal Mode
```typescript
// Physics-based movement with:
- Acceleration and deceleration
- Bounded movement ranges
- Smooth rotation interpolation
- Mouse/touch position tracking
```

#### FTL Mode
```typescript
// Enhanced movement with:
- Dramatic forward velocity
- Banking rotation effects
- Enhanced particle effects
- Camera perspective changes
```

### Visual Effects System

#### Post-Processing Pipeline
- Motion blur during high-speed movement
- Chromatic aberration for speed effects
- Quality adjustment during transitions
- Performance-based effect scaling

#### UI Elements
- Minimalist sci-fi aesthetic
- Responsive design for all screen sizes
- Dynamic feedback elements
- Smooth state transitions

## ⚙️ Technical Details

### Performance Optimizations

#### Rendering
```typescript
// Dynamic quality adjustment:
dpr={transitioningTurbo ? 1 : (window.devicePixelRatio > 2 ? [1, 2] : [1, window.devicePixelRatio])}
performance={{ min: transitioningTurbo ? 0.3 : 0.5 }}
```

#### State Management
- UseRef for performance-critical values
- Optimized re-render cycles
- Efficient memory usage
- Proper cleanup and disposal

#### Rotation System
```typescript
// Quaternion-based rotation for smooth transitions:
- Prevents gimbal lock
- Ensures consistent orientation
- Smooth interpolation
- Proper rotation order preservation
```

### Mobile Optimizations
- Touch event handling
- Device-specific quality adjustments
- Responsive UI scaling
- Performance monitoring

## 🔧 Configuration

### Key Parameters
```typescript
// Timing constants in milliseconds
const TIMING = {
  FTL_CHARGE: 1500,    // Time to charge FTL drive
  SCROLL_DELAY: 900,   // Delay before page scroll
  JUMP_RESET: 1000,    // Time before resetting after jump
  TRANSITION: 300      // State transition duration
} as const;

// Movement parameters
TURBO_FOV: 55           // Field of view during turbo
BASE_FOV: 40           // Normal field of view
LERP_FACTOR: 0.1       // Movement interpolation factor
```

## 🎮 Controls

### Mouse/Touch
- Hold button to charge FTL drive
- Move mouse/touch to control ship
- Release to cancel charge (if not jumped)

### States
1. **Normal**: Standard movement control
2. **Charging**: Building up FTL energy
3. **Jump**: FTL movement active
4. **Reset**: Returning to normal state

## 🔍 Implementation Notes

### Critical Considerations
- Quaternion usage for rotation stability
- Proper cleanup of animations and timers
- Performance monitoring and optimization
- Smooth state transitions
- Mobile device compatibility

### Best Practices
- Efficient memory management
- Optimized render cycles
- Clean animation loops
- Proper event handling
- Responsive design principles
