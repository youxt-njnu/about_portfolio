import { Cartesian3, Color } from 'cesium';
import { Entity, EntityDescription, GeoJsonDataSource, PointGraphics, Viewer } from 'resium';

export const DataInfo = () => {
  const position = Cartesian3.fromDegrees(120, 40, 100);
  // const terrainProvider = createWorldTerrain(); 这个函数可能被弃用了，有博主说改成createWorldTerrainAsync，但是这个就变成了异步了，所以不知道怎么用
  // const pointGraphics = { pixelSize: 10, color: Color.RED };

  const data = {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "This is where the Rockies play!",
    },
    geometry: {
      type: "Point",
      coordinates: [1204, 39.7],
    },
  };

  return (
    <>
      <Viewer full infoBox={true}>
        {/* 加上full可以保证全屏显示 */}
        {/* <Entity position={position} point={pointGraphics} /> */}
        {/* 把上面的改成下面的，也就是使用了PointGraphics组件，enable updating graphic properties with minimal cost  */}
        <Entity position={position} name="Point">
          <PointGraphics pixelSize={10} color={Color.RED} />
          {/* 可以在Entity里面加上 description="Hello"，或者是使用EntityDescription组件 */}
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>

        <GeoJsonDataSource data={data} />
      </Viewer>
    </>

  )
}