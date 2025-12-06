import { Reality, SceneGraph, BoxEntity, UnlitMaterial, Entity,
  PlaneEntity,
  SphereEntity,
  ConeEntity,
  CylinderEntity,
 } from '@webspatial/react-sdk';
import React, { useState, useEffect } from 'react';

export default function ThreeDPage() {
  const [boxRotation, setBoxRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      setBoxRotation(prev => ({ ...prev, y: prev.y + 0.1 })); // spin around Y
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

    return (
      <Reality
        style={{
          width: '600px',
          height: '400px',
          borderRadius: 24,
          border: '1px solid rgba(148,163,184,0.4)',
        }}
      >
        {/* 6 different materials, one per face */}
        <UnlitMaterial id="red"  color="#ef4444" />  {/* red    */}
        <UnlitMaterial id="blue"   color="#3b82f6" />  {/* blue   */}
        <UnlitMaterial id="green"   color="#22c55e" />  {/* green  */}
        <UnlitMaterial id="yellow"  color="#eab308" />  {/* yellow */}
        <UnlitMaterial id="purple"    color="#a855f7" />  {/* purple */}
        <UnlitMaterial id="orange" color="#f97316" />  {/* orange */}

        <SceneGraph>
        <Entity
          position={{ x: 0, y: 0, z: 0.9 }}   // move the whole group
          scale={{ x: 1, y: 1, z: 1 }}        // scale whole group
        >

          {/* Box */}
          <BoxEntity
            materials={['purple']}
            width={0.1}
            height={0.1}
            depth={0.1}
            position={{ x: -0.15, y: 0, z: 0 }}
          />

          {/* Sphere */}
          <SphereEntity
            materials={['yellow']}
            radius={0.06}
            position={{ x: 0, y: 0, z: 0 }}
          />

          {/* Cone */}
          <ConeEntity
            materials={['green']}
            radius={0.06}
            height={0.12}
            position={{ x: 0.15, y: 0, z: 0 }}
          />

          {/* Cylinder */}
          <CylinderEntity
            materials={['blue']}
            radius={0.05}
            height={0.12}
            position={{ x: 0.3, y: 0, z: 0 }}
          />
        </Entity>
        </SceneGraph>
      </Reality>
    );
  }
  