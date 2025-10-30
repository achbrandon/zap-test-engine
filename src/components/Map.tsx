import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  id: number;
  name: string;
  type: "branch" | "atm";
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface MapProps {
  apiKey?: string;
  locations: Location[];
}

const Map = ({ apiKey, locations }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;

    // Calculate center of all locations
    const center = locations.length > 0
      ? {
          lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
          lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
        }
      : { lng: -98.5795, lat: 39.8283 }; // Center of US

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom: 3.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    locations.forEach((location) => {
      const markerColor = location.type === "atm" ? "#10b981" : "#3b82f6";

      new mapboxgl.Marker({ color: markerColor })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
                <p style="font-size: 14px; color: #666;">${location.address}<br/>${location.city}, ${location.state}</p>
                <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: ${markerColor}20; color: ${markerColor}; border-radius: 4px; font-size: 12px;">${location.type === "branch" ? "Branch" : "ATM"}</span>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey, locations]);

  // Placeholder map when no API key
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-2xl">
          <div className="text-6xl mb-4">🗺️</div>
          <div>
            <p className="text-lg font-semibold mb-2">Interactive Map View</p>
            <p className="text-sm text-muted-foreground mb-6">
              Add your Mapbox API key to enable the interactive map
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 text-left">
            {locations.map((loc) => (
              <div key={loc.id} className="p-3 bg-background rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{loc.type === "branch" ? "🏦" : "🏧"}</span>
                  <span className="text-xs font-semibold text-primary">
                    {loc.type === "branch" ? "Branch" : "ATM"}
                  </span>
                </div>
                <div className="text-sm font-semibold">{loc.city}, {loc.state}</div>
                <div className="text-xs text-muted-foreground truncate">{loc.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '500px' }}
    />
  );
};

export default Map;
