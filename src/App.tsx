import React, { useState, useEffect } from 'react';
import {
  Reality,
  SceneGraph,
  BoxEntity,
  ModelAsset,
  ModelEntity,
  UnlitMaterial,
  Model,
} from '@webspatial/react-sdk';
import { initScene } from "@webspatial/react-sdk";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
import ThreeDPage from "./ThreeDPage";


type Selection = 'image' | 'box' | 'static' | 'dynamic' | 'multiface';

type SelectionOption = {
  id: Selection;
  label: string;
  description: string;
  title: string;
};

const selectionOptions: SelectionOption[] = [
  {
    id: 'image',
    label: 'Image',
    description: 'Show a 2D image',
    title: 'Image Preview',
  },
  {
    id: 'box',
    label: 'Box Entity',
    description: 'Simple BoxEntity',
    title: 'Box Entity Preview',
  },
  {
    id: 'static',
    label: 'Static 3D Model',
    description: 'Render <Model>',
    title: 'Static 3D Model Preview',
  },
  {
    id: 'dynamic',
    label: 'Dynamic 3D Model Asset',
    description: 'ModelAsset + ModelEntity',
    title: 'Dynamic 3D Model Preview',
  },
  {
    id: 'multiface',
    label: 'Multi-Face Box',
    description: 'Different material on each face',
    title: 'Multi-Face Box Preview',
  },
];

// Helper: find current option
const getSelectionOption = (id: Selection) =>
  selectionOptions.find((opt) => opt.id === id)!;

const App: React.FC = () => {
  const [selection, setSelection] = useState<Selection>('box');
  const [boxRotation, setBoxRotation] = useState({ x: 0, y: 0, z: 0 });
  const [boxColor, setBoxColor] = useState<'red' | 'green'>('red');
  const [boxVersion, setBoxVersion] = useState(0);
  
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      setBoxRotation(prev => ({ ...prev, y: prev.y + 0.1 })); // spin around Y
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // All main-area rendering logic lives here
  const renderMainContent = (current: Selection) => {
    // IMAGE
    if (current === 'image') {
      return (
        <img
          src={`${__XR_ENV_BASE__}/models/logo.png`}
          alt="Preview"
          style={{
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: 16,
            border: '1px solid rgba(148,163,184,0.5)',
            objectFit: 'contain',
            background: '#0f172a',
          }}
        />
      );
    }

    // STATIC MODEL
    if (current === 'static') {
      return (
        <Model style={{ width: '400px', height: '400px' }}>
          <source src={`${__XR_ENV_BASE__}/models/bird.usdz`} type="model/vnd.usdz+zip" />
          <div>Model failed to load</div>
        </Model>
      );
    }

    // BOX + DYNAMIC MODEL share the same Reality
    return (
      <Reality
        style={{
          width: '600px',
          height: '400px',
          borderRadius: 24,
          border: '1px solid rgba(148,163,184,0.4)',
        }}
      >
        <UnlitMaterial id="red" color="#ef4444"/>
        <UnlitMaterial id="blue" color="#3b82f6" />
        <UnlitMaterial id="green" color="#22c55e" />

        <UnlitMaterial id="front"  color="#ef4444" />  {/* red    */}
        <UnlitMaterial id="back"   color="#3b82f6" />  {/* blue   */}
        <UnlitMaterial id="left"   color="#22c55e" />  {/* green  */}
        <UnlitMaterial id="right"  color="#eab308" />  {/* yellow */}
        <UnlitMaterial id="top"    color="#a855f7" />  {/* purple */}
        <UnlitMaterial id="bottom" color="#f97316" />  {/* orange */}

        {current === 'dynamic' && (
          <ModelAsset
            id="bird"
            src={`${__XR_ENV_BASE__}/models/bird.usdz`}
            onLoad={() => console.log('ModelAsset loaded')}
            onError={(err) => console.error('ModelAsset error', err)}
          />
        )}

        <SceneGraph>
          {current === 'box' && (
            <BoxEntity
              key={boxVersion}               
              materials={[boxColor]}  
              width={0.2}
              height={0.2}
              depth={0.2}
              position={{ x: 0, y: 0, z: 0.3 }}
              cornerRadius={0.02}
              onSpatialTap={(e: any) => {
                setBoxColor(prev => (prev === 'red' ? 'green' : 'red'));
                setBoxVersion(v => v + 1);    // 👈 trigger remount
                console.log('3D position:', e.detail.location3D);
                console.log('Material now:', boxColor);
              }}
              rotation={boxRotation}   
            />
          )}

        {current === 'multiface' && (
            <BoxEntity
              splitFaces={true}
              materials={[
                'front',
                'back',
                'left',
                'right',
                'top',
                'bottom',
              ]}
              width={0.2}
              height={0.2}
              depth={0.2}
              position={{ x: 0, y: 0, z: 0.3 }}
              rotation={boxRotation}   
            />
          )}

          {current === 'dynamic' && (
            <ModelEntity
              model="bird"
              scale={{ x: 0.5, y: 0.5, z: 0.5 }}
              position={{ x: 0, y: 0, z: 0.3 }}
              rotation={boxRotation} 
            />
          )}
        </SceneGraph>
      </Reality>
    );
  };

  const currentOption = getSelectionOption(selection);

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/3d-page" element={<ThreeDPage />} />

        <Route
          path="/"
          element={
            <div
              style={{
                display: 'flex',
                height: '100vh',
                background: '#050816',
                color: 'white',
              }}
            >
              {/* LEFT PANEL */}
              <aside
                style={{
                  width: 240,
                  padding: 16,
                  borderRight: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  Elements
                </h2>

                {selectionOptions.map((opt) => {
                  const isActive = selection === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelection(opt.id)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: isActive
                          ? '1px solid rgba(255,255,255,0.9)'
                          : '1px solid rgba(255,255,255,0.2)',
                        background: isActive
                          ? 'linear-gradient(135deg,#6366f1,#22d3ee)'
                          : 'rgba(15,23,42,0.9)',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {opt.description}
                      </div>
                    </button>
                  );
                })}

                {/* Navigation */}
                <h2 style={{ marginTop: 20, fontSize: 16 }}>Navigation</h2> 

                <Link
                  to="/second-page"
                  target="_blank"
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(15,23,42,0.9)',
                    color: 'white',
                    textDecoration: 'none',
                    marginBottom: 8,
                  }}
                >
                  Open Second Page (Link)
                </Link>

                <button
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(15,23,42,0.9)',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    window.open(`${__XR_ENV_BASE__}/second-page`, "secondScene")
                  }
                >
                  Open Second Page (Button)
                </button>
                <button
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(15,23,42,0.9)',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    initScene(
                      'my3DBox',
                      () => ({
                        defaultSize: {
                          width: 2,   // meters
                          height: 1,  // meters
                          depth: 1    // meters
                        }
                      }),
                      { type: 'volume' }   // 👈 This makes it a 3D Volume window
                    );
                    window.open(`${__XR_ENV_BASE__}/3d-page`, "my3DBox")
                  }}
                >
                  Open 3D Volume Scene
                </button>
              </aside>

              {/* MAIN AREA */}
              <main
                style={{
                  flex: 1,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 12 }}>
                  {currentOption.title}
                </div>

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {renderMainContent(selection)}
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
