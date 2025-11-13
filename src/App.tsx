// App.tsx
import { useState } from "react";
import {
  Reality,
  SceneGraph,
  ModelAsset,
  ModelEntity,
  UnlitMaterial,
  BoxEntity,
} from "@webspatial/react-sdk";
import SecondPage from './SecondPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";

export default function App() {
  // Optional: simple rotation to prove it's "alive"
  const [rot, setRot] = useState({ x: 0, y: 0, z: 0 });

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
            <div style={{ width: "100vw", height: "100vh" }}>
              <p>Humming Bird</p>
              <img src='/models/logo.jpg' alt="logo" enable-xr className="imagetest"/>
              <Reality
                style={{
                  width: "100%",
                  height: "100%",
                  "--xr-depth": 100, // depth in meters
                }}
              >
                {/* 1. Define materials first */}
                <UnlitMaterial id="floorMat" color="#444444" />
                
                {/* 2. Load models (optional) */}
                <ModelAsset 
                  id="bird" 
                  src='/models/bird.usdz'
                />

                {/* 3. Scene content */}
                <SceneGraph>
                  {/* Floor box */}
                  <BoxEntity
                    materials={["floorMat"]}
                    width={1.5}
                    height={0.02}
                    depth={1.5}
                    position={{ x: 0, y: -0.3, z: 0 }}
                  />

                  {/* 3D model instance */}
                  <ModelEntity
                    model="bird"
                    position={{ x: 0, y: 0, z: 0.3 }}
                    rotation={rot}
                    scale={{ x: 0.5, y: 0.5, z: 0.5 }}
                    onSpatialTap={(e) => {
                      setRot((prev) => ({ ...prev, y: prev.y + Math.PI / 4 }));
                      console.log("3D position:", e.detail.location3D);
                    }}
                  />
                </SceneGraph>
              </Reality>
              <p className="read-the-docs">
                      Click the button to open second scene
                    </p>
                    <button
                    className='spatialbutton'
                    enable-xr
                      onClick={() => {
                        initScene("secondScene", prevConfig => {
                          return {
                            ...prevConfig,
                            defaultSize: {
                              width: 1000,
                              height: 1000,
                            },
                          };
                        });
                        window.open(`${__XR_ENV_BASE__}/second-page`, "secondScene");
                      }}
                    >
                      Open Second Scene
                    </button>
            </div>
          }
          />
        </Routes>
      </Router>
    )
  }
