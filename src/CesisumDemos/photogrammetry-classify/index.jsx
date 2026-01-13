import {
  Cartesian3,
  Math as CesiumMath,
  CustomShader,
  HeadingPitchRoll,
  Ion,
  LightingModel,
  Matrix4,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  UniformType,
  defined
} from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Cesium3DTileset, Viewer } from 'resium';

// Shader code inline
const emptyFragmentShader = `
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {}
`;

const pbrFragmentShader = `
const int INDIVIDUAL = 0;
const int CORPORATION = 1;
const int PARTNERSHIP = 2;
const int CONDO = 3;
const int NYSTATE = 4;
const int HOISING = 5;
const int DEPENETRY = 6;
const int NYCHOUSING = 7;
const int DEPADMINI = 8;
const int NYCHEALTH = 9;
const int OTHERGOVERN = 10;
const int OTHER = 11;

void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  int featureId = fsInput.featureIds.featureId_0;

  if (featureId == INDIVIDUAL) {
    material.specular = vec3(0.98, 0.9, 0.59);
    material.roughness = 0.1;
  } else if (featureId == NYSTATE || featureId == NYCHOUSING || featureId == NYCHEALTH) {
    material.specular = vec3(0.91, 0.92, 0.92);
    material.roughness = 0.5;
  } else if (featureId == DEPENETRY || featureId == DEPADMINI) {
    material.emissive = vec3(1.0, 0.3, 0.0);
    material.alpha = 0.5;
  } else if (featureId == OTHERGOVERN || featureId == OTHER) {
    material.diffuse = mix(material.diffuse, vec3(1.0), 0.8);
    material.roughness = 0.9;
  } else {
    material.diffuse += 0.05;
    material.roughness = 0.9;
  }
}
`;

const goldenFragmentShader = `
const int NOTHING_SELECTED = 12;
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  int featureId = fsInput.featureIds.featureId_0;

  if (uSelectedFeature < NOTHING_SELECTED && featureId == uSelectedFeature) {
    material.specular = vec3(1.0, 0.85, 0.57);
    material.roughness = 0.1;
  }
}
`;

export const PhotogrammetryClassify = () => {
  const viewerRef = useRef(null);
  const tilesetRef = useRef(null);
  const [enablePicking, setEnablePicking] = useState(true);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  const typeToId = {
    Individual: 0,
    Corporation: 1,
    Partnership: 2,
    'Condo or Co-op': 3,
    'NY State': 4,
    'Housing Preservation and Development': 5,
    'Department of Energy': 6,
    'NYC Housing Authority': 7,
    'Department of Citywide Administrative Services': 8,
    'NYC Health and Hospitals': 9,
    'Other Government Agency': 10,
    Other: 11,
  };

  const NOTHING_SELECTED = 12;

  const unlitShader = new CustomShader({
    lightingModel: LightingModel.UNLIT,
    fragmentShaderText: emptyFragmentShader,
  });

  const pbrShader = new CustomShader({
    lightingModel: LightingModel.PBR,
    fragmentShaderText: pbrFragmentShader,
  });

  const goldenShader = new CustomShader({
    uniforms: {
      uSelectedFeature: {
        type: UniformType.INT,
        value: NOTHING_SELECTED,
      },
    },
    lightingModel: LightingModel.PBR,
    fragmentShaderText: goldenFragmentShader,
  });

  const handleTilesetReady = (tileset) => {
    tilesetRef.current = tileset;

    if (!viewerRef.current || !viewerRef.current.cesiumElement) return;

    const viewer = viewerRef.current.cesiumElement;
    const scene = viewer.scene;

    const translation = new Cartesian3(-1.398521324920626, 0.7823052871729486, 0.7015244410592609);
    tileset.modelMatrix = Matrix4.fromTranslation(translation);
    tileset.maximumScreenSpaceError = 8.0;
    scene.pickTranslucentDepth = true;
    scene.light.intensity = 7.0;

    // Set up camera
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(-74.2, 40.5, 4500),
      orientation: new HeadingPitchRoll(
        CesiumMath.toRadians(0.0),
        CesiumMath.toRadians(-60.0),
        CesiumMath.toRadians(0.0)
      ),
      duration: 0,
    });

    // Set default style
    tileset.style = undefined;
    tileset.customShader = unlitShader;
  };

  const handleTileLoad = (tile) => {
    const content = tile.content;
    const featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
      const feature = content.getFeature(i);
      if (feature.getProperty('Majority_Ownership_Type') !== undefined) {
        feature.setProperty(
          'typeId',
          typeToId[feature.getProperty('Majority_Ownership_Type')]
        );
      }
    }
  };

  useEffect(() => {
    if (!viewerRef.current || !viewerRef.current.cesiumElement) return;

    const viewer = viewerRef.current.cesiumElement;
    const scene = viewer.scene;

    const nameOverlay = document.createElement('div');
    viewer.container.appendChild(nameOverlay);
    Object.assign(nameOverlay.style, {
      display: 'none',
      position: 'absolute',
      bottom: '0',
      left: '0',
      pointerEvents: 'none',
      padding: '4px',
      color: 'white',
      backgroundColor: 'black',
      whiteSpace: 'pre-line',
      fontSize: '12px',
    });

    const handler = new ScreenSpaceEventHandler(scene.canvas);

    handler.setInputAction((movement) => {
      if (enablePicking) {
        const pickedObject = scene.pick(movement.endPosition);
        if (pickedObject?.content?.batchTable !== undefined) {
          nameOverlay.style.display = 'block';
          nameOverlay.style.bottom = `${scene.canvas.clientHeight - movement.endPosition.y}px`;
          nameOverlay.style.left = `${movement.endPosition.x}px`;
          const ownership = pickedObject.getProperty('Majority_Ownership_Type');
          const message = `Ownership: ${ownership}\nFeature ID: ${pickedObject.featureId}`;
          nameOverlay.textContent = message;
        } else {
          nameOverlay.style.display = 'none';
        }
      } else {
        nameOverlay.style.display = 'none';
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction((movement) => {
      if (enablePicking) {
        const pickedObject = scene.pick(movement.position);
        if (defined(pickedObject) && defined(pickedObject.featureId)) {
          goldenShader.setUniform('uSelectedFeature', pickedObject.featureId);
        } else {
          goldenShader.setUniform('uSelectedFeature', NOTHING_SELECTED);
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
      if (nameOverlay.parentNode) {
        nameOverlay.parentNode.removeChild(nameOverlay);
      }
    };
  }, [enablePicking]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Viewer
        full
        ref={viewerRef}
        infoBox={false}
        maximumScreenSpaceError={12}
        orderIndependentTranslucency={false}
      >
        <Cesium3DTileset
          url={Ion.IonResource.fromAssetId(75343)}
          onReady={handleTilesetReady}
          onTileLoad={handleTileLoad}
        />
      </Viewer>

      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(42, 42, 42, 0.9)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        color: 'white',
        fontSize: '14px',
        minWidth: '200px'
      }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Classification Styles</div>
        <select
          className="cesium-button"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={(e) => {
            if (!tilesetRef.current) return;
            const tileset = tilesetRef.current;
            const index = e.target.selectedIndex;

            if (index === 0) {
              // Show Classification
              tileset.style = undefined;
              tileset.customShader = unlitShader;
            } else if (index === 1) {
              // Stylized PBR Materials
              tileset.style = undefined;
              tileset.customShader = pbrShader;
            } else if (index === 2) {
              // Golden Touch
              tileset.style = undefined;
              tileset.customShader = goldenShader;
            } else if (index === 3) {
              // No Classification
              tileset.style = undefined;
              tileset.customShader = undefined;
            }
          }}
        >
          <option>Show Classification</option>
          <option>Stylized PBR Materials</option>
          <option>Golden Touch</option>
          <option>No Classification</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={enablePicking}
            onChange={(e) => setEnablePicking(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Enable picking
        </label>
      </div>
    </div>
  );
};
