const { app, Menu, Tray } = require('electron');

module.exports.MainPopup = class {
	constructor() {
		this.tray = new Tray('./images/logo/icon.png');
		this.contextMenu = Menu.buildFromTemplate([
			{
				label: 'Location',
				submenu: [
					{
						label: 'IP Address',
						type: 'radio',
						click: () => {},
					},
					{
						label: 'Geolocation',
						type: 'radio',
						click: () => {},
					},
				],
			},
			{
				label: 'Quit',
				click: () => {
					app.quit();
				},
			},
		]);
		this.tray.setToolTip('This is my application.');
		this.tray.setContextMenu(this.contextMenu);
	}
};
