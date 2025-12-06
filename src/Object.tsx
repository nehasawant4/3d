// src/DynamicPage.tsx
import React from "react";
import {
  Reality,
  SceneGraph,
  ModelAsset,
  ModelEntity,
  UnlitMaterial,
} from "@webspatial/react-sdk";

const Object: React.FC = () => {
  return (
    <div
    className="blankdiv"
    enable-xr
    >
      <Reality
        style={{
          width: "600px",
          height: "400px",
          borderRadius: 24,
          border: "1px solid rgba(148,163,184,0.4)",
        }}
      >
        <UnlitMaterial id="highlight" color="#22c55e" />

        <ModelAsset
          id="chameleon"
          src={`${__XR_ENV_BASE__}/models/chameleon.usdz`}
          onLoad={() => console.log("Dynamic bird asset loaded")}
          onError={(err) => console.error("Dynamic bird asset error", err)}
        />

        <SceneGraph>
          <ModelEntity
            model="chameleon"
            scale={{ x: 0.5, y: 0.5, z: 0.5 }}
            position={{ x: 0, y: 0, z: 0.3 }}
          />
        </SceneGraph>
      </Reality>
    </div>
  );
};

export default Object;
