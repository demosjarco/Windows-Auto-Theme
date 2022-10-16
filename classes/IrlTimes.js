module.exports.Irl = class {
	#config;

	constructor(locJson) {
		this.#config = {
			url: '/json',
			baseURL: 'https://api.sunrisesunset.io',
			params: {
				lat: locJson.lat,
				lng: locJson.long,
			},
		};
	}

	getTimes(callback) {
		const axios = require('axios');
		axios
			.get(this.#config)
			.catch((error) => {
				throw error;
			})
			.then((response) => {
				if (response.status == 200) {
					const currentDay = new Date();
					callback({
						sr: new Date(`${currentDay.toLocaleDateString()} ${response.data.results.sunrise}`),
						ss: new Date(`${currentDay.toLocaleDateString()} ${response.data.results.sunset}`),
					});
				}
			});
	}
};
