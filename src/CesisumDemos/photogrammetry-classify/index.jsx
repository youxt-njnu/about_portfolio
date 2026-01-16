import {
  Cartesian3,
  Cesium3DTileColorBlendMode,
  defined,
  Ion,
  IonResource,
  Matrix4,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType
} from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Cesium3DTileset, Viewer } from 'resium';
import {
  goldenShader,
  multipleFeatureShader,
  NOTHING_SELECTED,
  pbrShader,
  unlitShader,
} from './shader';
import { adjustGUI, destroyGUI, viewCameraChanged } from './viewChange';


const setDefaultStyle = (tileset) => {
  Object.assign(tileset, {
    style: undefined,
    customShader: unlitShader,
    colorBlendMode: Cesium3DTileColorBlendMode.HIGHLIGHT,
    colorBlendAmount: 0.5,
  });
}

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

  const handleTilesetReady = (tileset) => {
    tilesetRef.current = tileset;

    if (!viewerRef.current || !viewerRef.current.cesiumElement) return;

    const viewer = viewerRef.current.cesiumElement;
    const scene = viewer.scene;

    const translation = new Cartesian3(-1.398521324920626, 0.7823052871729486, 0.7015244410592609);
    tileset.modelMatrix = Matrix4.fromTranslation(translation);
    tileset.maximumScreenSpaceError = 8.0; // todo 和上面的那个参数有什么关系
    scene.pickTranslucentDepth = true;
    scene.light.intensity = 7.0;

    viewCameraChanged(viewer);
    setDefaultStyle(tileset);

    // Drive time uniform for Golden shader animations
    scene.postRender.addEventListener((_, time) => {
      goldenShader.setUniform('uTime', time.secondsOfDay);
    });
  };

  // 设置新的属性，并保证是shader里可以用的整数
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
    let handler, nameOverlay;
    requestAnimationFrame(() => {
      if (!viewerRef.current || !viewerRef.current.cesiumElement) return;

      const viewer = viewerRef.current.cesiumElement;
      const scene = viewer.scene;

      nameOverlay = document.createElement('div');
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
      adjustGUI(viewer);

      handler = new ScreenSpaceEventHandler(scene.canvas);

      handler.setInputAction((movement) => {
        if (enablePicking) {
          const pickedObject = scene.pick(movement.endPosition);
          // console.log(pickedObject) // 通过打印，发现数据类型是Cesium3DTileContent，所以不是鼠标交互的问题，是数据类型的问题，换了一套3dtileset
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
            unlitShader.setUniform('uSelectedFeature', pickedObject.featureId);
            multipleFeatureShader.setUniform('uSelectedFeature', pickedObject.featureId);
          } else {
            goldenShader.setUniform('uSelectedFeature', NOTHING_SELECTED);
            unlitShader.setUniform('uSelectedFeature', NOTHING_SELECTED);
            multipleFeatureShader.setUniform('uSelectedFeature', NOTHING_SELECTED);
          }
        }
      }, ScreenSpaceEventType.LEFT_CLICK);
    });
    return () => {
      handler.destroy();
      if (nameOverlay.parentNode) {
        nameOverlay.parentNode.removeChild(nameOverlay);
      }
      destroyGUI();
    };
  }, [enablePicking]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Viewer
        full
        ref={viewerRef}
        infoBox={false}
        maximumScreenSpaceError={12}// Higher values will provide better performance, lower values will provide higher visual quality.
        orderIndependentTranslucency={false} // If true and the configuration supports it, use order independent translucency.
      >
        {/* load 3d tiles photogrammetry */}
        <Cesium3DTileset
          url={IonResource.fromAssetId(75343)}
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
              setDefaultStyle(tileset);
            } else if (index === 1) {
              // show Alternative Classification
              setDefaultStyle(tileset);
              // tileset.customShader = ;
            } else if (index === 2) {
              // Translucent Windows
              setDefaultStyle(tileset);
              // tileset.customShader = ;
            }
            else if (index === 3) {
              // Stylized PBR Materials
              setDefaultStyle(tileset);
              tileset.customShader = pbrShader;
            } else if (index === 4) {
              // Golden Touch
              setDefaultStyle(tileset);
              tileset.customShader = goldenShader;
            } else if (index === 5) {
              // Multiple Feature ID sets
              setDefaultStyle(tileset);
              tileset.customShader = multipleFeatureShader;
            } else if (index === 6) {
              // No Classification
              setDefaultStyle(tileset);
            }
          }}
        >
          <option>Show Classification</option>
          <option>Show Alternative Classification</option>
          <option>Translucent Windows</option>
          <option>Stylized PBR Materials</option>
          <option>Golden Touch</option>
          <option>Multiple Feature ID sets</option>
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
