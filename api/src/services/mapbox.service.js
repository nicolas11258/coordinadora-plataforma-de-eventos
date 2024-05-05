import mapbox from '@mapbox/mapbox-sdk/services/geocoding.js';
import eventDAO from '../dao/events.dao.js';
import config from '../config/config.js';

const mapboxClient = mapbox({
    accessToken: config.mapboxApiKey
});

// Service for handling location-related operations.
const locationService = {
    /**
     * Retrieves nearby locations based on the provided event ID.
     * @param {number} eventId - The ID of the event.
     * @returns {Promise<Array>} A promise that resolves to an array of nearby locations.
     * @throws {Error} If there is an error fetching nearby locations.
     */
    async getNearbyLocations(eventId) {
        try {
            // Retrieve the event and its coordinates
            const event = await eventDAO.findEventById(eventId);
            const location = event.location;
            const [longitude, latitude] = location.split(',').map(coord => parseFloat(coord.trim()));
            
            // Call the Mapbox API with the coordinates
            const response = await mapboxClient.reverseGeocode({
                query: [longitude, latitude],
                types: ['poi'] 
            }).send();

            // Extract and format relevant data from the response
            const nearbyLocations = response.body.features.map(feature => ({
                name: feature.place_name,
                coordinates: feature.geometry.coordinates
            }));

            return nearbyLocations;
        } catch (error) {
            console.error('Error fetching nearby locations:', error);
            throw new Error('Failed to get nearby locations');
        }
    }
};

export default locationService;
