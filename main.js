'use strict';

require('dotenv').config();
const { app } = require('electron');
const { MainPopup } = require('./classes/MainPopup.js');
const electronStore = require('electron-store');
const store = new electronStore({ watch: true });

function getLocation(method, callback) {
	switch (method) {
		case 'geo': {
			const { Geo } = require('./classes/Geo.js');
			const windowsGeo = new Geo();
			windowsGeo.getCoordinates(callback);
			break;
		}
	}
}

function getTimes(method, callback) {
	let locationUnsubscribe;

	switch (method) {
		case 'irl': {
			const { Irl } = require('./classes/IrlTimes.js');

			getLocation(store.get('location'), (loc) => {
				const locIrl = new Irl(loc);
				locIrl.getTimes(callback);
			});
			locationUnsubscribe = store.onDidChange('location', (newValue, oldValue) => {
				getLocation(newValue, (loc) => {
					const locIrl = new Irl(loc);
					locIrl.getTimes(callback);
				});
			});
			break;
		}
		case 'time': {
			if (locationUnsubscribe) {
				locationUnsubscribe();
			}
			break;
		}
	}
}

app.whenReady().then(() => {
	new MainPopup();

	getTimes(store.get('mode'), (times) => {
		console.log(times);
		// Setup timer to these times
	});
	store.onDidChange('mode', (newValue, oldValue) => {
		getTimes(newValue, (times) => {
			console.log(times);
			// Setup timer to these times
		});
	});
});
