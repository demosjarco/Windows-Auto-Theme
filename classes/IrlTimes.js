/* eslint-disable accessor-pairs */
module.exports.Irl = class {
	#config;
	#url = new URL('https://api.sunrisesunset.io');

	constructor(locJson) {
		this.#config = {
			url: '/json',
			method: 'get',
			baseURL: 'https://api.sunrisesunset.io',
			params: {
				lat: locJson.lat,
				lng: locJson.long,
			},
		};
		this.#url.pathname = '/json';
		this.#url.searchParams.set('lat', locJson.lat);
		this.#url.searchParams.set('lng', locJson.long);
	}

	get times() {
		return new Promise((resolve, reject) => {
			fetch(this.#url, {
				method: 'GET',
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
