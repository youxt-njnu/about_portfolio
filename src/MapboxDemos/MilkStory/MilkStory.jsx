import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { accessToken, mapStyles, scrollInfos } from './config.js';
import './index.scss';

const MilkStory = () => {
  const mapRef = useRef(null);
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

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyles[mapType],
      center: scrollInfos.chapters[0].location.center,
      zoom: scrollInfos.chapters[0].location.zoom,
      bearing: scrollInfos.chapters[0].location.bearing,
      pitch: scrollInfos.chapters[0].location.pitch,
      interactive: false,
      transformRequest: transformRequest,
      projection: scrollInfos.projection
    });

    const nav = new mapboxgl.NavigationControl({
      //是否显示指南针，默认为true
      showCompass: true,
      //是否显示缩放按钮，默认为true
      showZoom: true,
    })
    mapRef.current.addControl(nav, 'top-right');

    if (scrollInfos.inset) {
      const mapInset = new mapboxgl.Map({
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
  }, []);


  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full fixed" ref={mapContainerRef}></div>
      <div className="top-20 right-4 h-40 w-60 fixed pointer-events-none transition-opacity ease-in-out" ref={mapInsetRef}></div>
      <div ref={storyRef}>
        <div className={`z-5 top-20 full-bar relative ${scrollInfos.theme}`}>
          {scrollInfos.title && <h1 className='m-0 p-4 text-center leading-8'> {scrollInfos.title} </h1>}
          {scrollInfos.subtitle && <h2 className='m-0 p-4 text-center'>{scrollInfos.subtitle}</h2>}
          {scrollInfos.byline && <p className='m-0 p-4 text-center leading-8'>{scrollInfos.byline}</p>}
        </div>


        <div className="z-5 w-full relative">
          {scrollInfos.chapters.map((record, idx) => (
            <div key={idx} className={`p-4 dark step card ${idx === 0 ? "active" : ""} ${record.hidden ? "hidden" : ""} ${alignments[record.alignment] || 'centered'}`}>
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