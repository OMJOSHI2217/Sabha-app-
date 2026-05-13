import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Import custom images from target directory
import imgAdmission from '../images/Admission.png';
import imgExam from '../images/Exam.png';
import imgIncrement from '../images/Increment.png';
import imgInterview from '../images/Interview.png';
import imgResults from '../images/Results.png';
import imgStudentCareer from '../images/Student Career.png';
import imgWife from '../images/Wife.png';

// Landmarks lookup for placement
const FOREHEAD = 10;
const LEFT_CHEEK = 234;
const RIGHT_CHEEK = 454;
const CHIN = 152;

// Milestone metadata configuration and relative sequence order
const MILESTONES = [
  { id: "Student Career", label: "🎓 Student Career", img: imgStudentCareer },
  { id: "Admission", label: "📝 Admission", img: imgAdmission },
  { id: "Exam", label: "✍️ Exam", img: imgExam },
  { id: "Results", label: "🏆 Results", img: imgResults },
  { id: "Interview", label: "👔 Interview", img: imgInterview },
  { id: "Increment", label: "💰 Increment", img: imgIncrement },
  { id: "Wife", label: "❤️ Wife", img: imgWife }
];

// 🧺 Premium Handcrafted Procedural 3D Woven Basket
const ProceduralBasket = () => {
  const height = 0.85;
  const rBase = 0.76;
  const rTop = 1.05;
  const ribCount = 36;
  const ringCount = 9;
  
  const slantHeight = Math.sqrt(height * height + Math.pow(rTop - rBase, 2));
  const tiltAngle = Math.atan2(rTop - rBase, height);
  const midRadius = (rBase + rTop) / 2;

  const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#8b5a2b', 
    roughness: 0.55, 
    metalness: 0.2 
  }), []);

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#e5b83c', 
    roughness: 0.28, 
    metalness: 0.78, 
    emissive: '#442200', 
    emissiveIntensity: 0.12 
  }), []);

  const darkWoodMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#5a3a1a', 
    roughness: 0.8 
  }), []);

  const handleCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.95, height - 0.05, 0.55),
    new THREE.Vector3(0.45, height + 0.35, 0.85),
    new THREE.Vector3(0, height + 0.52, 0.92),
    new THREE.Vector3(-0.45, height + 0.35, 0.85),
    new THREE.Vector3(-0.95, height - 0.05, 0.55)
  ]), [height]);

  const pebbleData = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      pos: [
        (Math.random() - 0.5) * 1.2,
        0.08 + Math.random() * 0.32,
        (Math.random() - 0.5) * 1.2
      ],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.04 + Math.random() * 0.015
    }));
  }, []);

  return (
    <group position={[0, -0.12, 0]}>
      <mesh position={[0, 0.02, 0]} receiveShadow castShadow material={darkWoodMat}>
        <cylinderGeometry args={[rBase - 0.02, rBase - 0.02, 0.07, 32]} />
      </mesh>

      {Array.from({ length: ribCount }).map((_, i) => {
        const angle = (i / ribCount) * Math.PI * 2;
        return (
          <mesh 
            key={`rib-${i}`} 
            position={[Math.cos(angle) * midRadius, height / 2, Math.sin(angle) * midRadius]} 
            rotation={[tiltAngle * 0.7, 0, -angle]} 
            castShadow
            material={woodMat}
          >
            <cylinderGeometry args={[0.028, 0.028, slantHeight, 6]} />
          </mesh>
        );
      })}

      {Array.from({ length: ringCount }).map((_, i) => {
        const t = i / (ringCount - 1);
        const yPos = t * height;
        const ringRad = rBase + (rTop - rBase) * t;
        const isGold = (i % 3 === 1);
        return (
          <mesh 
            key={`ring-${i}`} 
            position={[0, yPos, 0]} 
            rotation={[Math.PI / 2, 0, 0]} 
            castShadow
            material={isGold ? goldMat : woodMat}
          >
            <torusGeometry args={[ringRad, isGold ? 0.023 : 0.018, 24, 80]} />
          </mesh>
        );
      })}

      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={woodMat}>
        <torusGeometry args={[rTop, 0.058, 24, 96]} />
      </mesh>
      <mesh position={[0, height + 0.025, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={goldMat}>
        <torusGeometry args={[rTop - 0.02, 0.024, 16, 96]} />
      </mesh>

      <mesh castShadow material={woodMat}>
        <tubeGeometry args={[handleCurve, 28, 0.048, 10, false]} />
      </mesh>
      <mesh castShadow material={goldMat}>
        <tubeGeometry args={[handleCurve, 28, 0.02, 8, false]} />
      </mesh>

      {pebbleData.map((peb, i) => (
        <mesh key={`peb-${i}`} position={peb.pos} rotation={peb.rot} castShadow>
          <dodecahedronGeometry args={[peb.scale]} />
          <meshStandardMaterial color="#9e8b72" roughness={0.65} />
        </mesh>
      ))}
    </group>
  );
};

// 🌟 Floating Stardust Effect
const MagicalDust = () => {
  const pointsRef = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 2.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#dbbc87" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// 🚀 Primary Exported AR Interface
const BasketModel = ({ faceIndex = 0, faceDataRef, isFrontCamera = true }) => {
  const groupRef = useRef();
  const basketRef = useRef();
  const glowRef = useRef();
  const spotRef = useRef();
  const { viewport } = useThree();

  // Load 7 user milestone textures from folder
  const texAdmission = useTexture(imgAdmission);
  const texExam = useTexture(imgExam);
  const texIncrement = useTexture(imgIncrement);
  const texInterview = useTexture(imgInterview);
  const texResults = useTexture(imgResults);
  const texStudentCareer = useTexture(imgStudentCareer);
  const texWife = useTexture(imgWife);

  // Map loaded textures to keys
  const textures = useMemo(() => ({
    "Student Career": texStudentCareer,
    "Admission": texAdmission,
    "Exam": texExam,
    "Results": texResults,
    "Interview": texInterview,
    "Increment": texIncrement,
    "Wife": texWife,
  }), [texStudentCareer, texAdmission, texExam, texResults, texInterview, texIncrement, texWife]);

  // Interactive Milestone Selection State
  const [selectedItems, setSelectedItems] = useState({
    "Student Career": true,
    "Admission": false,
    "Exam": false,
    "Results": false,
    "Interview": false,
    "Increment": false,
    "Wife": false,
  });

  // Smooth dynamic basket growth interpolation
  const currentScaleRef = useRef(1.0);

  const toggleItem = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Generate sequential list of selected items preservation chronologic stack order
  const activeSelected = useMemo(() => {
    return MILESTONES.filter(m => selectedItems[m.id]);
  }, [selectedItems]);

  useFrame((state) => {
    // 1. Animate basket growth based on number of selected stones (12% boost per milestone)
    const targetBasketScale = 1.0 + activeSelected.length * 0.12;
    currentScaleRef.current = THREE.MathUtils.lerp(currentScaleRef.current, targetBasketScale, 0.12);

    if (basketRef.current) {
      basketRef.current.scale.setScalar(currentScaleRef.current);
    }

    // 2. Track face positioning
    if (!faceDataRef?.current || !groupRef.current) return;

    const faceLandmarks = faceDataRef.current[faceIndex];

    if (!faceLandmarks) {
      groupRef.current.visible = THREE.MathUtils.lerp(groupRef.current.visible ? 1 : 0, 0, 0.1) > 0.05;
      return;
    }

    groupRef.current.visible = true;

    // Subtle lighting heartbeat updates
    const time = state.clock.elapsedTime;
    if (glowRef.current) {
      glowRef.current.intensity = 1.3 + Math.sin(time * 3.5) * 0.25;
    }
    if (spotRef.current) {
      spotRef.current.intensity = 0.9 + Math.sin(time * 2.0) * 0.15;
    }

    const getPoint = (idx) => {
      const pt = faceLandmarks[idx];
      if (!pt) return { x: 0.5, y: 0.5, z: 0 };
      return {
        x: isFrontCamera ? 1.0 - pt.x : pt.x,
        y: pt.y,
        z: pt.z
      };
    };

    const pLeft = getPoint(LEFT_CHEEK);
    const pRight = getPoint(RIGHT_CHEEK);
    const pForehead = getPoint(FOREHEAD);
    const pChin = getPoint(CHIN);

    const faceWidth = Math.sqrt(
      Math.pow(pRight.x - pLeft.x, 2) + Math.pow(pRight.y - pLeft.y, 2) + Math.pow(pRight.z - pLeft.z, 2)
    );

    const faceHeight = Math.sqrt(
      Math.pow(pForehead.x - pChin.x, 2) + Math.pow(pForehead.y - pChin.y, 2) + Math.pow(pForehead.z - pChin.z, 2)
    );

    const vRight = new THREE.Vector3(pRight.x - pLeft.x, -(pRight.y - pLeft.y), pRight.z - pLeft.z).normalize();
    const vUpRaw = new THREE.Vector3(pForehead.x - pChin.x, -(pForehead.y - pChin.y), pForehead.z - pChin.z).normalize();
    const vForward = new THREE.Vector3().crossVectors(vRight, vUpRaw).normalize();
    const vUp = new THREE.Vector3().crossVectors(vForward, vRight).normalize();

    const x = (pForehead.x - 0.5) * viewport.width;
    const y = -(pForehead.y - 0.5) * viewport.height;
    const z = pForehead.z * -11.5;

    const headPos = new THREE.Vector3(x, y, z);
    const upwardOffset = faceHeight * (viewport.height * 0.22); 
    const targetPos = headPos.clone().addScaledVector(vUp, upwardOffset);

    const baseScale = viewport.width * 0.46; 
    const targetScaleFactor = faceWidth * baseScale;
    const targetScale = new THREE.Vector3(targetScaleFactor, targetScaleFactor, targetScaleFactor);

    const damping = 0.25;
    groupRef.current.position.lerp(targetPos, damping);
    groupRef.current.scale.lerp(targetScale, damping);

    const rotMat = new THREE.Matrix4();
    rotMat.makeBasis(vRight, vUp, vForward);
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(rotMat);
    groupRef.current.quaternion.slerp(targetQuat, damping);
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 📺 Floating DOM Checklist Dashboard Dashboard */}
      <Html fullscreen style={{ pointerEvents: 'none', userSelect: 'none' }}>
        
        {/* 🏆 Interactive Checklist Sidebar Container */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-950/85 backdrop-blur-xl p-4 rounded-3xl border border-amber-500/30 text-amber-400 font-mono shadow-2xl z-50 flex flex-col gap-2 pointer-events-auto select-none w-44 md:w-52 max-h-[80vh] transition-all duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10">
          <div className="font-bold text-xs tracking-widest border-b border-amber-500/30 pb-2 mb-1 text-center uppercase text-amber-500">
            🎯 Milestones
          </div>
          
          {MILESTONES.map((m) => (
            <label
              key={m.id}
              className={`flex items-center gap-2.5 text-[11px] md:text-xs cursor-pointer py-2 px-2.5 rounded-xl transition-all duration-200 ${
                selectedItems[m.id] 
                  ? "bg-amber-500/15 text-white shadow-inner border border-amber-500/20" 
                  : "text-stone-400 hover:bg-white/5 border border-transparent"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedItems[m.id]}
                onChange={() => toggleItem(m.id)}
                className="accent-amber-500 w-4.5 h-4.5 cursor-pointer shrink-0 rounded"
              />
              <span className="truncate select-none">{m.label}</span>
            </label>
          ))}
        </div>

        {/* 📦 Size indicator Badge */}
        <div className="absolute bottom-24 right-5 bg-stone-950/75 backdrop-blur-md border border-amber-500/30 px-4 py-1.5 rounded-2xl text-amber-400 text-[11px] md:text-xs font-mono z-50 font-bold shadow-lg">
          📦 Basket Size: <span className="text-white">{currentScaleRef.current.toFixed(2)}x</span>
        </div>

        {/* 🎯 Top Notification Message */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 text-stone-300 text-[10px] md:text-xs px-4 py-1.5 rounded-full font-mono select-none text-center z-50 tracking-wide shadow-md">
          ✨ Stack your life stones inside the basket ✨
        </div>
      </Html>

      {/* 1. 🧺 Scaling Procedural Basket */}
      <group ref={basketRef}>
        <ProceduralBasket />
      </group>

      {/* 2. 🪨 3D Selected Milestone Pictures Stack */}
      <group>
        {activeSelected.length === 0 ? (
          // Prompt when nothing is selected
          <Html center position={[0, 0.8, 0.1]} distanceFactor={4.5}>
            <div className="text-amber-500/70 font-mono text-xs italic tracking-widest whitespace-nowrap bg-stone-950/80 px-5 py-2.5 rounded-full border border-amber-500/30 shadow-2xl animate-pulse select-none pointer-events-none">
              💡 Select milestones to start!
            </div>
          </Html>
        ) : (
          // The 3D Stacked Stones
          activeSelected.map((item, index) => {
            const texture = textures[item.id];
            
            // Vertical distribution
            const yPos = 0.35 + index * 0.38;
            
            // Alternating tilt variables for handmade realism
            const xOffset = (index % 2 === 0 ? -0.03 : 0.03);
            const zOffset = 0.15 + (index * 0.01); 
            const zRot = (index % 2 === 0 ? -0.035 : 0.035);
            const xRot = (isFrontCamera ? 1 : -1) * (Math.PI / 14);

            return (
              <mesh 
                key={item.id}
                position={[xOffset, yPos, zOffset]}
                rotation={[xRot, isFrontCamera ? Math.PI : 0, zRot]}
                castShadow
                receiveShadow
              >
                {/* Perfectly proportioned 3:2 aspect ratio cards matching your 1800x1200 source files */}
                <planeGeometry args={[1.35, 0.9]} />
                <meshStandardMaterial 
                  map={texture}
                  bumpMap={texture}
                  bumpScale={0.05}
                  transparent={true}
                  alphaTest={0.22}
                  side={THREE.FrontSide}
                  roughness={0.75}
                  metalness={0.1}
                />
              </mesh>
            );
          })
        )}
      </group>

      {/* 3. 🌟 Particle Atmosphere */}
      <MagicalDust />

      {/* 4. 💡 Dynamic Setup */}
      <ambientLight intensity={0.7} color="#404060" />
      
      <pointLight 
        ref={glowRef}
        color="#d48c54" 
        intensity={1.3} 
        distance={4.5} 
        position={[0, 0.8, 0.25]} 
        castShadow 
      />

      <spotLight 
        ref={spotRef}
        color="#ffdd99" 
        intensity={0.9} 
        position={[0, 3.5, 0.9]} 
        castShadow 
      />
      
      <pointLight color="#88aaff" intensity={0.5} position={[-1.2, 2.5, -2]} />
    </group>
  );
};

// Preload massive assets for lag-free rendering
MILESTONES.forEach(m => {
  useTexture.preload(m.img);
});

export default BasketModel;
