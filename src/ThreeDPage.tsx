import { Reality, SceneGraph, BoxEntity, UnlitMaterial } from '@webspatial/react-sdk';

export default function ThreeDPage() {
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
            width={0.3}
            height={0.3}
            depth={0.3}
            position={{ x: 0, y: 0, z: 0.4 }}
          />
        </SceneGraph>
      </Reality>
    );
  }
  