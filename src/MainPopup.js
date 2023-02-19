const { app, Menu, Tray, path } = require('electron');
const electronStore = require('electron-store');

module.exports.MainPopup = class {
	#tray;
	#baseMenu = [];

	constructor() {
		this.store = this.#setupConfigStorage();
		this.#tray = new Tray('./images/logo/icon.png', 'e48ff901-f225-4bb4-9f21-0743f0f61261');
		this.#baseMenu = [
			{
				label: 'Mode',
				submenu: [
					{
						id: 'irl',
						label: 'Sunset to sunrise',
						type: 'radio',
						checked: this.store.get('mode') === 'irl',
						click: (menuItem, browserWindow, event) => {
							this.store.set('mode', menuItem.id);
						},
					},
					{
						id: 'time',
						label: 'Custom time',
						type: 'radio',
						checked: this.store.get('mode') === 'time',
						click: (menuItem, browserWindow, event) => {
							this.store.set('mode', menuItem.id);
						},
						enabled: false,
					},
					{
						id: 'light',
						label: 'Force Light',
						type: 'radio',
						checked: this.store.get('mode') === 'light',
						click: (menuItem, browserWindow, event) => {
							this.store.set('mode', menuItem.id);
						},
					},
					{
						id: 'dark',
						label: 'Force Dark',
						type: 'radio',
						checked: this.store.get('mode') === 'dark',
						click: (menuItem, browserWindow, event) => {
							this.store.set('mode', menuItem.id);
						},
					},
				],
			},
			{
				type: 'separator',
			},
			{
				label: 'Affect',
				submenu: [
					{
						id: 'affect.windows',
						label: 'Windows',
						type: 'checkbox',
						checked: this.store.get('affect.windows'),
						click: (menuItem, browserWindow, event) => {
							console.log(menuItem.id, menuItem.checked);
							this.store.set(menuItem.id, menuItem.checked);
						},
					},
					{
						id: 'affect.apps',
						label: 'Apps',
						type: 'checkbox',
						checked: this.store.get('affect.apps'),
						click: (menuItem, browserWindow, event) => {
							console.log(menuItem.id, menuItem.checked);
							this.store.set(menuItem.id, menuItem.checked);
						},
					},
				],
			},
			{
				type: 'separator',
			},
			{
				label: 'Location',
				submenu: [
					{
						id: 'geo',
						label: 'Geolocation',
						type: 'radio',
						checked: this.store.get('location') === 'geo',
						click: (menuItem, browserWindow, event) => {
							this.store.set('location', menuItem.id);
						},
					},
					{
						id: 'ip',
						label: 'IP Address',
						type: 'radio',
						checked: this.store.get('location') === 'ip',
						click: (menuItem, browserWindow, event) => {
							this.store.set('location', menuItem.id);
						},
					},
				],
			},
			{
				label: 'Custom time',
				enabled: false,
				submenu: [
					{
						label: 'Start hour',
						submenu: this.#timeOptionGenerator('custom-time-start-hour', true),
					},
					{
						label: 'Start minute',
						submenu: this.#timeOptionGenerator('custom-time-start-minute', false, true),
					},
					{
						type: 'separator',
					},
					{
						label: 'End hour',
						submenu: this.#timeOptionGenerator('custom-time-end-hour', true),
					},
					{
						label: 'End minute',
						submenu: this.#timeOptionGenerator('custom-time-end-minute', false, true),
					},
				],
			},
			{
				type: 'separator',
			},
			{
				label: 'Startup',
				sublabel: 'Autostart on login',
				type: 'checkbox',
				checked: app.getLoginItemSettings().executableWillLaunchAtLogin,
				click: (menuItem, browserWindow, event) => {
					console.log(menuItem.id, menuItem.checked);

					// To work with Electron's autoUpdater on Windows, which uses Squirrel, you'll want to set the launch path to Update.exe, and pass arguments that specify your application name.
					// const appFolder = path.dirname(process.execPath);
					// const updateExe = path.resolve(appFolder, '..', 'Update.exe');
					// const exeName = path.basename(process.execPath);

					app.setLoginItemSettings({
						openAtLogin: menuItem.checked,
						// path: updateExe,
						// args: ['--processStart', `"${exeName}"`, '--process-start-args', `"--hidden"`],
					});
				},
			},
			{
				type: 'separator',
			},
			{
				role: 'about',
			},
			{
				role: 'quit',
			},
		];
		this.#tray.setToolTip(`${app.getName()}`);
		this.#updateMenu();
	}

	#setupConfigStorage() {
		return new electronStore({
			// https://github.com/ajv-validator/ajv-formats
			// https://ajv.js.org/json-type-definition.html
			// https://ajv.js.org/json-schema.html#type
			// https://lightrun.com/answers/sindresorhus-electron-store-usage-of-electron-store-in-renderer-processes
			schema: {
				mode: {
					type: 'string',
					enum: ['irl', 'time', 'light', 'dark'],
					default: 'irl',
				},
				affect: {
					type: 'object',
					properties: {
						windows: {
							type: 'boolean',
							default: true,
						},
						apps: {
							type: 'boolean',
							default: true,
						},
					},
				},
				location: {
					type: 'string',
					enum: ['geo', 'ip'],
					default: 'geo',
				},
			},
			clearInvalidConfig: true,
		});
	}

	#timeOptionGenerator(prefix = '', hour = false, minute = false) {
		let numberOf = 0;
		if (hour) {
			numberOf = 24;
		} else if (minute) {
			numberOf = 60;
		}

		let timeOptions = [];
		for (let i = 0; i < numberOf; i++) {
			timeOptions.push({
				id: `${prefix}-${i}`,
				label: `${i}`,
				type: 'radio',
				click: () => {},
			});
		}
		return timeOptions;
	}

	#updateMenu() {
		this.#tray.setContextMenu(Menu.buildFromTemplate(this.#baseMenu));
	}
};
