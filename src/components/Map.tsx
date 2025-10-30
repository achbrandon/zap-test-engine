import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
}

interface MapProps {
  apiKey: string;
  locations: Location[];
}

const Map = ({ apiKey, locations }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-119.4179, 36.7783],
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    locations.forEach((location) => {
      const markerColor = location.type === "ATM Only" ? "#f59e0b" : "#0ea5e9";

      new mapboxgl.Marker({ color: markerColor })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
                <p style="font-size: 14px; color: #666;">${location.address}</p>
                <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: ${markerColor}20; color: ${markerColor}; border-radius: 4px; font-size: 12px;">${location.type}</span>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey, locations]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg shadow-lg"
      style={{ minHeight: '500px' }}
    />
  );
};

export default Map;
