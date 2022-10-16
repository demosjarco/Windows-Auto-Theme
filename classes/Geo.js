module.exports.Geo = class {
	#locator;

	constructor() {
		const { Geolocator } = require('@nodert-win11/windows.devices.geolocation');
		this.#locator = new Geolocator();
		// "perfect" time zone = 15 degrees of longitude
		// 1 degree of longitude = 111km at the equator
		const timeZoneHemiKm = 15 * 111;
		// Divide by half to get midpoint of hemisphere
		const timeZoneMidKm = timeZoneHemiKm / 2;
		// Accuracy is radius (divide by half)
		const timeZoneMidKmRadius = timeZoneMidKm / 2;
		// Need meters
		const timeZoneMidMRadius = timeZoneMidKmRadius * 1000;
		// For privacy reasons, only get accuracy needed for proper sunrise/sunset
		this.#locator.desiredAccuracyInMeters = Math.round(timeZoneMidMRadius);
		this.#locator.AllowFallbackToConsentlessPositions = () => {};
	}

	getCoordinates(callback) {
		this.#locator.getGeopositionAsync((error, result) => {
			if (error) {
				throw error;
			}

			const { coordinate } = result;
			const { longitude, latitude } = coordinate;

			callback({
				lat: latitude,
				long: longitude,
			});
		});
	}
};
