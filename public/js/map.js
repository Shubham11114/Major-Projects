// map.js

if (typeof listingLocation !== 'undefined') {

    async function getCoordinates() {
        // Try to use exact coordinates if provided manually by the user
        if (typeof customLat !== 'undefined' && customLat !== null &&
            typeof customLng !== 'undefined' && customLng !== null) {
            console.log("Using manually provided coordinates:", customLat, customLng);
            return { lat: parseFloat(customLat), lon: parseFloat(customLng), precise: true };
        }

        // Fallback to Geocoding via OpenStreetMap Nominatim
        try {
            console.log("Falling back to geocoding location string:", listingLocation);
            // Using Nominatim for completely free OpenStreetMap Geocoding (No API Key Required)
            const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingLocation)}`;

            const response = await fetch(endpoint, {
                headers: {
                    'Accept-Language': 'en'
                }
            });
            const data = await response.json();

            // Check if we got results
            if (data && data.length > 0) {
                // Nominatim returns lat and lon as strings
                return {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon),
                    precise: false
                };
            }
        } catch (error) {
            console.error("Error fetching geocoding data:", error);
        }
        return null;
    }

    async function initializeMap() {
        const coords = await getCoordinates();

        if (coords) {
            const { lat, lon, precise } = coords;

            // Initialize the Leaflet map
            const map = L.map('map', {
                zoomControl: false // We will add a custom-positioned zoom control
            }).setView([lat, lon], 14);


            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            // Add zoom control to top right (matches typical modern map UI positioning)
            L.control.zoom({
                position: 'topright'
            }).addTo(map);

            // Create a custom HTML element for the marker
            const customIcon = L.divIcon({
                className: 'custom-leaflet-marker',
                html: '<div class="custom-marker"><i class="fa-solid fa-location-dot primary"></i></div>',
                iconSize: [45, 45],
                iconAnchor: [22, 45],
                popupAnchor: [0, -45]
            });
            // Create a popup highlighting if it's exact vs approximate
            const precisionLabel = precise ? '<span style="color: #28a745; font-size: 11px; font-weight: bold; display:block; margin-top:5px;">✓ Precise Location</span>' : '';
            const popupContent = `
                    <div style="text-align: center; min-width: 150px;">
                        <h6 style="margin: 0 0 5px 0; font-weight: bold;">Location Details</h6>
                        <p style="margin: 0; font-size: 13px; color: #555;">${listingLocation}</p>
                        ${precisionLabel}
                    </div>
            `;

            // Create the marker and add it to the map
            L.marker([lat, lon], { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent);

        } else {
            displayMapError("Location could not be found on the map.");
        }
    }

    function displayMapError(message) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                    <div class="text-center" style="padding: 20px;">
                        <i class="fa-solid fa-map-location-dot fs-1 mb-2"></i>
                        <p class="mb-0 text-break">${message}</p>
                    </div>
                </div>
            `;
        }
    }

    // Initialize map sequence
    initializeMap();

} else {
    console.error("Map initialization variable (listingLocation) is missing.");
}
