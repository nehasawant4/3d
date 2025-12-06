import { Reality, SceneGraph, BoxEntity, UnlitMaterial, Entity } from '@webspatial/react-sdk';
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
        <UnlitMaterial id="front"  color="#ef4444" />  {/* red    */}
        <UnlitMaterial id="back"   color="#3b82f6" />  {/* blue   */}
        <UnlitMaterial id="left"   color="#22c55e" />  {/* green  */}
        <UnlitMaterial id="right"  color="#eab308" />  {/* yellow */}
        <UnlitMaterial id="top"    color="#a855f7" />  {/* purple */}
        <UnlitMaterial id="bottom" color="#f97316" />  {/* orange */}

        <SceneGraph>
        <Entity
          position={{ x: 0, y: 0, z: 0.9 }}             // move the whole group
          rotation={boxRotation}   // spin the whole group
          scale={{ x: 1, y: 1, z: 1 }}                  // scale whole group
        >
          {/* Box 1 */}
          <BoxEntity
            materials={['top']}
            width={0.1}
            height={0.1}
            depth={0.1}
            position={{ x: 0, y: 0, z: 0 }}
          />

          {/* Box 2 (offset on X) */}
          <BoxEntity
            materials={['left']}
            width={0.1}
            height={0.1}
            depth={0.1}
            position={{ x: 0.15, y: 0, z: 0 }}
          />
        </Entity>
        </SceneGraph>
      </Reality>
    );
  }
  