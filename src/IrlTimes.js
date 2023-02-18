/* eslint-disable accessor-pairs */
module.exports.Irl = class {
	#url = new URL('https://api.sunrisesunset.io');

	constructor(locJson) {
		this.#url.pathname = '/json';
		this.#url.searchParams.set('lat', locJson.lat);
		this.#url.searchParams.set('lng', locJson.long);
	}

	get times() {
		return new Promise((resolve, reject) => {
			fetch(this.#url, {
				headers: {
					Accept: 'application/json',
				},
			}).then((response) => {
				if (response.ok) {
					response.json().then((jsonResponse) => {
						const currentDay = new Date();
						resolve({
							sr: new Date(`${currentDay.toLocaleDateString()} ${jsonResponse.results.sunrise}`),
							ss: new Date(`${currentDay.toLocaleDateString()} ${jsonResponse.results.sunset}`),
						});
					});
				} else {
					reject(`HTTP ${response.status}: ${response.statusText}`);
				}
			});
		});
	}
};
