import { Ion, IonResource } from 'cesium';
import { useRef } from 'react';
import { Viewer, Cesium3DTileset } from 'resium';

export const CesiumBasic = () => {
  const viewerRef = useRef(null);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  const handleReady = tileset => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      viewerRef.current.cesiumElement.zoomTo(tileset);
    }
  };

  return (
    <Viewer full ref={viewerRef} infoBox={false}>
      <Cesium3DTileset url={IonResource.fromAssetId(75343)} onReady={handleReady} />
    </Viewer>
  )
}