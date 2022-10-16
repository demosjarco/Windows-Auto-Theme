module.exports.Irl = class {
	#config;

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
	}

	getTimes(callback) {
		const axios = require('axios');
		axios(this.#config)
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.error(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error('Error', error.message);
				}
				console.error(error.config);
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
