import { Cartesian3, Math as CesiumMath, HeadingPitchRoll } from 'cesium'
import * as dat from 'dat.gui'

const cameraInit = {
  x: -74.2,
  y: 40.5,
  z: 4500,
  heading: 0.0,
  pitch: -60.0,
  roll: 0.0,
}

const viewCameraChanged = (viewer) => {
  viewer.camera.flyTo({
    // 下面的这两个参数的设置，是怎么设置出来的？微调之后会发生什么变化——有什么快速调整的方法吗？gui?
    destination: new Cartesian3.fromDegrees(
      cameraInit.x,
      cameraInit.y,
      cameraInit.z
    ), // 经度，纬度，高度
    orientation: new HeadingPitchRoll(
      CesiumMath.toRadians(cameraInit.heading),
      CesiumMath.toRadians(cameraInit.pitch),
      CesiumMath.toRadians(cameraInit.roll)
    ),
    duration: 0,
  })
}

let guiInstance = null

const adjustGUI = (viewer) => {
  if (guiInstance) {
    guiInstance.destroy()
    guiInstance = null
  }

  guiInstance = new dat.GUI()
  guiInstance
    .add(cameraInit, 'x', -180.0, 180.0)
    .name('Longitude')
    .onChange(() => viewCameraChanged(viewer))
  guiInstance
    .add(cameraInit, 'y', -90.0, 90.0)
    .name('Latitude')
    .onChange(() => viewCameraChanged(viewer))
  guiInstance
    .add(cameraInit, 'z', 0.0, 5000.0)
    .name('Height')
    .onChange(() => viewCameraChanged(viewer))
  guiInstance
    .add(cameraInit, 'heading', -180.0, 180.0)
    .name('Heading')
    .onChange(() => viewCameraChanged(viewer))
  guiInstance
    .add(cameraInit, 'pitch', -90.0, 90.0)
    .name('Pitch')
    .onChange(() => viewCameraChanged(viewer))
  guiInstance
    .add(cameraInit, 'roll', -180.0, 180.0)
    .name('Roll')
    .onChange(() => viewCameraChanged(viewer))

  return guiInstance
}

const destroyGUI = () => {
  if (guiInstance) {
    guiInstance.destroy()
    guiInstance = null
  }
}

export { adjustGUI, destroyGUI, viewCameraChanged }
