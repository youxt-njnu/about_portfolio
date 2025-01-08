import 'intersection-observer'; // This polyfill ensures compatibility in older browsers
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import scrollama from 'scrollama';

import 'mapbox-gl/dist/mapbox-gl.css';
import { accessToken, mapStyles, scrollInfos } from './config.js';
import './index.scss';
import geojsonSource from './points.js';

const MilkStory = () => {
  const mapRef = useRef(null);
  let mapInset = useRef(null);
  const mapInsetRef = useRef(null);
  const mapContainerRef = useRef(null);
  const storyRef = useRef(null);
  let initLoad = true;
  let geojsonMarker = [];

  let mapType = 0;

  const layerTypes = {
    fill: ['fill-opacity'],
    line: ['line-opacity'],
    circle: ['circle-opacity', 'circle-stroke-opacity'],
    symbol: ['icon-opacity', 'text-opacity'],
    raster: ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    heatmap: ['heatmap-opacity'],
  }

  const alignments = {
    left: 'lefty',
    center: 'centered',
    right: 'righty',
    full: 'fully'
  }

  const getLayerPaintType = (layer) => {
    let layerType = mapRef.current.getLayer(layer).type;
    return layerTypes[layerType];
  }
  const setLayerOpacity = (layer) => {
    let paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(prop => {
      let options = {};
      if (layer.duration) {
        let transitionProp = prop + '-transition';
        options = { duration: layer.duration };
        mapRef.current.setPaintProperty(layer.layer, transitionProp, options);
      }
      mapRef.current.setPaintProperty(layer.layer, prop, layer.opacity, options);
    })
  }

  const transformRequest = (url) => {
    const hasQuery = url.indexOf('?') !== -1
    const suffix = hasQuery
      ? '&pluginName=scrollytellingV2'
      : '?pluginName=scrollytellingV2'
    return {
      url: url + suffix,
    }
  }

  //Helper functions for insetmap
  const addInsetLayer = (bounds) => {
    mapInset.current.addSource('boundsSource', {
      type: 'geojson',
      data: bounds,
    })

    mapInset.current.addLayer({
      id: 'boundsLayer',
      type: 'fill',
      source: 'boundsSource', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#fff', // blue color fill
        'fill-opacity': 0.2,
      },
    })
    //  Add a black outline around the polygon.
    mapInset.current.addLayer({
      id: 'outlineLayer',
      type: 'line',
      source: 'boundsSource',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 1,
      },
    })
  }


  const updateInsetLayer = (bounds) => {
    mapInset.current.getSource('boundsSource').setData(bounds)
  }

  const getInsetBounds = () => {
    let bounds = mapRef.current.getBounds()

    let boundsJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [bounds._sw.lng, bounds._sw.lat],
                [bounds._ne.lng, bounds._sw.lat],
                [bounds._ne.lng, bounds._ne.lat],
                [bounds._sw.lng, bounds._ne.lat],
                [bounds._sw.lng, bounds._sw.lat],
              ],
            ],
          },
        },
      ],
    }

    if (initLoad) {
      addInsetLayer(boundsJson)
      initLoad = false
    } else {
      updateInsetLayer(boundsJson)
    }
  }



  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyles[mapType],
      center: scrollInfos.chapters[0].location.center,
      zoom: scrollInfos.chapters[0].location.zoom,
      bearing: scrollInfos.chapters[0].location.bearing,
      pitch: scrollInfos.chapters[0].location.pitch,
      interactive: true,
      transformRequest: transformRequest,
      projection: scrollInfos.projection
    });

    const nav = new mapboxgl.NavigationControl({
      //是否显示指南针，默认为true
      showCompass: true,
      //是否显示缩放按钮，默认为true
      showZoom: true,
    })
    mapRef.current.addControl(nav, 'top-left');

    if (scrollInfos.inset) {
      mapInset.current = new mapboxgl.Map({
        container: mapInsetRef.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: scrollInfos.chapters[0].location.center,
        zoom: 3,
        hash: false,
        interactive: false,
        attributionControl: false,
        // projection: 'globe'
      });

    }

    let marker;
    if (scrollInfos.showMarkers) {
      marker = new mapboxgl.Marker({
        color: scrollInfos.markerColor
      });
      marker.setLngLat(scrollInfos.chapters[0].location.center).addTo(mapRef.current);
    }

    let scroller = scrollama();

    mapRef.current.on('load', () => {
      if (scrollInfos.use3dTerrain) {
        mapRef.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });

        mapRef.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        mapRef.current.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });
        
      }

      if (scrollInfos.inset) {
        mapRef.current.on('move', getInsetBounds);
      }

      mapRef.current.dragPan.enable();
      mapRef.current.keyboard.enable();

      scroller
        .setup({
          step: '.step',
          offset: 0.5,
        })
        .onStepEnter((response) => {
          const chapter = scrollInfos.chapters.find(chap => chap.id === response.element.id);
          response.element.classList.add('active');
          mapRef.current[chapter.mapAnimation || 'flyTo'](chapter.location);
          if (chapter.mapType !== mapType) {
            mapType = chapter.mapType;

            // mapType === 4

            if (mapType !== 0) {
              mapRef.current.setStyle(mapStyles[mapType]);
              if (geojsonMarker !== null) {
                for (let i = geojsonMarker.length - 1; i >= 0; i--) {
                  geojsonMarker[i].remove();
                }
              }

              for (let feature of geojsonSource[mapType].features) {
                let el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = 'url(' + feature.properties.image + ')';
                el.style.height = '50px';
                el.style.width = '50px';
                geojsonMarker.push(
                  new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                      new mapboxgl.Popup({ closeButton: false, offset: 25 }) // add popups
                        .setHTML(
                          `<h3>${feature.properties.title}</h3><img src=${feature.properties.image} height=${feature.properties.imageHeight} width=${feature.properties.imageWidth}><p>${feature.properties.description}</p>`
                        )
                    )
                    .addTo(mapRef.current)
                )
              }
            }
          }

          if (scrollInfos.inset) {
            if (chapter.location.zoom < 5) {
              mapInset.current.flyTo({ center: chapter.location.center, zoom: 0 })
            } else {
              mapInset.current.flyTo({ center: chapter.location.center, zoom: 3 })
            }
          }
          if (scrollInfos.showMarkers) {
            marker.setLngLat(chapter.location.center)
          }
          if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity)
          }
          if (chapter.callback) {
            window[chapter.callback]()
          }
          if (chapter.rotateAnimation) {
            mapRef.current.once('moveend', () => {
              const rotateNumber = mapRef.current.getBearing()
              mapRef.current.rotateTo(rotateNumber + 180, {
                duration: 30000,
                easing: function (t) {
                  return t
                },
              })
            })
          }
        })
        .onStepExit((response) => {
          console.log(mapRef.current.getStyle().layers); // 拿到mapRef对应的地图里面的所有的layers
          let chapter = scrollInfos.chapters.find(
            (chap) => chap.id === response.element.id
          )
          response.element.classList.remove('active')
          if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity)
          }
        })
    })
  }, []);


  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full fixed" ref={mapContainerRef}></div>
      <div className="top-20 right-4 h-40 w-60 fixed pointer-events-none transition-opacity ease-in-out" ref={mapInsetRef}></div>
      <div className='box-content' ref={storyRef}>
        <div className={`z-5 top-20 full-bar relative ${scrollInfos.theme}`}>
          {scrollInfos.title && <h1 className='m-0 p-4 text-center leading-8'> {scrollInfos.title} </h1>}
          {scrollInfos.subtitle && <h2 className='m-0 p-4 text-center'>{scrollInfos.subtitle}</h2>}
          {scrollInfos.byline && <p className='m-0 p-4 text-center leading-8'>{scrollInfos.byline}</p>}
        </div>


        <div className="z-5 w-full relative">
          {scrollInfos.chapters.map((record, idx) => (
            <div key={idx} id={record.id} className={`p-4 dark step card ${idx === 0 ? "active" : ""} ${record.hidden ? "hidden" : ""} ${alignments[record.alignment] || 'centered'}`}>
              {record.title && <h2>{record.title}</h2>}
              {record.image && <img src={record.image} alt={record.title} />}
              {record.description && <p>{record.description}</p>}
            </div>
          ))}
        </div>
        {scrollInfos.footer && <p className={`w-full min-h-5 py-2 text-center text-sm ${scrollInfos.theme}`}>{scrollInfos.footer}</p>}
      </div>

    </div>
  )
}

export default MilkStory