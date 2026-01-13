import { Ion, Resource, Rectangle, Cartesian3, Camera } from 'cesium';
import { useRef, useEffect } from 'react';
import { Viewer } from 'resium';

// Custom OSM Nominatim Geocoder
class OSMNominatimGeocoder {
  geocode (input) {
    const url = 'https://nominatim.openstreetmap.org/search';
    const resource = new Resource({
      url: url,
      queryParameters: {
        q: input,
        format: 'json',
      },
    });

    return resource.fetchJson().then((results) => {
      return results.map((resultObject) => {
        const bboxDegrees = resultObject.boundingbox;
        return {
          displayName: resultObject.display_name,
          destination: Rectangle.fromDegrees(
            parseFloat(bboxDegrees[2]),
            parseFloat(bboxDegrees[0]),
            parseFloat(bboxDegrees[3]),
            parseFloat(bboxDegrees[1])
          ),
        };
      });
    });
  }
}

export const CustomWidgets = () => {
  const viewerRef = useRef(null);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  useEffect(() => {

    //  cesiumElement 在初始化时为 null，所以需要等待它初始化完成
    // 用 requestAnimationFrame 来等待浏览器的下一帧，这样 Viewer 就有足够的时间完成初始化
    requestAnimationFrame(() => {

      if (!viewerRef.current || !viewerRef.current.cesiumElement) return;
      const viewer = viewerRef.current.cesiumElement;

      // 修改相机的默认矩形范围
      // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(110.15, 34.54, 110.25, 34.56);
      // Viewer 已经创建完成了，设置 DEFAULT_VIEW_RECTANGLE 就太晚了。要改变现有 Viewer 的相机视角，需要直接调用 viewer.camera 方法
      // 直接设置相机视角到指定位置
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(117.16, 32.71, 1500000),
      });

      // Add custom behavior to home button
      if (viewer.homeButton) {
        viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
          console.log('Custom home button behavior triggered.');
          e.cancel = true;
          viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(117.16, 32.71, 1500),
          });
        });
      }
    });
  }, []);

  return (
    <Viewer
      full
      ref={viewerRef}
      geocoder={new OSMNominatimGeocoder()}
      infoBox={false}
    />
  );
};
