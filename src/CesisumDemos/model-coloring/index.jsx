import { Cartesian3, Math as CesiumMath, Color, ColorBlendMode, FeatureDetection, HeadingPitchRoll, HeightReference, Ion, Transforms} from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'resium';

// todo 这里的shadow阴影并不支持显示（更别说是切换）
export const ModelColoring = () => {
  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  const colorBlendModes = ['Highlight', 'Replace', 'Mix'];
  const colors = ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Gray'];
  const silhouetteColors = ['Red', 'Green', 'Blue', 'Yellow', 'Gray'];
  const baseUrl = import.meta.env.BASE_URL;
  const options = [
    { url: `${baseUrl}glb-models/Parrot.glb`, height: 5.0 },
    { url: `${baseUrl}glb-models/bird.glb`, height: 5.0 },
    { url: `${baseUrl}glb-models/fox.glb`, height: 5 }
  ];


  const viewerRef = useRef(null);
  const entityRef = useRef(null);
  const [currentModelUrl, setCurrentModelUrl] = useState(`${baseUrl}glb-models/Parrot.glb`);
  const [modelHeight, setModelHeight] = useState(5000.0);
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  const [position, setPosition] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const [viewModel, setViewModel] = useState({
    colorBlendMode: 'Highlight',
    color: 'Red',
    alpha: 1.0,
    colorBlendAmount: 0.5,
    silhouetteColor: 'Red',
    silhouetteAlpha: 1.0,
    silhouetteSize: 2.0,
  });

  // 计算属性，不需要单独的 useEffect
  const colorBlendAmountEnabled = viewModel.colorBlendMode === 'Mix';

  const getColorBlendMode = (colorBlendMode) => ColorBlendMode[colorBlendMode.toUpperCase()];

  const getColor = (colorName, alpha) => {
    const color = Color[colorName.toUpperCase()];
    return Color.fromAlpha(color, parseFloat(alpha));
  };




  // 动态计算模型位置和方向
  useEffect(() => {
    const pos = Cartesian3.fromDegrees(116.46, 39.92, modelHeight);
    const heading = CesiumMath.toRadians(125);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orient = Transforms.headingPitchRollQuaternion(pos, hpr);

    setPosition(pos);
    setOrientation(orient);
  }, [modelHeight]);

  // 使用命令式 API 创建 Entity
  useEffect(() => {
    if (!viewerRef.current || !viewerRef.current.cesiumElement || !position || !orientation) {
      return;
    }

    const viewer = viewerRef.current.cesiumElement;

    // 清除已有实体
    viewer.entities.removeAll();

    // 创建新实体
    const entity = viewer.entities.add({
      name: currentModelUrl,
      position: position,
      orientation: orientation,
      heightReference: HeightReference.CLAMP_TO_GROUND, // 贴到地形上
      model: {
        uri: currentModelUrl,
        minimumPixelSize: 500,
        maximumScale: 20000,
        color: getColor(viewModel.color, viewModel.alpha),
        colorBlendMode: getColorBlendMode(viewModel.colorBlendMode),
        colorBlendAmount: parseFloat(viewModel.colorBlendAmount),
        silhouetteColor: getColor(viewModel.silhouetteColor, viewModel.silhouetteAlpha),
        silhouetteSize: parseFloat(viewModel.silhouetteSize),
        castShadows: true,  // 投射阴影
        receiveShadows: true, // 接收阴影
      }
    });

    entityRef.current = entity;
    viewer.trackedEntity = entity;

    // console.log('Entity created:', entity);
    // console.log('Model URI:', currentModelUrl);

    // 监听模型加载
    if (entity.model && entity.model.readyPromise) {
      entity.model.readyPromise.then(() => {
        console.log('Model loaded successfully!');
      }).catch((error) => {
        console.error('Model loading error:', error);
      });
    }

    return () => {
      // 清理函数
      if (viewer && !viewer.isDestroyed()) {
        viewer.entities.remove(entity);
      }
    };
  }, [currentModelUrl, position, orientation]);

  // 更新现有实体的属性
  useEffect(() => {
    if (entityRef.current && entityRef.current.model) {
      entityRef.current.model.color = getColor(viewModel.color, viewModel.alpha);
      entityRef.current.model.colorBlendMode = getColorBlendMode(viewModel.colorBlendMode);
      entityRef.current.model.colorBlendAmount = parseFloat(viewModel.colorBlendAmount);
      entityRef.current.model.silhouetteColor = getColor(viewModel.silhouetteColor, viewModel.silhouetteAlpha);
      entityRef.current.model.silhouetteSize = parseFloat(viewModel.silhouetteSize);
    }
  }, [viewModel]);

  const handleModelSelect = (index) => {
    if (index === 2 && !FeatureDetection.supportsBasis(viewerRef.current?.cesiumElement?.scene)) {
      alert('This browser does not support Basis Universal compressed textures');
      return;
    }
    // console.log(options[index].url);
    setCurrentModelUrl(options[index].url);
    setModelHeight(options[index].height);
  };

  // useEffect(() => {
  //   console.log('Position:', position);
  //   console.log('Orientation:', orientation);
  //   console.log('Model URL:', currentModelUrl);
  //   console.log('Will render entity:', !!(position && orientation));
  // }, [position, orientation, currentModelUrl]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Viewer
        full
        ref={viewerRef}
        infoBox={false}
        selectionIndicator={false}
        shadows={shadowsEnabled}
        shouldAnimate={true}
      />
      {/* Entity 现在通过命令式 API 在 useEffect 中创建 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        color: 'black',
        fontSize: '12px',
        minWidth: '300px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td colSpan={2} style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Model Selection</td>
            </tr>
            <tr>
              <td style={{ paddingBottom: '10px' }} colSpan={2}>
                <select

                  style={{ width: '100%', backgounrd: 'white', border: '1px solid #555' }}
                  onChange={(e) => handleModelSelect(e.target.selectedIndex)}
                >
                  <option>Parrot</option>
                  <option>Bird</option>
                  <option>Fox</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: '10px' }} colSpan={2}>
                <button
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShadowsEnabled(!shadowsEnabled)}
                >
                  <input
                    type="checkbox"
                    checked={shadowsEnabled}
                    onChange={() => { }}
                    style={{ pointerEvents: 'none', margin: 0 }}
                  />
                  <span style={{ pointerEvents: 'none' }}>Shadows</span>
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ fontWeight: 'bold', paddingTop: '10px', paddingBottom: '5px' }}>Model Color</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Mode</td>
              <td>
                <select
                  value={viewModel.colorBlendMode}
                  onChange={(e) => setViewModel({ ...viewModel, colorBlendMode: e.target.value })}
                  style={{ width: '100%', border: '1px solid #555' }}
                >
                  {colorBlendModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Color</td>
              <td>
                <select
                  value={viewModel.color}
                  onChange={(e) => setViewModel({ ...viewModel, color: e.target.value })}
                  style={{ width: '100%', border: '1px solid #555' }}
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Alpha</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={viewModel.alpha}
                  onChange={(e) => setViewModel({ ...viewModel, alpha: parseFloat(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  size="5"
                  value={viewModel.alpha}
                  onChange={(e) => setViewModel({ ...viewModel, alpha: parseFloat(e.target.value) || 0 })}
                />
              </td>
            </tr>
            <tr>
              <td style={{
                paddingRight: '10px',
                color: colorBlendAmountEnabled ? 'black' : 'gray'
              }}>Mix</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={viewModel.colorBlendAmount}
                  onChange={(e) => setViewModel({ ...viewModel, colorBlendAmount: parseFloat(e.target.value) })}
                  disabled={!colorBlendAmountEnabled}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  size="5"
                  value={viewModel.colorBlendAmount}
                  onChange={(e) => setViewModel({ ...viewModel, colorBlendAmount: parseFloat(e.target.value) || 0 })}
                  disabled={!colorBlendAmountEnabled}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ fontWeight: 'bold', paddingTop: '10px', paddingBottom: '5px' }}>Model Silhouette</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Color</td>
              <td>
                <select
                  value={viewModel.silhouetteColor}
                  onChange={(e) => setViewModel({ ...viewModel, silhouetteColor: e.target.value })}
                  style={{ width: '100%', border: '1px solid #555' }}
                >
                  {silhouetteColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Alpha</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={viewModel.silhouetteAlpha}
                  onChange={(e) => setViewModel({ ...viewModel, silhouetteAlpha: parseFloat(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  size="5"
                  value={viewModel.silhouetteAlpha}
                  onChange={(e) => setViewModel({ ...viewModel, silhouetteAlpha: parseFloat(e.target.value) || 0 })}
                />
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px' }}>Size</td>
              <td style={{ display: 'flex', gap: '5px' }}>
                <input
                  type="range"
                  min="0.0"
                  max="10.0"
                  step="0.01"
                  value={viewModel.silhouetteSize}
                  onChange={(e) => setViewModel({ ...viewModel, silhouetteSize: parseFloat(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  size="5"
                  value={viewModel.silhouetteSize}
                  onChange={(e) => setViewModel({ ...viewModel, silhouetteSize: parseFloat(e.target.value) || 0 })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
