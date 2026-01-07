import { Cartesian3, HeadingPitchRoll, Ion, Math, Transforms, Color } from 'cesium';
import { useState, useRef } from 'react';
import { Entity, Viewer } from 'resium';

// todo 这里的horse模型本身有问题，bird和fox模型是正常的

export const TdTilesExt1 = () => {
  const viewerRef = useRef(null); // 创建一个ref对象，用于获取Cesium的viewer对象，这样就可以对等获取到const viewer = new Cesium.Viewer('cesiumContainer')了
  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  const baseUrl = import.meta.env.BASE_URL;

  const options = [

    { text: 'Parrot', url: `${baseUrl}glb-models/Parrot.glb`, height: 0, scale: 500 },
    { text: 'Fox', url: `${baseUrl}glb-models/fox.glb`, height: 0, scale: 500.0 },
    { text: 'Bird', url: `${baseUrl}glb-models/bird.glb`, height: 0, scale: 120.0 }
  ];

  const [selectedModel, setSelectedModel] = useState(options[0]); // 创建一个状态，用于存储当前选中的模型，直接存Options里的各个项，这样传入createModel会方便

  const createModel = (option) => {
    console.log(option);
    if (!option) return null;

    const position = Cartesian3.fromDegrees(116.46, 39.92, option.height);
    const heading = Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    // 基础模型配置
    const baseConfig = {
      uri: option.url,
      minimumPixelSize: option.scale,
      maximumScale: 20000,
    };


    return (
      <Entity
        name={option.url}
        position={position}
        orientation={orientation}
        model={baseConfig}
      />
    )
  };

  const handleSelectChange = (e) => {
    const value = e.target.value; // 获取到当前选中的值,注意要.target.value 
    const option = options.find((option) => option.text === value);
    if (option) {
      setSelectedModel(option);
    }
  };

  return (
    <>
      <select className="absolute top-20 left-20 z-50" onChange={handleSelectChange} value={selectedModel ? selectedModel.text : ''}>
        {options.map((option) => (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
      <Viewer full ref={viewerRef} infoBox='false' shadows='true' shouldAnimate='true' >
        {createModel(selectedModel)}
      </Viewer>
    </>
  )

}
