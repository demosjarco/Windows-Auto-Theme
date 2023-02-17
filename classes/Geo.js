module.exports.Geo = class {
	#sdkGeoLocation;
	#locator;

	#sdkImporter() {
		try {
			const { Geolocator } = require('@nodert-win11-22h2/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win11/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-21h1/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-20h1/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-19h1/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-rs4/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-rs3/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-cu/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10-au/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
		try {
			const { Geolocator } = require('@nodert-win10/windows.devices.geolocation');
			this.#sdkGeoLocation = Geolocator;
			return;
		} catch (error) {
			/* empty */
		}
	}

	constructor() {
		this.#sdkImporter();
		this.#locator = new this.#sdkGeoLocation();
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
