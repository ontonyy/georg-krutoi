import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// An animated, distorting knot that responds to hover and cursor position
const InteractiveKnot = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Gentle continued rotation
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

        // Slight movement towards the mouse
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.pointer.x * 2), 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.pointer.y * 2), 0.1);

        // Scale up continuously when clicked
        const targetScale = clicked ? 1.5 : (hovered ? 1.2 : 1);
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
    });

    return (
        <Float speed={2} floatIntensity={1} rotationIntensity={1}>
            <TorusKnot
                ref={meshRef}
                args={[1, 0.3, 128, 32]}
                onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
                onClick={() => setClick(!clicked)}
            >
                <MeshDistortMaterial
                    color={hovered ? "#4d79ff" : "#1e40af"}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.8}
                    roughness={0.2}
                    distort={clicked ? 0.6 : 0.3}
                    speed={clicked ? 5 : 2}
                />
            </TorusKnot>
        </Float>
    );
};

// Background particles for the scene
const SceneEnv = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
            <Environment preset="city" />
            {/* Limit user control to keep it looking cinematic */}
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </>
    );
};

const Playground: React.FC = () => {
    return (
        <section id="playground" className="py-5 position-relative bg-body" style={{ minHeight: '80vh', overflow: 'hidden' }}>
            <div className="container py-5 d-flex flex-column h-100 position-relative" style={{ zIndex: 10 }}>
                <h2 className="display-4 text-center mb-3 text-uppercase tracking-widest fw-bold text-body animate-fade-in-up">WebGL Lab</h2>
                <p className="text-center text-body opacity-75 mb-5 fs-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Interactive experimentation. Drag to rotate. Click to disrupt.
                </p>

                <div
                    className="flex-grow-1 w-100 rounded-4 overflow-hidden glass shadow-lg animate-fade-in-up position-relative"
                    style={{ animationDelay: '0.2s', height: '500px', cursor: 'pointer' }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <SceneEnv />
                        <InteractiveKnot />
                    </Canvas>

                    {/* Overlay subtle text in the corner of the canvas */}
                    <div className="position-absolute bottom-0 end-0 p-3 text-body opacity-50 user-select-none pointer-events-none small">
                        Running @react-three/fiber
                    </div>
                </div>
            </div>

            {/* Subtle gradient underneath just to anchor it */}
            <div className="position-absolute bottom-0 start-0 w-100 h-50 bg-gradient-to-t from-dark to-transparent opacity-25" style={{ zIndex: 0 }}></div>
        </section>
    );
};

export default Playground;
