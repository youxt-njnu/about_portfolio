import { Cartesian3, Cesium3DTileStyle, Color, Cesium3DTileset as Cesium3DTilesetCesium, EasingFunction, Ion, ScreenSpaceEventHandler, ScreenSpaceEventType, Light, defined } from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Cesium3DTileset, Viewer, Scene } from 'resium';

// 难点：
// 1.加载数据，查看要素的属性，新建属性, 按照属性类别进行着色
// 2.鼠标移动查看信息和高亮，鼠标点击查看信息和高亮
// 3.相机移动到指定位置

export const TdTilesCDB = () => {
  const viewerRef = useRef(null);
  const [terrain, setTerrain] = useState(null);
  const [building, setBuilding] = useState(null);
  const highlightedRef = useRef({ feature: undefined, originalColor: new Color() });
  const selectedRef = useRef({ feature: undefined, originalColor: new Color() });
  const [enablePicking, setEnablePicking] = useState(true);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  const cameraTransforms = {
    tileset: {
      destination: new Cartesian3(4397999.822774582, 4404502.67774069, 1397782.4709840622),
      direction: new Cartesian3(-0.29335588497705106, -0.6066709587467911, 0.7388454997917905),
      up: new Cartesian3(0.6240972421637774, 0.46391380837591956, 0.6287182283994301),
    },
    airport: {
      destination: new Cartesian3(4394719.151490939, 4402317.401942875, 1406608.6602404779),
      direction: new Cartesian3(0.4146699515908668, -0.8887814163588482, 0.1952342828060377),
      up: new Cartesian3(0.8415067525520951, 0.4561872920946922, 0.28941240460723),
    },
    crater: {
      destination: new Cartesian3(4398179.160380196, 4402518.469409466, 1399161.7612076725),
      direction: new Cartesian3(-0.2800903637088597, -0.6348021519070498, 0.7201219452923355),
      up: new Cartesian3(0.6319189548885261, 0.4427783126727723, 0.6361020360596605),
    },
    port: {
      destination: new Cartesian3(4399698.85724341, 4399019.639078034, 1405153.7766045567),
      direction: new Cartesian3(-0.5651458936543287, 0.17696574231117793, -0.8057873447342694),
      up: new Cartesian3(0.4886488937394081, 0.8587605935024302, -0.15411846642958343),
    },
  };

  const buildingStyles = new Cesium3DTileStyle({
    color: {
      conditions: [
        ['${HGT}!== undefined && ${HGT}<1', "color('red')"],
        ['${HGT}!== undefined && ${HGT}>=1 && ${HGT}<3', "color('yellow')"],
        ['${HGT}!== undefined && ${HGT}>=3 && ${HGT}<5', "color('green')"],
        ['${HGT}!== undefined && ${HGT}>=5 && ${HGT}<10', "color('blue')"],
        ['${HGT}!== undefined && ${HGT}>=10', "color('black')"],
        ['true', "color('white')"],
      ],
    },
  });

  const terrainStyle = new Cesium3DTileStyle({
    color: {
      // ["${name} === 'OCEAN'", "color('#436d9d')"],
      // ["${name} === 'LAKE'", "color('#3987c9')"],
      // ["${name} === 'CALCAREOUS'", "color('#BBB6B1')"],
      // ["${name} === 'GRASS'", "color('#567d46')"],
      // ["${name} === 'FOREST'", "color('green')"],
      // ["${name} === 'CITY'", "color('lightgray')"],
      // ["${name} === 'ASPHALTROAD'", "color('#434343')"],
      // ["${name} === 'ASPHALT'", "color('#463d39')"],
      // ["${name} === 'CONCRETE'", "color('#b9b4ab')"],
      // ["${name} === 'DRYGROUND'", "color('#9B7653')"],
      // ["${name} === 'WETGROUND'", "color('#5a4332')"],
      // ["${name} === 'SAND'", "color('gold')"],
      conditions: [['true', "color('#9B7653')"]],
    },
  });

  const flyCameraTo = (transform, duration = 2.0) => {
    if (!viewerRef.current || !viewerRef.current.cesiumElement) return;
    const viewer = viewerRef.current.cesiumElement;
    viewer.camera.flyTo({
      destination: transform.destination,
      duration: duration,
      orientation: {
        direction: transform.direction,
        up: transform.up,
      },
      easingFunction: EasingFunction.QUADRATIC_IN_OUT,
    });
  };

  const resetHighlight = () => {
    if (defined(selectedRef.current.feature)) {
      selectedRef.current.feature.color = selectedRef.current.originalColor;
      selectedRef.current.feature = undefined;
    }
    if (defined(highlightedRef.current.feature)) {
      highlightedRef.current.feature.color = highlightedRef.current.originalColor;
      highlightedRef.current.feature = undefined;
    }
  };

  const handleTerrainReady = (tileset) => {
    setTerrain(tileset);
  };

  const handleBuildingReady = (tileset) => {
    setBuilding(tileset);
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;
      viewer.camera.flyTo({
        duration: 0,
        destination: cameraTransforms.tileset.destination,
        orientation: {
          direction: cameraTransforms.tileset.direction,
          up: cameraTransforms.tileset.up,
        },
      });
    }
  };

  const handleBuildingTileVisible = (tile) => {
    const content = tile.content;
    const featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
      const feature = content.getFeature(i);
      if (feature.getProperty('cesium#estimatedHeight') !== undefined) {
        feature.setProperty('HGT', feature.getProperty('cesium#estimatedHeight'));
      }
    }
  };

  useEffect(() => {
    if (!viewerRef.current || !viewerRef.current.cesiumElement) return;

    const viewer = viewerRef.current.cesiumElement;

    const handler = new ScreenSpaceEventHandler(scene.canvas);

    const metadataOverlay = document.createElement('div');
    viewer.container.appendChild(metadataOverlay);
    metadataOverlay.className = 'backdrop';
    Object.assign(metadataOverlay.style, {
      display: 'none',
      position: 'absolute',
      bottom: '0',
      left: '0',
      pointerEvents: 'none',
      padding: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      whiteSpace: 'pre-line',
      fontSize: '16px',
      borderRadius: '4px',
      color: 'white',
    });

    // Mouse move handler - highlight buildings
    handler.setInputAction((movement) => {
      if (enablePicking) {
        if (defined(highlightedRef.current.feature)) {
          highlightedRef.current.feature.color = highlightedRef.current.originalColor;
          highlightedRef.current.feature = undefined;
        }

        const feature = scene.pick(movement.endPosition);
        const featurePicked = feature?.content?.batchTable !== undefined;
        const isBuildingFeature = featurePicked && feature.hasProperty('cesium#estimatedHeight');

        if (isBuildingFeature) {
          if (feature !== selectedRef.current.feature) {
            highlightedRef.current.feature = feature;
            Color.clone(feature.color, highlightedRef.current.originalColor);
            feature.color = Color.YELLOW;
          }
        }
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    // Left click handler - select buildings
    handler.setInputAction((movement) => {
      if (defined(selectedRef.current.feature)) {
        selectedRef.current.feature.color = selectedRef.current.originalColor;
        selectedRef.current.feature = undefined;
      }

      const feature = scene.pick(movement.position);
      const featurePicked = feature?.content?.batchTable !== undefined;
      const isBuildingFeature = featurePicked && feature.hasProperty('cesium#estimatedHeight');

      if (isBuildingFeature) {
        if (feature === selectedRef.current.feature) return;

        selectedRef.current.feature = feature;

        if (feature === highlightedRef.current.feature) {
          Color.clone(highlightedRef.current.originalColor, selectedRef.current.originalColor);
          highlightedRef.current.feature = undefined;
        } else {
          Color.clone(feature.color, selectedRef.current.originalColor);
        }
        feature.color = Color.LIME;

        let tableHtml = "<table class='cesium-infoBox-defaultTable'>";
        tableHtml += '<tr><th>Property Name</th><th>Value</th></tr><tbody>';
        const propertyIds = feature.getPropertyIds();
        for (let i = 0; i < propertyIds.length; i++) {
          const propertyId = propertyIds[i];
          const propertyValue = feature.getProperty(propertyId);
          if (propertyValue !== undefined) {
            tableHtml += `<tr style='font-family: monospace;'><th>${propertyId}</th><td>${propertyValue}</td></tr>`;
          }
        }
        tableHtml += "<tr><th colspan='4'><i style='font-size:10px'>Hover on a row for description</i></th></tr></tbody></table>";
        viewer.selectedEntity = { description: tableHtml };
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    // Hide metadata overlay when mouse over infobox
    const infoBoxContainer = document.getElementsByClassName('cesium-viewer-infoBoxContainer')[0];
    if (infoBoxContainer) {
      infoBoxContainer.onmouseover = () => {
        metadataOverlay.style.display = 'none';
      };
    }

    return () => {
      handler.destroy();
      if (metadataOverlay.parentNode) {
        metadataOverlay.parentNode.removeChild(metadataOverlay);
      }
    };
  }, [enablePicking]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Viewer
        full
        ref={viewerRef}
        shadows={true}
        shouldAnimate={true}
      >
        <Scene
          light={new Light({ intensity: 7.0 })}
        />
        <Cesium3DTileset
          url={Cesium3DTilesetCesium.fromIonAssetId(2275207)}
          onReady={handleTerrainReady}
        />
        <Cesium3DTileset
          url={Cesium3DTilesetCesium.fromIonAssetId(96188)}
          maximumScreenSpaceError={12}
          onReady={handleBuildingReady}
          onTileVisible={handleBuildingTileVisible}
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
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Camera Views</div>
        <select
          className="cesium-button"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={(e) => {
            const views = ['tileset', 'airport', 'crater', 'port'];
            flyCameraTo(cameraTransforms[views[e.target.selectedIndex]]);
          }}
        >
          <option>Overview</option>
          <option>Airport</option>
          <option>Crater</option>
          <option>Port</option>
        </select>

        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Styles</div>
        <select
          className="cesium-button"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={(e) => {
            resetHighlight();
            const index = e.target.selectedIndex;
            if (building && terrain) {
              if (index === 0) {
                building.style = undefined;
                terrain.style = undefined;
              } else if (index === 1) {
                building.style = buildingStyles;
                terrain.style = undefined;
              } else if (index === 2) {
                building.style = undefined;
                terrain.style = terrainStyle;
              }
            }
          }}
        >
          <option>No style</option>
          <option>Style buildings by height</option>
          <option>Style terrain by materials</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={enablePicking}
            onChange={(e) => setEnablePicking(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Enable terrain picking
        </label>
      </div>
    </div>
  );
};
