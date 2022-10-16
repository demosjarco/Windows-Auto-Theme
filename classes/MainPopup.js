const { app, Menu, Tray } = require('electron');

module.exports.MainPopup = class {
	#tray;
	#baseMenu = [];

	constructor() {
		this.#tray = new Tray('./images/logo/icon.png', 'e48ff901-f225-4bb4-9f21-0743f0f61261');
		this.#baseMenu = [
			{
				label: 'Mode',
				submenu: [
					{
						label: 'Sunset to sunrise',
						type: 'radio',
						click: () => {},
					},
					{
						label: 'Custom time',
						type: 'radio',
						click: () => {},
						enabled: false,
					},
					{
						label: 'Force Light',
						type: 'radio',
						click: () => {},
					},
					{
						label: 'Force Dark',
						type: 'radio',
						click: () => {},
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
