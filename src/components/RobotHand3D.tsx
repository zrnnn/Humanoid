import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder, Sphere, Environment, SpotLight } from '@react-three/drei';
import * as THREE from 'three';


// Flat ellipse shadow beneath the robot — black radial gradient fading to transparent
function ShadowEllipse() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Draw the bright spotlight pool (white glowing circle)
    const poolGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    poolGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    poolGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    poolGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = poolGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Draw the dark contact shadow in the center
    const shadowGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 120);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.85)');
    shadowGrad.addColorStop(0.4, 'rgba(0,0,0,0.5)');
    shadowGrad.addColorStop(0.8, 'rgba(0,0,0,0.1)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, 0, 512, 512);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6.0, 3.5]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

// A cute but professional humanoid robot avatar
function RobotAvatar() {
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Mouse tracking ONLY — no scroll movement
    const worldOffsetX = 3.5 / (viewport.width / 2);
    const targetX = (state.pointer.x - worldOffsetX) * 1.5;
    const targetY = state.pointer.y * 1.5;
    
    // Head looks at mouse
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 0.8, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY * 0.6, 0.1);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, -targetX * 0.15, 0.1);
    }

    // Body slightly turns (sluggish)
    if (bodyRef.current) {
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, targetX * 0.4, 0.05);
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, -targetY * 0.2, 0.05);
      bodyRef.current.position.y = Math.sin(t * 2) * 0.05;
    }

    // Arms animated (idle floating)
    if (leftArmRef.current) {
       leftArmRef.current.position.y = Math.sin(t * 2.5 + 1) * 0.1 - 0.2;
       leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.1 + 0.1;
       leftArmRef.current.rotation.x = -Math.sin(t * 2) * 0.1;
    }
    
    if (rightArmRef.current) {
       rightArmRef.current.position.y = Math.cos(t * 2.5 + 2) * 0.1 - 0.2;
       rightArmRef.current.rotation.z = Math.cos(t * 1.5) * 0.1 - 0.1;
       rightArmRef.current.rotation.x = -Math.cos(t * 2) * 0.1;
    }
  });

  // High-End Modern Materials (White Glossy Plastic like EVE / AirPods)
  const whiteMat = new THREE.MeshPhysicalMaterial({ 
    color: '#f4f7ff', 
    roughness: 0.05, 
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.5,
  });
  const darkMat = new THREE.MeshPhysicalMaterial({ 
    color: '#0f172a', 
    roughness: 0.2, 
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  });
  const glowMat = new THREE.MeshBasicMaterial({ color: '#3b82f6' }); // Blue glowing eyes/core
  const accentMat = new THREE.MeshPhysicalMaterial({ 
    color: '#9aafc4', 
    roughness: 0.2, 
    metalness: 0.9,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  });

  return (
    <group position={[3.5, -0.5, 0]} scale={[0.62, 0.62, 0.62]}>
      {/* HDR Environment for realistic reflections on clearcoat plastic */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Ellipse shadow directly under the robot — radial gradient on a flat plane */}
      <ShadowEllipse />

      {/* Dramatic Spotlight from above */}
      <SpotLight 
        position={[0, 8, 2]} 
        angle={0.4} 
        penumbra={0.8} 
        intensity={25} 
        distance={20}
        color="#ffffff" 
        castShadow 
      />
      
      {/* Dim fill light from below to prevent absolute black on the underside */}
      <directionalLight position={[0, -2, 5]} intensity={0.4} color="#60a5fa" />
      
      {/* Very low global ambient */}
      <ambientLight intensity={0.15} />

      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <group ref={bodyRef}>
          {/* Main Body (More rounded/egg-like for friendliness) */}
          <RoundedBox args={[1.5, 1.7, 1.3]} radius={0.5} smoothness={4} position={[0, -0.8, 0]} castShadow receiveShadow>
             <primitive object={whiteMat} attach="material" />
          </RoundedBox>
          
          {/* Body accented chest plate */}
          <RoundedBox args={[0.8, 0.6, 0.1]} radius={0.2} smoothness={4} position={[0, -0.6, 0.63]} castShadow>
             <primitive object={darkMat} attach="material" />
          </RoundedBox>
          {/* Glowing heart/core */}
          <Sphere args={[0.12, 16, 16]} position={[0, -0.6, 0.68]}>
             <primitive object={glowMat} attach="material" />
          </Sphere>

          {/* Neck joint */}
          <Cylinder args={[0.2, 0.2, 0.3, 16]} position={[0, 0.1, 0]} castShadow>
             <primitive object={accentMat} attach="material" />
          </Cylinder>

          {/* Head (attached to neck, but animated independently) */}
          <group ref={headRef} position={[0, 0.6, 0]}>
             {/* Head geometry (wider and cuter) */}
             <RoundedBox args={[1.8, 1.3, 1.5]} radius={0.5} smoothness={4} castShadow receiveShadow>
                <primitive object={whiteMat} attach="material" />
             </RoundedBox>
             
             {/* Ear pieces (Cute circular pods instead of antennas) */}
             <Cylinder args={[0.3, 0.3, 1.9, 32]} rotation={[0, 0, Math.PI/2] as any} position={[0, 0, 0]} castShadow>
                 <primitive object={accentMat} attach="material" />
             </Cylinder>
             <Sphere args={[0.25, 16, 16]} position={[-0.95, 0, 0]}>
                 <primitive object={glowMat} attach="material" />
             </Sphere>
             <Sphere args={[0.25, 16, 16]} position={[0.95, 0, 0]}>
                 <primitive object={glowMat} attach="material" />
             </Sphere>

             {/* Visor face (Black Screen, slightly larger and curved wrapping appearance) */}
             <RoundedBox args={[1.5, 0.85, 0.2]} radius={0.25} smoothness={4} position={[0, 0, 0.7]}>
                <primitive object={darkMat} attach="material" />
                
                {/* Eyes on the Visor (Bigger, friendlier) */}
                <group position={[0, 0, 0.11]}>
                    <RoundedBox args={[0.35, 0.25, 0.05]} radius={0.1} smoothness={4} position={[-0.35, 0.1, 0]}>
                       <primitive object={glowMat} attach="material" />
                    </RoundedBox>
                    <RoundedBox args={[0.35, 0.25, 0.05]} radius={0.1} smoothness={4} position={[0.35, 0.1, 0]}>
                       <primitive object={glowMat} attach="material" />
                    </RoundedBox>
                </group>
             </RoundedBox>
          </group>

          {/* Left Arm */}
          <group ref={leftArmRef} position={[-1.1, -0.4, 0]}>
             {/* Shoulder Joint */}
             <Sphere args={[0.25, 16, 16]} position={[0, 0, 0]} castShadow>
                 <primitive object={accentMat} attach="material" />
             </Sphere>
             {/* Arm segment */}
             <RoundedBox args={[0.35, 1.0, 0.35]} radius={0.17} smoothness={4} position={[0, -0.5, 0]} castShadow>
                 <primitive object={whiteMat} attach="material" />
             </RoundedBox>
             {/* Hand / Claw placeholder */}
             <RoundedBox args={[0.25, 0.3, 0.3]} radius={0.12} smoothness={4} position={[0, -1.05, 0.05]} castShadow>
                 <primitive object={darkMat} attach="material" />
             </RoundedBox>
          </group>

          {/* Right Arm */}
          <group ref={rightArmRef} position={[1.1, -0.4, 0]}>
             {/* Shoulder Joint */}
             <Sphere args={[0.25, 16, 16]} position={[0, 0, 0]} castShadow>
                 <primitive object={accentMat} attach="material" />
             </Sphere>
             {/* Arm segment */}
             <RoundedBox args={[0.35, 1.0, 0.35]} radius={0.17} smoothness={4} position={[0, -0.5, 0]} castShadow>
                 <primitive object={whiteMat} attach="material" />
             </RoundedBox>
             {/* Hand / Claw placeholder */}
             <RoundedBox args={[0.25, 0.3, 0.3]} radius={0.12} smoothness={4} position={[0, -1.05, 0.05]} castShadow>
                 <primitive object={darkMat} attach="material" />
             </RoundedBox>
          </group>
        </group>
      </Float>
    </group>
  );
}

// Interactive, subtle particles that are repelled by the mouse
function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const { positions, originalPositions, phases, speeds } = useMemo(() => {
    const count = 750; // Reduced particles for cleaner look
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const p = new Float32Array(count);
    const s = new Float32Array(count);
    
    for(let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 15 - 5;
      
      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
      origPos[i*3] = x; origPos[i*3+1] = y; origPos[i*3+2] = z;
      
      p[i] = Math.random() * Math.PI * 2;
      s[i] = Math.random() * 0.007 + 0.003;
    }
    return { positions: pos, originalPositions: origPos, phases: p, speeds: s };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Convert normalized device coordinates (pointer) to world space roughly
    const worldOffsetX = 3.5 / (viewport.width / 2);
    const mouseX = (state.pointer.x - worldOffsetX) * (viewport.width / 2);
    const mouseY = state.pointer.y * (viewport.height / 2);
    
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for(let i = 0; i < phases.length; i++) {
      const idx = i*3;
      
      // Update original Y position (drifting upwards)
      originalPositions[idx+1] += speeds[i];
      if (originalPositions[idx+1] > 15) originalPositions[idx+1] = -15;
      
      // Base gentle bobbing motion
      const baseX = originalPositions[idx] + Math.sin(time * 0.5 + phases[i]) * 0.5;
      const baseY = originalPositions[idx+1];
      const baseZ = originalPositions[idx+2];
      
      // Mouse repulsion logic
      const dx = mouseX - baseX;
      const dy = mouseY - baseY;
      const distSq = dx*dx + dy*dy;
      const repelDistSq = 25.0; // Radius of repulsion
      
      if (distSq < repelDistSq) {
        const force = (repelDistSq - distSq) / repelDistSq; // 0 to 1
        pos[idx] = baseX - (dx * force * 0.5); // Stronger push
        pos[idx+1] = baseY - (dy * force * 0.5);
      } else {
        // Return to base position smoothly
        pos[idx] += (baseX - pos[idx]) * 0.1;
        pos[idx+1] += (baseY - pos[idx+1]) * 0.1;
      }
      pos[idx+2] = baseZ;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      {/* Thicker, more visible particles */}
      <pointsMaterial size={0.09} color="#3b82f6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas 
        eventSource={typeof window !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
        camera={{ position: [0, 0, 10], fov: 48 }}
        gl={{ antialias: true, alpha: true }} 
        shadows
      >
        <RobotAvatar />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
}
