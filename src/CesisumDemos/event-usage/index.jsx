import { Cartesian3, Color, Ion, ScreenSpaceEventHandler, ScreenSpaceEventType, CameraEventType, defined } from 'cesium';
import { useEffect, useRef } from 'react';
import { CylinderGraphics, Entity, PointGraphics, Viewer } from 'resium';

export const EventUsage = () => {
  const viewerRef = useRef(null);

  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NDk3OTUzYy01N2RjLTQyNDMtYTE1Zi0yYjgwNTJlZmYwOTAiLCJpZCI6MTk3MzM4LCJpYXQiOjE3MDg2NTc1NTh9.b8_XHsKZtIQVkUyk95dNvHHB4OE5nmebm5e_JFEIIbM';

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!viewerRef.current || !viewerRef.current.cesiumElement) {
        console.warn('Viewer not initialized yet');
        return;
      }

      const viewer = viewerRef.current.cesiumElement;
      console.log('Viewer initialized, setting up event handlers');
      const handler = new ScreenSpaceEventHandler(viewer.canvas);

      // 监听鼠标左键点击事件
      handler.setInputAction((event) => {
        console.log('LEFT_CLICK event triggered at:', event.position);
        const picked = viewer.scene.pick(event.position);
        if (defined(picked)) {
          console.log('Picked object:', picked);
          viewer.trackedEntity = picked.id;
          viewer.selectedEntity = picked.id;
        } else {
          console.log('No object picked');
        }
      }, ScreenSpaceEventType.LEFT_CLICK);

      // Entity选择和跟踪事件
      const selectedEntityListener = viewer.selectedEntityChanged.addEventListener((entity) => {
        console.log('Selected entity changed:', entity);
        if (entity) {
          console.log('Selected entity:', entity.name || entity);
        }
      });

      const trackedEntityListener = viewer.trackedEntityChanged.addEventListener((entity) => {
        console.log('Tracked entity changed:', entity);
        if (entity) {
          console.log('Tracked entity:', entity.name || entity);
        }
      });

      // 修改默认的鼠标操作（使用 CameraEventType，而非 ScreenSpaceEventType）
      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        CameraEventType.LEFT_DRAG,
      ];
      viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        CameraEventType.RIGHT_DRAG,
      ];

      return () => {
        handler.destroy();
        selectedEntityListener?.removeEventListener();
        trackedEntityListener?.removeEventListener();
      };
    });
  }, []);

  return (
    <Viewer full ref={viewerRef} infoBox={false}>
      <Entity position={Cartesian3.fromDegrees(-75.59777, 40.03883)}>
        <PointGraphics pixelSize={10} color={Color.RED} />
      </Entity>

      <Entity
        name="cylinder"
        position={Cartesian3.fromDegrees(-60, 40)}
      >
        <CylinderGraphics
          length={400000.0}
          topRadius={200000.0}
          bottomRadius={200000.0}
          material={Color.BLUE.withAlpha(0.5)}
        />
      </Entity>
    </Viewer>
  );
};
