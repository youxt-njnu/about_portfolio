import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxSimple = () => {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const initialSettings = { lng: -74.5, lat: 40, zoom: 9, bearing: 0, pitch: 0 };
  const [mapSettings, setMapSettings] = useState(initialSettings);

  const handleResetClick = () => {
    mapRef.current.flyTo({
      center: [initialSettings.lng, initialSettings.lat],
      zoom: initialSettings.zoom,
      bearing: initialSettings.bearing,
      pitch: initialSettings.pitch
    })
  }
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlua2xpbmsiLCJhIjoiY2t5azNveG05MnRwdTJ4bzhxM2JmNGg3aCJ9.giuzL5T9qkSSl9EWMUK9dg';
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [mapSettings.lng, mapSettings.lat],
      zoom: mapSettings.zoom,
      bearing: mapSettings.bearing,
      pitch: mapSettings.pitch,
    })

    mapRef.current && mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter();
      setMapSettings({ ...mapSettings, lng: mapCenter.lng, lat: mapCenter.lat });
    })
    mapRef.current && mapRef.current.on('zoom', () => {
      const mapZoom = mapRef.current.getZoom();
      setMapSettings({ ...mapSettings, zoom: mapZoom });
    })

    mapRef.current && mapRef.current.on('rotate', () => {
      const mapBearing = mapRef.current.getBearing();
      setMapSettings({ ...mapSettings, bearing: mapBearing });
    });

    mapRef.current && mapRef.current.on('pitch', () => {
      const mapPitch = mapRef.current.getPitch();
      setMapSettings({ ...mapSettings, pitch: mapPitch });
    });

    return () => {
      mapRef.current.remove()
    }
  }, []);


  return (
    <div>
      <div className="absolute bottom-0 left-0 m-1 p-1 rounded-md bg-black-500 text-white z-10">Longitude: {mapSettings.lng.toFixed(4)} | Latitude: {mapSettings.lat.toFixed(4)} | Zoom: {mapSettings.zoom.toFixed(2)} | Bearing: {mapSettings.bearing.toFixed(2)} | Pitch: {mapSettings.pitch.toFixed(2)}
        <button className="ml-6 bg-slate-500 rounded-md" onClick={handleResetClick}>RESET</button>
      </div>
      <div className="w-screen h-screen z-0" ref={mapContainer}></div>
    </div>
  )
}

export default MapboxSimple