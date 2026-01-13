import { ImageryLayer, Ion, IonImageryProvider, IonWorldImageryStyle, Rectangle, SingleTileImageryProvider } from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'resium';

export const ImageryAdvanced = () => {
  const viewerRef = useRef(null);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  useEffect(() => {
    requestAnimationFrame(() => {
      const viewer = viewerRef.current?.cesiumElement;
      if (!viewer?.imageryLayers) {
        console.log('Waiting for viewer scene...');
        return;
      }
      console.log('Viewer scene ready, adding imagery layers...');
      // viewer获取其中的imageryLayer，直接.就行，不需要viewer.scene.imageryLayers
      const layers = viewer.imageryLayers;

      // Add Black Marble imagery layer
      const blackMarble = ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(3812));
      blackMarble.alpha = 0.5;
      blackMarble.brightness = 2.0;
      layers.add(blackMarble);


      // Add Cesium Logo overlay
      const cesiumLogo = ImageryLayer.fromProviderAsync(SingleTileImageryProvider.fromUrl(
        "https://cesium.com/learn/cesiumjs/ref-doc/Images/CesiumLogo.png",
        {
          rectangle: Rectangle.fromDegrees(112, 39.0, 116, 40),
        }
      ));
      layers.add(cesiumLogo);
    });
  }, []);

  return (
    <Viewer
      full
      ref={viewerRef}
      baseLayer={ImageryLayer.fromWorldImagery({
        style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
      })}
      baseLayerPicker={false}
      infoBox={false}
    />
  );
};
