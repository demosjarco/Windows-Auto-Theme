/* eslint-disable accessor-pairs */
module.exports.IP = class {
	#url = new URL('https://local-ip-geo.demosjarco.workers.dev');

	get coordinates() {
		return new Promise((resolve, reject) => {
			fetch(this.#url).then((response) => {
				if (response.ok) {
					response.json().then((jsonResponse) => {
						resolve(jsonResponse);
					});
				} else {
					reject(`HTTP ${response.status}: ${response.statusText}`);
				}
			});
		});
	}
};
