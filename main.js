'use strict';

require('dotenv').config();
const { app } = require('electron');
const { MainPopup } = require('./classes/MainPopup.js');
const electronStore = require('electron-store');
const store = new electronStore({ watch: true });

// eslint-disable-next-line consistent-return
function getLocation(method) {
	switch (method) {
		case 'geo': {
			const { Geo } = require('./classes/Geo.js');
			const windowsGeo = new Geo();
			return windowsGeo.coordinates;
		}
	}
}

function getTimes(method) {
	let locationUnsubscribe;

	switch (method) {
		case 'irl': {
			const { Irl } = require('./classes/IrlTimes.js');

			return new Promise((resolve, reject) => {
				getLocation(store.get('location')).then((loc) => {
					const locIrl = new Irl(loc);
					resolve(locIrl.times);
				});
				locationUnsubscribe = store.onDidChange('location', (newValue, oldValue) => {
					getLocation(newValue).then((loc) => {
						const locIrl = new Irl(loc);
						resolve(locIrl.times);
					});
				});
			});
		}
		case 'time': {
			if (locationUnsubscribe) {
				locationUnsubscribe();
			}
			// make sure to return as promise
			break;
		}
	}
}

function changeTheme(lightTheme) {
	const Registry = require('winreg');
	const regKey = new Registry({
		hive: Registry.HKCU,
		key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize',
	});
	if (store.get('affect.windows')) {
		regKey.set('SystemUsesLightTheme', Registry.REG_DWORD, Number(lightTheme), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Changed system to', lightTheme ? 'light' : 'dark');
			}
		});
	}
	if (store.get('affect.apps')) {
		regKey.set('AppsUseLightTheme', Registry.REG_DWORD, Number(lightTheme), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Changed apps to', lightTheme ? 'light' : 'dark');
			}
		});
	}
}

app.whenReady().then(() => {
	new MainPopup();

	const cron = require('node-cron');
	let cronTaskLight;
	let cronTaskDark;

	getTimes(store.get('mode')).then((times) => {
		console.log(times);
		// Setup timer to these times
		cronTaskLight = cron.schedule(`${times.sr.getMinutes()} ${times.sr.getHours()} * * *`, () => {
			changeTheme(true);
		});
		cronTaskDark = cron.schedule(`${times.ss.getMinutes()} ${times.ss.getHours()} * * *`, () => {
			changeTheme(false);
		});
	});
	store.onDidChange('mode', (newValue, oldValue) => {
		getTimes(newValue).then((times) => {
			// Setup timer to these times
			cronTaskLight.stop();
			cronTaskDark.stop();

			cronTaskLight = cron.schedule(`${times.sr.getMinutes()} ${times.sr.getHours()} * * *`, () => {
				changeTheme(true);
			});
			cronTaskDark = cron.schedule(`${times.ss.getMinutes()} ${times.ss.getHours()} * * *`, () => {
				changeTheme(false);
			});
		});
	});
});
