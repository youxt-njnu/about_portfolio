import { GridImageryProvider, IonImageryProvider, MapboxImageryProvider, MapboxStyleImageryProvider, TileCoordinatesImageryProvider, UrlTemplateImageryProvider, WebMapTileServiceImageryProvider } from 'cesium';
import { useEffect, useState } from 'react';
import { ImageryLayer, Viewer } from 'resium';

export const Imagery = ({ url = '' }) => {
  const tileCoordinatesImageryProvider = new TileCoordinatesImageryProvider();
  const gridImageryProvider = new GridImageryProvider();
  // 如果imageryProvider属性是变化的，可以用 useMemo的hooks
  // const imageryProvider = useMemo(() => new ArcGisMapServerImageryProvider({ url }), [url]);

  // 旧版本：
  // const ionImageryProvider = new IonImageryProvider({ assetId: 3830186 });
  // 新版本Cesium：
  // const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(3812));
  // viewer.imageryLayers.add(imageryLayer);
  // 新版本Resium(+后面的JSX嵌套):
  const [ionImageryProvider, setIonImageryProvider] = useState(null);
  useEffect(() => {
    IonImageryProvider.fromAssetId(3812).then(imageryProvider => {
      setIonImageryProvider(imageryProvider);
    });
  }, []);


  // 指定url的format模版，方便用户实现自己的Provider.比如国内的高德，腾讯等影像服务，url都是一个固定的规范，都可以通过该Provider轻松实现。而OSM也是通过该类实现的，以下是使用XYZ方式加载上面加载过的OSM影像服务。
  const mapboxImageryProviderUrl = new UrlTemplateImageryProvider({
    // url: "https://{s}.tiles.mapbox.com/v4/foxziluliu1121.66qkqrxn/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZm94emlsdWxpdTExMjEiLCJhIjoiY2xyYnJ5MXQ3MHN5ZjJrcHFxcXdwemN3bSJ9.zc_BQ5U2vldx1wROrYM4tg",
    url: "https://api.mapbox.com/styles/v1/linklink/cm2v9ot6s00fu01pwfs3q147j/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2tvZnVrcHM4MDh6bjJ2b2F3eWRsZnI5MyJ9.e4miL35BnZeUH18Gq3m9Xw",
  });

  // 通过mapbox数据源Tileset里打开后找Tileset Id(https://console.mapbox.com/studio/tilesets/)
  const mapDataIds = [
    "mapbox.mapbox-terrain-v2",
    "mapbox.mapbox-streets-v8",
    "linklink.bhygxgjo",
  ];
  const mapboxImageryProvider = new MapboxImageryProvider({
    mapId: mapDataIds[2],
    accessToken: "pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2tvZnVrcHM4MDh6bjJ2b2F3eWRsZnI5MyJ9.e4miL35BnZeUH18Gq3m9Xw"
  });

  // 通过mapbox style 
  const mapStyleIds = [
    {
      styleId: "streets-v11",
    },
    {
      styleId: "cm2v9ot6s00fu01pwfs3q147j",
      tilesize: 256,
      username: 'linklink',
    }
  ]

  const mapboxStyleImageryProvider = new MapboxStyleImageryProvider({
    ...mapStyleIds[1],
    accessToken: "pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2tvZnVrcHM4MDh6bjJ2b2F3eWRsZnI5MyJ9.e4miL35BnZeUH18Gq3m9Xw"
  });



  // const wMTSImageryProvider = new WebMapTileServiceImageryProvider({
  //   url: "https://api.mapbox.com/styles/v1/{TileMatrix}/{TileCol}/{TileRow}?access_token=pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2tvZnVrcHM4MDh6bjJ2b2F3eWRsZnI5MyJ9.e4miL35BnZeUH18Gq3m9Xw",
  //   layer: "linklink/cm2v9ot6s00fu01pwfs3q147j", // 这个url不知道写啥合适
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "WebMercatorQuad",
  //   maximumLevel: 19,
  // });

  return (
    <Viewer full infoBox={false}>
      {/* <ImageryLayer imageryProvider={mapboxImageryProviderUrl} /> */}
      {ionImageryProvider && <ImageryLayer imageryProvider={ionImageryProvider} />}
      {/* <ImageryLayer imageryProvider={mapboxStyleImageryProvider} /> */}
    </Viewer>
  )
}