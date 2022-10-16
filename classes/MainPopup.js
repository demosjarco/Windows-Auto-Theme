const { app, Menu, Tray } = require('electron');
const Store = require('electron-store');

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
						click: this.#menuModeChange,
					},
					{
						id: 'time',
						label: 'Custom time',
						type: 'radio',
						checked: this.store.get('mode') === 'time',
						click: this.#menuModeChange,
						enabled: false,
					},
					{
						id: 'light',
						label: 'Force Light',
						type: 'radio',
						checked: this.store.get('mode') === 'light',
						click: this.#menuModeChange,
					},
					{
						id: 'dark',
						label: 'Force Dark',
						type: 'radio',
						checked: this.store.get('mode') === 'dark',
						click: this.#menuModeChange,
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
						label: 'Windows',
						type: 'checkbox',
						checked: true,
						click: () => {},
					},
					{
						label: 'Apps',
						type: 'checkbox',
						checked: true,
						click: () => {},
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
						label: 'Geolocation',
						type: 'radio',
						click: () => {},
					},
					{
						label: 'IP Address',
						type: 'radio',
						click: () => {},
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
				label: 'Quit',
				click: () => {
					app.quit();
				},
			},
		];
		this.#tray.setToolTip(`${app.getName()}`);
		this.#updateMenu();
	}

	#setupConfigStorage() {
		return new Store({
			schema: {
				mode: {
					type: 'string',
					enum: ['irl', 'time', 'light', 'dark'],
					default: 'irl',
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

	async #menuModeChange(menuItem, browserWindow, event) {
		this.store.set('mode', menuItem.id);
	}
};
