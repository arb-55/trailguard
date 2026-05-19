import { useEffect, useRef, useState } from 'react';
import './TrailExplorer.css';

// Global trail database with coordinates
const TRAIL_DB = [
  { id: 1, name: 'Sunset Ridge Trail', lat: 27.175, lng: 78.042, difficulty: 'Moderate', distance: '8.4 km', elevation: '420m', rating: 4.8, type: 'Mountain', duration: '4h', status: 'safe' },
  { id: 2, name: 'Crystal Falls Loop', lat: 27.180, lng: 78.050, difficulty: 'Easy', distance: '4.2 km', elevation: '180m', rating: 4.6, type: 'Waterfall', duration: '2h', status: 'safe' },
  { id: 3, name: 'Eagle Peak Summit', lat: 27.165, lng: 78.035, difficulty: 'Hard', distance: '14.7 km', elevation: '1240m', rating: 4.9, type: 'Summit', duration: '8h', status: 'caution' },
  { id: 4, name: 'Emerald Valley Path', lat: 27.190, lng: 78.060, difficulty: 'Easy', distance: '3.1 km', elevation: '90m', rating: 4.4, type: 'Valley', duration: '1.5h', status: 'safe' },
  { id: 5, name: 'Himalayan Ridge Trail', lat: 28.600, lng: 77.200, difficulty: 'Hard', distance: '12.4 km', elevation: '3200m', rating: 4.9, type: 'Alpine', duration: '9h', status: 'caution' },
  { id: 6, name: 'Mangrove Coastal Walk', lat: 21.900, lng: 88.600, difficulty: 'Easy', distance: '5.0 km', elevation: '10m', rating: 4.3, type: 'Coastal', duration: '2.5h', status: 'safe' },
  { id: 7, name: 'Western Ghats Trail', lat: 14.500, lng: 75.800, difficulty: 'Moderate', distance: '9.2 km', elevation: '650m', rating: 4.7, type: 'Forest', duration: '5h', status: 'safe' },
  { id: 8, name: 'Thar Desert Dune Walk', lat: 27.000, lng: 70.900, difficulty: 'Moderate', distance: '7.5 km', elevation: '80m', rating: 4.2, type: 'Desert', duration: '3.5h', status: 'safe' },
  { id: 9, name: 'Kaziranga Grassland Loop', lat: 26.580, lng: 93.170, difficulty: 'Easy', distance: '4.8 km', elevation: '55m', rating: 4.5, type: 'Wildlife', duration: '2h', status: 'safe' },
  { id: 10, name: 'Munnar Tea Trail', lat: 10.090, lng: 77.060, difficulty: 'Easy', distance: '6.2 km', elevation: '320m', rating: 4.8, type: 'Scenic', duration: '3h', status: 'safe' },
  { id: 11, name: 'Ladakh High Pass Trek', lat: 34.150, lng: 77.580, difficulty: 'Hard', distance: '18.0 km', elevation: '5350m', rating: 5.0, type: 'Alpine', duration: '12h', status: 'caution' },
  { id: 12, name: 'Coorg Jungle Path', lat: 12.330, lng: 75.740, difficulty: 'Moderate', distance: '7.8 km', elevation: '900m', rating: 4.6, type: 'Forest', duration: '4.5h', status: 'safe' },
];

const STATUS_COLOR = { safe: '#10b981', caution: '#f59e0b', danger: '#ef4444' };
const DIFF_COLOR = { Easy: '#10b981', Moderate: '#f59e0b', Hard: '#ef4444' };

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function TrailExplorer({ onClose }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const trailMarkersRef = useRef([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [nearbyTrails, setNearbyTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [radius, setRadius] = useState(500);
  const radiusCircleRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    if (!window.L) return;

    const L = window.L;

    // Init map centered on India
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
    });

    // Dark styled tiles using CartoDB dark matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Click handler
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      placeUserMarker(lat, lng, L, map);
      await reverseGeocode(lat, lng);
      findNearbyTrails(lat, lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const placeUserMarker = (lat, lng, L, map) => {
    if (!L) L = window.L;
    if (!map) map = mapInstanceRef.current;

    // Remove old marker
    if (markerRef.current) markerRef.current.remove();
    // Remove old trail markers
    trailMarkersRef.current.forEach(m => m.remove());
    trailMarkersRef.current = [];
    // Remove old radius circle
    if (radiusCircleRef.current) radiusCircleRef.current.remove();

    const icon = L.divIcon({
      className: '',
      html: `<div class="user-map-pin"><div class="user-pin-dot"></div><div class="user-pin-ring"></div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
    setSelectedLocation({ lat, lng });

    // Draw radius circle
    radiusCircleRef.current = L.circle([lat, lng], {
      radius: radius * 1000,
      color: 'rgba(16,185,129,0.6)',
      fillColor: 'rgba(16,185,129,0.08)',
      fillOpacity: 1,
      weight: 1,
      dashArray: '6,4',
    }).addTo(map);
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      const name = data.address?.city || data.address?.town || data.address?.village ||
        data.address?.state || data.display_name?.split(',')[0] || 'Selected Location';
      setLocationName(name);
    } catch {
      setLocationName('Selected Location');
    }
  };

  const findNearbyTrails = (lat, lng) => {
    const L = window.L;
    const map = mapInstanceRef.current;

    const withDistance = TRAIL_DB.map(t => ({
      ...t,
      distanceKm: haversineDistance(lat, lng, t.lat, t.lng),
    })).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 6);

    setNearbyTrails(withDistance);
    setSelectedTrail(null);

    // Add trail markers
    withDistance.forEach((trail, i) => {
      const trailIcon = L.divIcon({
        className: '',
        html: `<div class="trail-map-pin" style="--pin-color:${STATUS_COLOR[trail.status]}">
          <span>${i + 1}</span>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const m = L.marker([trail.lat, trail.lng], { icon: trailIcon })
        .addTo(map)
        .bindTooltip(`<b>${trail.name}</b><br/>${trail.distance} • ${trail.difficulty}`, {
          className: 'trail-tooltip',
          direction: 'top',
        });
      trailMarkersRef.current.push(m);
    });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const L = window.L;
        const map = mapInstanceRef.current;
        map.setView([+lat, +lon], 10);
        placeUserMarker(+lat, +lon, L, map);
        setLocationName(display_name.split(',')[0]);
        findNearbyTrails(+lat, +lon);
      }
    } catch (e) {
      console.error(e);
    }
    setSearching(false);
  };

  const flyToTrail = (trail) => {
    const map = mapInstanceRef.current;
    if (map) map.flyTo([trail.lat, trail.lng], 12, { duration: 1.5 });
    setSelectedTrail(trail);
  };

  return (
    <div className="explorer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="explorer-modal">
        {/* Header */}
        <div className="explorer-header">
          <div className="explorer-title">
            <div className="explorer-logo">🗺️</div>
            <div>
              <h2>Trail Explorer</h2>
              <p>Click anywhere on the map to discover nearby trails</p>
            </div>
          </div>
          <button className="explorer-close" onClick={onClose}>✕</button>
        </div>

        <div className="explorer-body">
          {/* Left Panel */}
          <div className="explorer-sidebar">
            {/* Search */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search any city, region, or landmark..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} disabled={searching}>
                {searching ? '⏳' : '🔍'}
              </button>
            </div>

            {/* Radius Selector */}
            <div className="radius-control">
              <span>Search radius: <strong>{radius} km</strong></span>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={radius}
                onChange={e => setRadius(+e.target.value)}
              />
            </div>

            {/* Location Info */}
            {selectedLocation && (
              <div className="location-info">
                <div className="location-info-top">
                  <span className="location-pin">📍</span>
                  <div>
                    <div className="location-name">{locationName || 'Locating...'}</div>
                    <div className="location-coords">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trail Results */}
            <div className="trails-panel">
              {!selectedLocation ? (
                <div className="no-selection">
                  <div className="no-sel-icon">👆</div>
                  <p>Click anywhere on the map or search a location to see nearby trails</p>
                </div>
              ) : nearbyTrails.length === 0 ? (
                <div className="no-selection">
                  <div className="no-sel-icon">🔍</div>
                  <p>No trails found in this area</p>
                </div>
              ) : (
                <>
                  <div className="trails-panel-header">
                    <span>🏔️ {nearbyTrails.length} Trails Nearby</span>
                    <span className="sorted-label">Sorted by distance</span>
                  </div>
                  <div className="trail-results-list">
                    {nearbyTrails.map((trail, i) => (
                      <div
                        key={trail.id}
                        className={`trail-result-card ${selectedTrail?.id === trail.id ? 'active' : ''}`}
                        onClick={() => flyToTrail(trail)}
                      >
                        <div className="trc-number">{i + 1}</div>
                        <div className="trc-body">
                          <div className="trc-name">{trail.name}</div>
                          <div className="trc-meta">
                            <span className="trc-diff" style={{ color: DIFF_COLOR[trail.difficulty] }}>
                              {trail.difficulty}
                            </span>
                            <span>📏 {trail.distance}</span>
                            <span>⏱ {trail.duration}</span>
                          </div>
                          <div className="trc-meta">
                            <span>⛰ {trail.elevation}</span>
                            <span>🏷 {trail.type}</span>
                            <span className="trc-dist">~{Math.round(trail.distanceKm)} km away</span>
                          </div>
                          <div className="trc-bottom">
                            <div className="trc-rating">
                              {'★'.repeat(Math.round(trail.rating))}{'☆'.repeat(5 - Math.round(trail.rating))}
                              <span>{trail.rating}</span>
                            </div>
                            <div className="trc-status" style={{ color: STATUS_COLOR[trail.status], borderColor: STATUS_COLOR[trail.status] }}>
                              {trail.status === 'safe' ? '✓ Safe' : '⚠ Caution'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="explorer-map-wrap">
            <div ref={mapRef} className="explorer-map" />
            <div className="map-hint">
              <span>🖱 Click anywhere on the map to explore trails</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
