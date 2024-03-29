'use strict';

require('dotenv').config();
const { app } = require('electron');
const { MainPopup } = require('./MainPopup.js');
const electronStore = require('electron-store');
const store = new electronStore({ watch: true });

// eslint-disable-next-line consistent-return
function getLocation(method) {
	switch (method) {
		case 'geo': {
			const { Geo } = require('./Geo.js');
			const windowsGeo = new Geo();
			return windowsGeo.coordinates;
		}
		case 'ip': {
			const { IP } = require('./IP');
			const ipGeo = new IP();
			return ipGeo.coordinates;
		}
	}
}

function getTimes(method) {
	// let locationUnsubscribe;

	switch (method) {
		case 'irl': {
			const { Irl } = require('./IrlTimes.js');

			return new Promise((resolve, reject) => {
				getLocation(store.get('location'))
					.then((loc) => {
						const locIrl = new Irl(loc);
						resolve(locIrl.times);
					})
					// eslint-disable-next-line dot-notation
					.catch((error) => reject(error));
				/*locationUnsubscribe = store.onDidChange('location', (newValue, oldValue) => {
					getLocation(newValue).then((loc) => {
						const locIrl = new Irl(loc);
						resolve(locIrl.times);
					});
				});*/
			});
		}
		case 'time': {
			/*if (locationUnsubscribe) {
				locationUnsubscribe();
			}*/
			// make sure to return as promise
			break;
		}
	}
}

function changeTheme(lightTheme, windowsAffect = store.get('affect.windows'), appsAffect = store.get('affect.apps')) {
	const Registry = require('winreg');
	const regKey = new Registry({
		hive: Registry.HKCU,
		key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize',
	});
	if (windowsAffect) {
		regKey.set('SystemUsesLightTheme', Registry.REG_DWORD, Number(lightTheme), (err) => {
			if (err) throw err;
		});
	}
	if (appsAffect) {
		regKey.set('AppsUseLightTheme', Registry.REG_DWORD, Number(lightTheme), (err) => {
			if (err) throw err;
		});
	}
}

const CronJob = require('cron').CronJob;
let cronTaskLight;
let cronTaskDark;
function setupCron(mode = store.get('mode')) {
	switch (mode) {
		case 'light':
			changeTheme(true);
			break;
		case 'dark':
			changeTheme(false);
			break;
		default:
			getTimes(mode).then((times) => {
				// Setup timer to these times
				if (cronTaskLight) cronTaskLight.stop();
				if (cronTaskDark) cronTaskDark.stop();

				cronTaskLight = new CronJob(
					`${times.sr.getMinutes()} ${times.sr.getHours()} * * *`,
					() => {
						changeTheme(true);
					},
					null,
					true,
				);

				cronTaskDark = new CronJob(
					`${times.ss.getMinutes()} ${times.ss.getHours()} * * *`,
					() => {
						changeTheme(false);
					},
					null,
					true,
				);
			});
	}
}

app.whenReady().then(() => {
	app.setAboutPanelOptions({
		applicationName: app.getName(),
		applicationVersion: process.env.npm_package_version,
		// credits: 'TODO',
		authors: 'DemosJarco',
		website: new URL('https://github.com/demosjarco/Windows-Auto-Theme').toString(),
		iconPath: './images/logo/icon.png',
	});

	new MainPopup();

	setupCron();

	store.onDidChange('mode', (newValue, _oldValue) => {
		setupCron(newValue);
	});
	store.onDidChange('location', (_newValue, _oldValue) => {
		setupCron();
	});
});
