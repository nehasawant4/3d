// App.tsx
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

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
            <div>
              <p>Humming Bird</p>
              <img src={`${__XR_ENV_BASE__}/logo.jpg`} alt="logo" enable-xr className="imagetest"/>
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
              <p>3D Model of a Humming Bird</p>
              <Reality style={{ width: '500px', height: '500px', '--xr-depth': 100 }}>
                
                <UnlitMaterial id="red" color="#ff0000" />

                <ModelAsset id="bird" src={`${__XR_ENV_BASE__}/models/bird.usdz`} />

                <SceneGraph>
                  <BoxEntity materials={['red']} width={0.2} height={0.2} depth={0.2} />
                </SceneGraph>

              </Reality>
            </div>
          }
          />
        </Routes>
      </Router>
    )
  }
